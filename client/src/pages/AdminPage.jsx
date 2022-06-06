import React, { useEffect, useRef, useState } from "react";
import { Navbar, Footer, Loading } from "../components";
import { Content } from "antd/es/layout/layout";
import { Button, Layout, Table, message } from "antd";
import { editPost, getPosts } from "../http";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "antd/es/modal/Modal";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [currentGuid, setCurrentGuid] = useState("");

  const editorRef = useRef(null);

  const showModal = (item, guid) => {
    setIsModalVisible(true);
    setContent(item);
    setCurrentGuid(guid);
  };
  console.log(content);

  const handleOk = () => {
    console.log(editorRef.current.getContent());
    editPost(editorRef.current.getContent(), currentGuid)
      .then((r) => {
        setIsModalVisible(false);
        message.success("Saved success!");
      })
      .catch(() => {
        message.error("Something went wrong! Try again later.");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "URL",
      dataIndex: "link",
      key: "link",
      render: (item) => (
        <Button onClick={() => (window.location.href = item)}>Watch</Button>
      ),
    },
    {
      title: "Pub. Date",
      dataIndex: "pubDate",
      key: "pubDate",
    },
    {
      title: "",
      dataIndex: "content",
      key: "content",
      render: (item, record) => (
        <Button type="primary" onClick={() => showModal(item, record.guid)}>
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getPosts()
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

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
          <Table columns={columns} dataSource={data} />
          <Modal
            title="Post editor"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Editor
              apiKey="ycfkpu7gwuww99cjiurogjw9cch98nqx13f1kfq7hxxcmbpw"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Modal>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AdminPage;
