import React, { useState } from "react";
import "./Home.css";
import Login from "../Form/Login";
import Register from "../Form/Register";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);

  const handleRegister = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <>
      <div className="bgImg">
        <h1 style={{ color: "greenyellow" }}>
          Welcome to the world, where God's beautiful creature 'Human' exists.
        </h1>
        <h2 style={{ color: "aliceblue" }}>
          Draw/Sketch Your Own Creatures{" "}
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="loginText"
            title="click here to create sketch."
          >
            Now
          </button>
        </h2>
      </div>
      {isModalOpen &&
        (!isLoginActive ? (
          <Login handleRegister={handleRegister} />
        ) : (
          <Register handleRegister={handleRegister} />
        ))}
    </>
  );
};

export default Home;
