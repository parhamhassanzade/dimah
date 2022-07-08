import React, { useState } from "react";
import "./Login.css";
import dimahLogo from "../../assets/img/dimah.jpeg";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../../Utils/API";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(false);
  const [errorMessage] = useState("");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        toast.success("با موفقیت وارد شدید", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("USID", res.data.user._id);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem(
          "userInfo",
          res.data.user.firstName + " " + res.data.user.lastName
        );

        setTimeout(() => {
          res.data.user.isAdmin === true
            ? history.push("/dashboard")
            : res.data.user.isAdmin === false
            ? history.push("/form")
            : history.push("/");
        }, 3500);
      })
      .catch((err) => {
        toast.error("نام کاربری و رمز عبور اشتباه است", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center login">
      <div className="loginForm">
        <div className="w-100 d-flex justify-content-center mb-3">
          {/* <img src={dimahLogo} alt="" width="80px" /> */}
          <h2>مرکز لیزر دیماه</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 w-100">
            <input
              type="text"
              className="form-control w-100"
              placeholder="نام کاربری"
              value={username}
              name={username}
              onChange={handleUsername}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="رمز عبور"
              value={password}
              name={password}
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-secondary" type="submit">
              ورود
            </button>
          </div>
        </form>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}

export default withRouter(Login);
