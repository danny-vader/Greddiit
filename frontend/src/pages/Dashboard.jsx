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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    contact: "",
  });

  const [userData, setUserData] = useState([]);

  const { fname, lname, age, contact } = formData;

  const handleOpenForm = (e) => {
    setShowForm(!showForm);
  };

  const onChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userData = {
      fname: fname,
      lname: lname,
      age: age,
      contact: contact,
    };
    const response = await fetch("http://localhost:5000/users/editUserData/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      toast.error("User already exists");
    } else {
      setFormData({
        fname: "",
        lname: "",
        age: "",
        contact: "",
      });
      setShowForm(!showForm);
      window.location.reload();
    }
  };

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/users/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = await response.json();
      setUserData(fetchedData.user);
    }
    getUserData();
  }, []);

  console.log(userData);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  const logoutChange = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
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
                  <a class="nav-link active" aria-current="page">
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
        class="container"
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(25%)",
        }}
      >
        <section style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />
                    <p className="text-muted mb-1">{userData.uname}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link to="/dashboard/followers">
                        <MDBBtn>Followers</MDBBtn>
                      </Link>
                      <Link to="/dashboard/following">
                        <MDBBtn outline className="ms-1">
                          Following
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.fname} {userData.lname}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.contact}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Age</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.age}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(300%)",
        }}
      >
        <button
          type="button"
          class="btn btn-primary btn-rounded"
          onClick={handleOpenForm}
        >
          EDIT PROFILE
        </button>
        <div></div>
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
                  name="fname"
                  id="fname"
                  placeholder={userData.fname}
                  value={fname}
                  onChange={onChange}
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="lname"
                  id="lname"
                  placeholder={userData.lname}
                  value={lname}
                  onChange={onChange}
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  name="age"
                  id="age"
                  placeholder={userData.age}
                  value={age}
                  onChange={onChange}
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="tel"
                  class="form-control"
                  name="contact"
                  id="contact"
                  placeholder={userData.contact}
                  pattern="[0-9]{10}"
                  value={contact}
                  onChange={onChange}
                />
              </div>
              <div className="input-group mb-3">
                <button
                  disabled={age < 18}
                  type="submit"
                  class="btn btn-success btn-rounded"
                  onClick={onSubmit}
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
