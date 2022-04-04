import axios from "axios";
import React, { useState } from "react";
import Card from "../UI/Card/Card";
import "./LoginRegister.css";

const Register = ({ handleRegister }) => {
  const userField = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
  const [userInfo, setUserInso] = useState(userField);

  const [submitData, setSubmitData] = useState();
  const [isValid, setIsValid] = useState(false);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trimStart();

    let userData = {
      ...userInfo,
      [inputName]: inputValue,
    };
    setUserInso(userData);
  };

  function checkValidation() {
    return userInfo.firstname &&
      userInfo.lastname &&
      userInfo.username &&
      userInfo.email &&
      userInfo.password
      ? true
      : false;
  }

  function validateEmail(email) {
    let regxPattern = /\S+@\S+\.\S+/;
    return regxPattern.test(email);
  }

  const handleSubit = () => {
    setIsValid(true);
    if (checkValidation() && validateEmail(userInfo.email)) {
      axios
        // .post("http://localhost:5000/register", userInfo)
        .post("https://canvaswhiteboard.herokuapp.com/register", userInfo)
        .then((res) => setSubmitData(res.data))
        .then((err) => {
          if (!err) {
            localStorage.setItem("userData", JSON.stringify(submitData));
            window.location.replace("/draw");
            setIsValid(false);
          } else {
            console.log(err);
            alert("Something went wrong, please try again.");
            setUserInso(userField);
          }
        });
    }
  };

  // useEffect(() => {
  //   submitData && window.location.replace("/draw");
  //   setIsValid(false);
  // }, [submitData]);

  return (
    <>
      <Card>
        <h1 style={{ color: "#00A8CC", fontSize: "40px", fontWeight: "400" }}>
          REGISTRATION
        </h1>

        <div style={{ width: "90%" }}>
          <label
            className={`input-label ${
              !userInfo.first_name && isValid && "error"
            }`}
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            value={userInfo.firstname}
            onChange={handleInput}
            placeholder="Enter your first name"
            autoComplete="off"
            className="input-box register"
          />
          <label
            className={`input-label ${
              !userInfo.lastname && isValid && "error"
            }`}
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            value={userInfo.lastname}
            onChange={handleInput}
            placeholder="Enter your last name"
            autoComplete="off"
            className="input-box register"
          />
          <label
            className={`input-label ${
              !userInfo.username && isValid && "error"
            }`}
            htmlFor="user-name"
          >
            User Name
          </label>
          <input
            id="user-name"
            name="username"
            type="text"
            value={userInfo.username}
            onChange={handleInput}
            placeholder="Enter your last name"
            autoComplete="off"
            className="input-box register"
          />
          <label
            className={`input-label ${!userInfo.email && isValid && "error"}`}
            htmlFor="emailid"
          >
            Email
          </label>
          <input
            id="emailid"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleInput}
            placeholder="Enter your email address"
            autoComplete="off"
            className="input-box register"
          />
          <small
            className={` ${
              isValid && !validateEmail(userInfo.email)
                ? "emailvalid"
                : "email-notvalid"
            }`}
          >
            email is not valid.
          </small>

          <label
            className={`input-label ${
              !userInfo.password && isValid && "error"
            }`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleInput}
            placeholder="Enter your password"
            className="input-box register"
          />
        </div>
        <div className="bottom-content">
          <button className="login-btn" onClick={handleSubit}>
            SUBMIT
          </button>
          <div className="bottom-content register-txt">
            <p className="bc-text .reg-txt">Already have an account ?</p>
            <p className="refer-btn ">
              Login{" "}
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

export default Register;
