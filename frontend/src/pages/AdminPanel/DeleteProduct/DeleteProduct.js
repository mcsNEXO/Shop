import { Input } from "antd";

const { Search } = Input;

export default function DeleteProduct(props) {
  return (
    <div className="con-delete-product">
      <Search
        placeholder="input search text"
        allowClear
        // onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}
