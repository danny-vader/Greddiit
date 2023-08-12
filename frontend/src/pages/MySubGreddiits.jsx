import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function MySubGreddiits() {
  const navigate = useNavigate();
  const [arg, setArg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [],
    bannedKeywords: [],
  });
  const [mySubGreddiits, setMySubGreddiits] = useState([]);

  const { name, description, tags, bannedKeywords } = formData;

  const handleOpenForm = (e) => {
    setShowForm(!showForm);
  };

  const onChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeCase = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please add the name of the SubGreddiit");
    } else {
      const subGreddiitData = {
        name: name,
        description: description,
        tags: tags.split(","),
        bannedKeywords: bannedKeywords.split(","),
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/subGreddiits/createSubGreddiit/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subGreddiitData),
        }
      );

      if (response.status === 400) {
        toast.error("SubGreddiit already exits");
      } else {
        setFormData({
          name: "",
          moderator: "",
          description: "",
          tags: [],
          bannedKeywords: [],
          followers: [],
        });
        setShowForm(!showForm);
        window.location.reload();
      }
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const subGreddiitData = {
      name: arg,
    };

    console.log(subGreddiitData);

    const response = await fetch(
      "http://localhost:5000/subgreddiits/deleteSubGreddiit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subGreddiitData),
      }
    );
  };

  useEffect(() => {
    async function getMySubGreddiits() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/subGreddiits/getMySubGreddiits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedData = await response.json();
      setMySubGreddiits(fetchedData.mySubGreddiits);
    }
    getMySubGreddiits();
  }, []);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  const logoutChange = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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
                  <a class="nav-link active" aria-current="page">
                    <i class="bi bi-people px-1"></i>
                    MySubGreddits
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/subgreddiits">
                    <i class="bi bi-people-fill px-1"></i>
                    SubGreddiits
                  </a>
                </li>
              </ul>
            </div>
            <div class="d-flex justify-content-end" id="navbarSupportedContent">
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
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-primary btn-rounded"
            onClick={handleOpenForm}
          >
            CREATE NEW SUBGREDDIIT
          </button>
          <div></div>
        </div>
        <ul>
          {mySubGreddiits.map((item) => {
            // setArg(item.name);
            return (
              <>
                <li key={item._id}>
                  <MDBContainer className="py-5">
                    <MDBCol lg="8">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Followers
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.followers.length}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Name
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.name}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Description
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.description}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Banned Keywords
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.bannedKeywords.join(",")}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg="10">
                      <button
                        type="button"
                        class="btn btn-danger btn-rounded"
                        onClick={onDelete}
                      >
                        Delete
                      </button>
                      <button type="button" class="btn btn-success btn-rounded">
                        Open
                      </button>
                    </MDBCol>
                  </MDBContainer>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      {showForm && (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={handleOpenForm}></span>
            <div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  placeholder="Name of the SubGreddiit"
                  value={name}
                  onChange={onChange}
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tags (Must be comma seperated)"
                  name="tags"
                  id="tags"
                  value={tags}
                  onChange={onChangeCase}
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Banned Keywords (Must be comma seperated)"
                  name="bannedKeywords"
                  id="bannedKeywords"
                  value={bannedKeywords}
                  onChange={onChangeCase}
                />
              </div>
              <div class="mb-3">
                <textarea
                  class="form-control"
                  placeholder="Description"
                  rows="5"
                  name="description"
                  id="description"
                  value={description}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  disabled={!name}
                  class="btn btn-success btn-rounded"
                  onClick={onSubmit}
                >
                  Create SubGreddiit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MySubGreddiits;
