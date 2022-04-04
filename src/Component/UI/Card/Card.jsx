import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div>
      <div className="backdrop" />
      <div className="login-box">
        <div className="login-wrap">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
