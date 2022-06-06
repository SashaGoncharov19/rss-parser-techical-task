import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button, Card } from "antd";
import { getPosts } from "../http";
import { Loading } from "./index";

const { Meta } = Card;

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data.map((item) => {
        const data = item.content.replace(/\n/g, "");
        console.log(data);
        const parseData = parse(data);

        console.log(parseData);

        const image = parseData[0];

        let text = parseData[2]
          ? parseData[1]
          : "There is no description in this publication. Check out the others.";
        let readMoreURL = parseData[2]
          ? parseData[2].props.children.props.href
          : parseData[1];

        return (
          <Card
            onClick={() => (window.location.href = item.link)}
            hoverable
            style={{
              width: 280,
              margin: 25,
            }}
            cover={image}
          >
            <Meta title={item.title} description={text} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                margin: "10px",
              }}
            >
              <Button onClick={() => (window.location.href = readMoreURL)}>
                Read more..
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Main;
