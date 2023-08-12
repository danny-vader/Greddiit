import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    password: "",
  });

  const { uname, password } = formData;

  if (localStorage.getItem("token") !== null) {
    return <Navigate to="/dashboard" replace={true}></Navigate>;
  }

  const onChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      uname: uname,
      password: password,
    };
    const response = await fetch("http://localhost:5000/users/loginUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      toast.error("Invalid Credentials");
    } else {
      setFormData({
        uname: "",
        password: "",
      });

      const fetchedData = await response.json();
      localStorage.setItem("token", fetchedData.token);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <h1>LOGIN USER</h1>
        <form onSubmit={onSubmit}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              name="uname"
              id="uname"
              placeholder="Username [Required]"
              value={uname}
              onChange={onChange}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              name="password"
              id="password"
              placeholder="Password [Required]"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="input-group mb-3">
            <button
              disabled={!uname || !password}
              type="submit"
              class="btn btn-success btn-rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
