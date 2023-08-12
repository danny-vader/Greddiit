import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySubGreddiits from "./pages/MySubGreddiits";
import MySubGreddiit from "./pages/MySubGreddiit";
import MySubGreddiitJoiningRequest from "./pages/MySubGreddiitJoiningRequest";
import SubGreddiits from "./pages/SubGreddiits";
import SubGreddiit from "./pages/SubGreddiit";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [change, setChange] = useState(0);

  const loginChange = () => {
    return setChange(0);
  };

  const registerChange = () => {
    return setChange(1);
  };

  return (
    <>
      <Router>
        <div class="container">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <nav class="navbar bg-dark sticky-top navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                      <a class="navbar-brand d-flex align-items-center">
                        <i
                          class="bi bi-reddit px-1"
                          style={{ color: "orangered" }}
                        ></i>
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
                      <div
                        class="d-flex justify-content-end"
                        id="navbarSupportedContent"
                      >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item" onClick={() => loginChange()}>
                            <a
                              class="nav-link active d-flex align-items-center"
                              aria-current="page"
                            >
                              <i class="bi bi-box-arrow-in-right px-1"></i>
                              Login
                            </a>
                          </li>
                          <li class="nav-item" onClick={() => registerChange()}>
                            <a
                              class="nav-link active d-flex align-items-center"
                              aria-current="page"
                            >
                              <i class="bi bi-person-check px-1"></i>
                              Register
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  {change === 0 ? <Login /> : <Register />}
                </div>
              }
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/mysubgreddiits" element={<MySubGreddiits />}></Route>
            <Route
              path="/mysubgreddiits/:id"
              element={<MySubGreddiit />}
            ></Route>
            {/* <Route
              path="/mysubgreddiits/:id/joiningrequests"
              element={<MySubGreddiitJoiningRequest />}
            ></Route> */}
            <Route path="/subgreddiits" element={<SubGreddiits />}></Route>
            <Route path="/subgreddiits/:id" element={<SubGreddiit />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
