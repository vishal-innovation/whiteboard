import axios from "axios";
import React, { useState } from "react";
import Card from "../UI/Card/Card";
import "./LoginRegister.css";

const Login = ({ handleRegister }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let loginData = {
      ...loginInfo,
      [inputName]: inputValue,
    };
    setLoginInfo(loginData);
  };

  function checkValidation() {
    return loginInfo.email && loginInfo.password ? true : false;
  }

  const handleSubmit = () => {
    setIsValid(true);
    if (checkValidation()) {
      axios
        // .post("http://localhost:5000/login", loginInfo)
        .post("https://canvaswhiteboard.herokuapp.com/login", loginInfo)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("userData", JSON.stringify(res.data));
            setIsValid(false);
            window.location.replace("/draw");
          }
        })
        .catch((err) => {
          if (err) {
            alert("Something went wrong, Please try again.");
            setLoginInfo({
              email: "",
              password: "",
            });
          }
        });
    }
  };

  return (
    <>
      <Card>
        <h1 style={{ color: "#00A8CC", fontSize: "40px", fontWeight: "400" }}>
          LOG-IN
        </h1>

        <div style={{ width: "250px" }}>
          <label
            className={`input-label ${!loginInfo.email && isValid && "error"}`}
            htmlFor="emailid"
          >
            Email
          </label>
          <input
            id="emailid"
            name="email"
            type="email"
            value={loginInfo.email}
            onChange={handleInput}
            placeholder="Enter your email address"
            autoComplete="off"
            className="input-box"
          />
          <label
            className={`input-label ${
              !loginInfo.password && isValid && "error"
            }`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginInfo.password}
            onChange={handleInput}
            placeholder="Enter your password"
            className="input-box"
          />
        </div>
        <div className="bottom-content">
          <button className="login-btn" onClick={handleSubmit}>
            Log-In
          </button>
          <div className="bottom-content">
            <p className="bc-text">Don't have an account?</p>
            <p className="refer-btn">
              Register{" "}
              <span
                onClick={() => handleRegister()}
                style={{ color: "#00A8CC", cursor: "pointer" }}
              >
                here
              </span>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Login;
