import React from "react";
import { render } from "react-dom";
import "./main.css";

function Main() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 500;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  if (width < breakpoint) return <div className="mainMobile"></div>;
  else return <div className="main"></div>;
}

export default Main;
