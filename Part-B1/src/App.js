import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "./Constants/urlConstants";
import { List, Avatar, message, Card, Tag, Space } from "antd";
import _ from "lodash";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { CheckableTag } = Tag;

const App = () => {
  const [dataInitial, setDataInitial] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const onChangeTabs = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    if (selectedTags.length > 0) {
      let data = [];

      dataInitial.map((e) => {
        const intersection = e.categories.filter((element) =>
          selectedTags.includes(element)
        );

        if (intersection.length > 0) {
          data.push(e);
        }
      });
      setDataFilter(data);
    } else {
      setDataFilter(dataInitial);
    }
  }, [selectedTags]);

  const Categories = () => (
    <>
      <span style={{ marginRight: 8 }}>Categories:</span>
      {tags.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => onChangeTabs(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );

  useEffect(() => {
    axios
      .post(`${URL}/jokes`)
      .then((response) => {
        const { type, value } = response.data;
        if (type === "success") {
          let categories = _.map(value, "categories");
          categories = [...new Set(categories.flat())];

          setDataInitial(value);
          setDataFilter(value);
        }
      })
      .catch((error) => {
        message.error(error);
      });

    axios
      .post(`${URL}/categories`)
      .then((response) => {
        const { type, value } = response.data;
        if (type === "success") {
          setTags(value);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <Card>
      <Categories />
      <List
        itemLayout="horizontal"
        dataSource={dataFilter}
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <IconText icon={StarOutlined} text="156" key={`star${index}`} />,
              <IconText icon={LikeOutlined} text="156" key={`like${index}`} />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key={`message${index}`}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <>
                  Categories:{" "}
                  {item.categories.map((e, i) => (
                    <Tag color="blue" key={i}>
                      {e}
                    </Tag>
                  ))}
                </>
              }
              description={item.joke}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default App;
