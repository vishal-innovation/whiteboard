import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Draw.css";

function Draw() {
  const colors = ["red", "green", "yellow", "black", "blue"];
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [usersSketches, setUsersSketches] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const getUsersSketch = () => {
    axios
      // .get("http://localhost:5000/usersketch")
      .get("https://canvaswhiteboard.herokuapp.com/usersketch")
      .then((res) => setUsersSketches(res.data))
      .catch((error) => {
        alert("Someting is wrong in fetching users sketch.");
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
    getUsersSketch();
    console.log(usersSketches);
  }, []);

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        ctx.current.beginPath();
        ctx.current.strokeStyle = selectedColor;
        ctx.current.lineWidth = 3;
        ctx.current.lineJoin = "round";
        ctx.current.moveTo(lastPosition.x, lastPosition.y);
        ctx.current.lineTo(x, y);
        ctx.current.closePath();
        ctx.current.stroke();

        setPosition({
          x,
          y,
        });
      }
    },
    [lastPosition, mouseDown, setPosition, selectedColor]
  );

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const clear = () => {
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const onMouseDown = (e) => {
    setPosition({
      x: e.clientX - canvasRef.offsetLeft,
      y: e.clientY - canvasRef.current.offsetTop,
    });
    setMouseDown(true);
  };

  const onMouseUp = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    draw(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    );
  };

  const handleSaveCanvas = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);

    axios
      // .put("http://localhost:5000/sketch", {
      .put("https://canvaswhiteboard.herokuapp.com/sketch", {
        userid: userData._id,
        sketchUrl: blobURL,
      })
      .then((res) => res.status === 200 && alert("Saved Successfully."))
      .catch((error) => {
        alert("something went wrong on saving, please try again.");
        console.log(error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <button
              onClick={() => window.location.replace("/")}
              className="home-btn"
            >
              Home
            </button>
          </li>
          <li className="left-navitem">
            <h2>vishal ranjan</h2>
          </li>
        </ul>
      </nav>
      <div className="canvas-content">
        <canvas
          className="whiteboard"
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        />
        <div className="btn-group">
          <select
            className="home-btn btn"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <button className=" home-btn btn clear" onClick={clear}>
            Clear
          </button>
          <button className="home-btn btn" onClick={handleSaveCanvas}>
            Save
          </button>
          <button className="home-btn btn download" onClick={download}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Draw;
