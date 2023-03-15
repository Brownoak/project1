import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../loginPage/index.css";
import avatar from "../../assets/profile.png";
import banner from "../../assets/banner.png";
import Button from "../../components/button/Button";
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import "../loginPage/events.js";

const RegisterPage = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [err, setErr] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setRedirect(true);
        } else if (data.status === "err") {
          setErr(true);
        }
      });

    if (
      firstName.length == 0 ||
      lastName == 0 ||
      email.length == 0 ||
      password.length <= 5 ||
      !email.includes('@')
    ) {
      setError(true);
    }
  };

  return (
    <div className="vh-100 d-flex flex-row align-items-center">
      <div className="wrapper_left d-none d-md-flex col-12 col-md-6 h-100 justify-content-center align-items-center rounded-end">
        <div >
          <img src={banner} className="w-" />
        </div>
      </div>

      <div className="wrapper_right col-md-6 col-12 d-flex flex-column justify-content-center align-items-center ">
        <img src={avatar} className="img" />
        <h3 className="text-center">Welcome! Create Your Account</h3>
        <p className="text-center text-secondary">Add your personal details below.</p>
        <form onSubmit={handleSubmit} className="w-50" >
          <div className="form-group mb-2">
            <span className="d-flex align-items-end">
              <PersonIcon className="mr-3 icons"/>
              <input
                placeholder="First Name"
                type="text"
                className="form-control "
                onChange={(e) => setFname(e.target.value)}
              />
            </span>

            {error && firstName.length <= 1 ? (
              <div className="text-danger">please enter your first name</div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <span className="d-flex align-items-end">
              <PersonIcon className="invisible mr-3"/>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                onChange={(e) => setLname(e.target.value)}
              />
            </span>

            {error && lastName.length <= 1 ? (
              <div className="text-danger">please enter your last name</div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <span className="d-flex align-items-end ">
              <EmailIcon className="mr-3 icons"/>
              <input
                type="email"
                placeholder="Email"
                className="form-control "
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>

            {error && (email.length == 0 || !email.includes('@')) ? (
              <div className="text-danger ">please enter a valid email</div>
            ) : (
              ""
            )}
            {err ? (
              <p className="text-danger">
                user exists please add another email
              </p>
            ) : null}
          </div>

          <div className="form-group  mb-2">
            <span className="d-flex align-items-end">
              <LockIcon className="mr-3 icons "/>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </span>

            {error && password.length <= 5 ? (
              <div className="text-danger">
                password must be at least 6 in length
              </div>
            ) : null}
          </div>


          <Button title="Submit" />


          <div >
            <p>
              Already have an account?{" "}
              <span className="font-semibold text-decoration-underline cursor-pointer">
                <Link to="/">Log In</Link>{" "}
              </span>
            </p>
          </div>
        </form>
        {redirect ? <Navigate to="/home" /> : ""}
      </div>
    </div>
  );
};

export default RegisterPage;
