import { Navbar, Footer } from "../components";
import { Layout } from "antd";
import Main from "../components/Main";

const { Content } = Layout;

const MainPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar />
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64,
          height: "100%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <Main />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainPage;
