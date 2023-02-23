import React from "react";
import ReactLoading from "react-loading";
import "./loading.css";

const Loading = () => (
  <div style={{ paddingTop: 20 }}>
    <ReactLoading type="spinningBubbles" color="#4caf4f" />
  </div>
);

export default Loading;
