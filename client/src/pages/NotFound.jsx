import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/const";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => navigate(MAIN_ROUTE)}>Back Home</Button>}
    />
  );
};

export default NotFound;
