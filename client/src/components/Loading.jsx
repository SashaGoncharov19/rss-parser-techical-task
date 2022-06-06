import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size={"large"} />
    </div>
  );
};

export default Loading;
