import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function MySubGreddiit() {
  const navigate = useNavigate();
  const [subGreddiitData, setSubGreddiitData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    async function getSubGreddiitData() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/subGreddiits/getSubGreddiitData/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: id }),
        }
      );

      if (response.status === 400) {
        toast.error(`SubGreddiit ${id} doesn't exist`);
      } else {
        const fetchedData = await response.json();
        setSubGreddiitData(fetchedData.subGreddiitData);
      }
    }
    getSubGreddiitData();
  }, []);

  console.log(subGreddiitData);

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
                  <a class="nav-link" aria-current="page" href="/subgreddiits">
                    <i class="bi bi-people-fill px-1"></i>
                    SubGreddiits
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page">
                    <i class="bi bi-person px-1"></i>
                    Users
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page">
                    <i class="bi bi-textarea-resize px-1"></i>
                    Joining Requests
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page">
                    <i class="bi bi-device-ssd-fill px-1"></i>
                    Stats
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page">
                    <i class="bi bi-flag-fill px-1"></i>
                    Reports
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
      <div>
        <ul>
          {subGreddiitData.followers.map((item) => {
            return (
              <>
                <li key={item._id}>{item}</li>
              </>
            );
          })}
        </ul>
        Blocked Users
        <ul>
          {subGreddiitData.blocked.map((item) => {
            return (
              <>
                <li key={item._id}>{item}</li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MySubGreddiit;
