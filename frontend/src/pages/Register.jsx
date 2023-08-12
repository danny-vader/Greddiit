import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
    age: "",
    contact: "",
    password: "",
  });

  const { fname, lname, uname, email, age, contact, password } = formData;

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
      fname: fname,
      lname: lname,
      uname: uname,
      email: email,
      age: age,
      contact: contact,
      password: password,
    };
    const response = await fetch("http://localhost:5000/users/registerUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      toast.error("User already exists");
    } else {
      setFormData({
        fname: "",
        lname: "",
        uname: "",
        email: "",
        age: "",
        contact: "",
        password: "",
      });
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
        <h1>USER REGISTRATION</h1>
        <form onSubmit={onSubmit}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              name="fname"
              id="fname"
              placeholder="First name"
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
              placeholder="Last name"
              value={lname}
              onChange={onChange}
            />
          </div>
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
              type="email"
              class="form-control"
              name="email"
              id="email"
              placeholder="Email [Required]"
              value={email}
              onChange={onChange}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              name="age"
              id="age"
              placeholder="Age [Atleast 18 required]"
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
              placeholder="Contact number [10 digit]"
              pattern="[0-9]{10}"
              value={contact}
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
              disabled={!uname || age < 18 || !email || !password}
              type="submit"
              class="btn btn-success btn-rounded"
            >
              Register User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;