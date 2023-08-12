import { React, useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";

function SubGreddiit() {
  const navigate = useNavigate();

  let { id } = useParams();

  const [subGreddiitData, setSubGreddiitData] = useState([]);

  const [posts, setPosts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  const upvote = (e) => {
    const token = localStorage.getItem("token");
  };

  const handleOpenForm = (e) => {
    setShowForm(!showForm);
  };

  const logoutChange = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("Please enter post text");
    } else {
      const postData = {
        text: text,
        postedIn: id,
      };

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/posts/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 400) {
        toast.error("Invalid post data");
      } else {
        setFormData({
          text: "",
        });
        setShowForm(!showForm);
        window.location.reload();
      }
    }
  };

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

  useEffect(() => {
    async function getPosts() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/posts/getPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postedIn: id }),
      });

      const fetchedData = await response.json();
      setPosts(fetchedData.posts);
    }
    getPosts();
  }, []);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

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
          transform: "translateY(5%)",
        }}
      >
        <MDBContainer className="py-5">
          <MDBCol>
            <MDBCol lg="2">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="3">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="100">
                      <MDBCardText style={{ fontWeight: "bold" }}>
                        NAME
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="100">
                      <MDBCardText className="text-muted">
                        {subGreddiitData.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="100">
                      <MDBCardText style={{ fontWeight: "bold" }}>
                        DESCRIPTION
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="100">
                      <MDBCardText className="text-muted">
                        {subGreddiitData.description}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBCol>
          <button
            type="button"
            class="btn btn-primary btn-rounded"
            onClick={handleOpenForm}
          >
            CREATE NEW POST
          </button>
        </MDBContainer>
      </div>
      <div
        class="container"
        style={
          {
            // position: "relative",
            // // top: "100%",
            // right: "-300px",
            // transform: "translateY(-50%)",
          }
        }
      >
        <ul>
          {posts.map((item) => {
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
                                Post Text
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.text}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Posted By
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.postedBy}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText style={{ fontWeight: "bold" }}>
                                Posted In
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {item.postedIn}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg="10">
                      {/* <button
                        type="button"
                        class="btn btn-success btn-rounded"
                        onClick={upvote}
                      >
                        Upvote
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-rounded"
                        onClick={downvote}
                      >
                        Downvote
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary btn-rounded"
                        onClick={follow}
                      >
                        Follow Poster
                      </button>
                      <button
                        type="button"
                        class="btn btn-warning btn-rounded"
                        onClick={save}
                      >
                        Save Post
                      </button>
                      <button
                        type="button"
                        class="btn btn-info btn-rounded"
                        onClick={handleOpenForm}
                      >
                        Comment
                      </button> */}
                    </MDBCol>
                  </MDBContainer>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div>
        {showForm && (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={handleOpenForm}></span>
              <div>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    placeholder="text"
                    rows="5"
                    name="text"
                    id="text"
                    value={text}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="input-group mb-3">
                  <button
                    type="button"
                    disabled={!text}
                    class="btn btn-success btn-rounded"
                    onClick={onSubmit}
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubGreddiit;
