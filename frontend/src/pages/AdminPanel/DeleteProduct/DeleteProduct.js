import { Input, Select, Spin, Card, Modal, message } from "antd";
import "./DeleteProduct.scss";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import axios from "../../../axios";
import { typeClothes } from "../../../data/dataProduct";

const { Meta } = Card;
const { Search } = Input;

export default function DeleteProduct(props) {
  const [searchedProducts, setSearchedProducts] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const searchRef = useRef();

  const error = (text) => {
    Modal.error({
      title: "Error",
      content: text,
      afterClose: () => setLoading(false),
    });
  };

  const messageAlert = (text, type) => {
    messageApi.open({
      type: type,
      content: text,
    });
  };

  const getProduct = async () => {
    if (searchText === "")
      return messageAlert("You must enter at least 1 letter!", "error");
    setLoading(true);
    const data = {
      type: searchType.value,
      text: searchText,
    };
    try {
      const res = await axios.post("get-search-product", data);
      setSearchedProducts(res.data.products);
      messageAlert(`Find ${res.data.products.length} products`, "success");
    } catch (e) {
      error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    typeClothes.length === 1 && setSearchType(typeClothes[0]);
  }, []);

  return (
    <>
      {contextHolder}
      <div className="con-delete-product d-center">
        <div className="box">
          <div className="option-data">
            <div>
              <div className="group type-select">
                <label htmlFor="type">Type:</label>
                <Select
                  defaultValue={
                    typeClothes.length > 1
                      ? "Select type"
                      : typeClothes[0].value
                  }
                  options={typeClothes}
                  className={"select"}
                  id="type"
                  onChange={(value) => setSearchType(value)}
                />
              </div>
              <Spin spinning={searchType || searchType !== null ? false : true}>
                <Search
                  placeholder={
                    searchType ? "Search product" : "Select type product!"
                  }
                  disabled={searchType || searchType !== null ? false : true}
                  ref={searchRef}
                  className="searcher"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onSearch={getProduct}
                  style={{ width: 200 }}
                />
              </Spin>
            </div>
          </div>
          <Spin spinning={loading}>
            <div className="searched-products">
              {searchedProducts?.map((el, index) => (
                <Card
                  key={index}
                  className={"card-s"}
                  cover={
                    <img
                      alt="example"
                      src={
                        process.env.PUBLIC_URL +
                        `/img/jpg/${el.type}/` +
                        `${el.type}-${el.name.replace(/ /g, "-")}-${
                          el.colors[0]
                        }.png`
                      }
                    />
                  }
                  actions={[
                    <EditOutlined key="edit" style={{ color: "green" }} />,
                    <DeleteOutlined key="delete" style={{ color: "red" }} />,
                  ]}
                >
                  <Meta
                    title={el.name}
                    style={{ textTransform: "capitalize" }}
                    description={`${el.gender}'s ${el.type}`}
                  />
                </Card>
              ))}
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
}
