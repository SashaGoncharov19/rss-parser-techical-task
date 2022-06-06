import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../utils/const";
const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item onClick={() => navigate(MAIN_ROUTE)}>Новости</Menu.Item>
        <Menu.Item onClick={() => navigate(ADMIN_ROUTE)}>Admin</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
