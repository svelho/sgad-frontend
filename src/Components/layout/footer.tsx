import React from "react";
import "./footer.css";

function Footer(props: any) {
  return (
    <div className="footer">
      <h1>{props.note}</h1>
    </div>
  );
}

export default Footer;
