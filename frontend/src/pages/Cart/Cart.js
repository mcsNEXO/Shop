import "./Cart.scss";

export default function Cart(props) {
  const s = JSON.parse(localStorage.getItem("cart"));

  return (
    <div className="cart-container">
      <div>
        <div className="title-cart">Cart</div>
        <hr></hr>
        <div className="box-of-products">
          {s.map((item, index) => (
            <div className="box-product">
              <img
                src={process.env.PUBLIC_URL + "/img/jpg/shoes/" + item.image}
              ></img>
              <div className="information">
                <div className="name">{item.name}</div>
                <div className="gender">{`${item.gender}'s ${item.type}`}</div>
                <div className="color">{`${item.colors}`}</div>
                <div style={{ display: "flex" }}>
                  <div className="size">{`Size ${item.size} `}</div>
                  <div className="quantity"> Quantity</div>
                </div>
              </div>
              <div className="price">${item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
