import React from "react";
import { Link } from "react-router-dom";
import "./ClientError.css";

const ClientError = () => {
  return (
    <section className="page_404">
      <h1 className="text-center">404</h1>
      <img
        className="bg-img"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="client-error"
      />
      <div className="contant-box">
        <h3 className="content-heading">Look like you're lost</h3>
        <p>the page you are looking for not avaible!</p>
        <Link to="/" className="link">
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default ClientError;
