import "./Product.css";

export default function Product(props) {
  const currency = "$";
  return (
    <div className="product">
      <div className="img-product">
        <img src={props.img} />
      </div>
      <div className="desc-product">
        <div className="name-product">{props.name}</div>
        <div className="sex-product">
          {props.sex === "man" ? "Men's shoes" : "Women's shoes"}
        </div>
        <div className="prize-product">
          {props.prize}
          {currency}
        </div>
      </div>
    </div>
  );
}
