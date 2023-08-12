import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Switch from "react-bootstrap/Switch";

const SubGreddiits = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [subGreddiits, setSubGreddiits] = useState([]);
  const [queryTags, setQueryTags] = useState("");
  const [tags, setTags] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [isDescending, setIsDescending] = useState(true);
  const [isCreationDate, setIsCreationDate] = useState(true);
  const [isFollowers, setIsFollowers] = useState(true);

  const handleAscending = () => {
    setIsAscending(!isAscending);
    subGreddiitsResult.sort((a, b) => a.name.localeCompare(b.name));
  };

  const handleDescending = () => {
    setIsDescending(!isDescending);
    subGreddiitsResult.sort((a, b) => b.name.localeCompare(a.name));
  };

  const handleFollowers = () => {
    setIsFollowers(!isFollowers);
    // Call any other functions or update other state variables as needed
  };

  const handleCreationDate = () => {
    setIsCreationDate(!isCreationDate);
    // Call any other functions or update other state variables as needed
  };

  useEffect(() => {
    async function getSubGreddiit() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/subGreddiits/getSubGreddiits/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedData = await response.json();
      setSubGreddiits(fetchedData.subGreddiits);
    }
    getSubGreddiit();
  }, []);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  const filteredData = subGreddiits.filter((item) => {
    if (tags.length === 0 || tags[0] === "") {
      return true;
    } else {
      return tags.some((tag) => item.tags.includes(tag));
    }
  });

  const fuse = new Fuse(filteredData, {
    keys: ["name"],
    includeScore: true,
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleTagChange = (e) => {
    setQueryTags(e.target.value);
    setTags(e.target.value.split(","));
    // if (tags.length === 0) {
    //   setTags("");
    // }
  };

  const results = fuse.search(query);
  const subGreddiitsResult = query
    ? results.map((result) => result.item)
    : filteredData;

  const logoutChange = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div>
        <div class="container">
          <nav class="navbar bg-dark sticky-top navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand d-flex align-items-center">
                <i class="bi bi-reddit px-1" style={{ color: "orangered" }}></i>
                GREDDIIT
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/dashboard">
                      <i class="bi bi-person-circle px-1"></i>
                      Profile
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      aria-current="page"
                      href="/mysubgreddiits"
                    >
                      <i class="bi bi-people px-1"></i>
                      MySubGreddits
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page">
                      <i class="bi bi-people-fill px-1"></i>
                      SubGreddiits
                    </a>
                  </li>
                </ul>
              </div>
              <div
                class="d-flex justify-content-end"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item" onClick={() => logoutChange()}>
                    <a
                      class="nav-link active d-flex align-items-center"
                      aria-current="page"
                    >
                      <i class="bi bi-box-arrow-right px-1"></i>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div
          class="container"
          style={{
            position: "relative",
            top: "50%",
            transform: "translateY(50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "5rem",
          }}
        >
          <input
            type="search"
            placeholder="Search by name"
            onChange={handleChange}
            value={query}
            style={{
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "5px",
              width: "300px",
              outline: "none",
            }}
          />
          <input
            type="search"
            placeholder="Filter by Tags"
            onChange={handleTagChange}
            value={queryTags}
            style={{
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "5px",
              width: "300px",
              outline: "none",
            }}
          />
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Ascending"
              checked={isAscending}
              onChange={handleAscending}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Descending"
              checked={isDescending}
              onChange={handleDescending}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Creation Date"
              checked={isCreationDate}
              onChange={handleCreationDate}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Followers"
              checked={isFollowers}
              onChange={handleFollowers}
            />
          </Form>
        </div>
      </div>
      <div
        class="container"
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(575%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          flexDirection: "column",
        }}
      >
        {subGreddiitsResult.map((item) => {
          return <>{item.name}</>;
        })}
      </div>
    </>
  );
};

export default SubGreddiits;
