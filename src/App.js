import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react/cjs/react.production.min";
import "./App.css";
import ClientError from "./Component/UI/NotFound/ClientError";

const Draw = lazy(() => import("./Component/Whiteboard/Draw"));
const Home = lazy(() => import("./Component/Home/Home"));

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/draw"
            element={
              userData && userData._id ? <Draw /> : <Navigate to="/not-found" />
            }
          />
          <Route exact path="/not-found" element={<ClientError />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
