import "./Cart.scss";

export default function Cart(props) {
  const s = JSON.parse(localStorage.getItem("cart"));

  const price = () => {
    let price = 0;
    for (let i = 0; i < s?.length; i++) {
      price += s[i].price;
    }
    let discount = 20;
    let deliveryCost = 0;
    let endPrice = (price * (100 - discount)) / 100 + deliveryCost;

    return { price, endPrice };
  };

  function expandContract() {
    const el = document.querySelector(".div-promo");
    const i = document.querySelector(".bi-caret-down-fill");
    console.log(el);
    el.classList.toggle("hide");
    el.classList.toggle("show");
    i.classList.toggle("rotate");
    // el.classList.toggle("show");
    // el.classList.toggle("hide");
  }

  return (
    <div className="cart-container">
      <div>
        <div className="title-cart">Cart</div>
        <hr></hr>
        <div style={{ display: "flex" }}>
          <div className="box-of-products">
            {s?.length > 0 ? (
              s?.map((item, index) => (
                <div key={index}>
                  <div className="box-product">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/img/jpg/shoes/" + item.image
                      }
                      alt="product"
                    ></img>
                    <div className="information">
                      <div className="name">{item.name}</div>
                      <div className="gender">{`${item.gender}'s ${item.type}`}</div>
                      <div className="color">{`Color: ${item.colors}`}</div>
                      <div style={{ display: "flex" }}>
                        <div className="size">{`Size: ${item.size} `}</div>
                        <div className="quantity">Quantity {0}</div>
                      </div>
                    </div>
                    <div className="price">${item.price}</div>
                    <div className="price">Delete</div>
                  </div>
                  <hr></hr>
                </div>
              ))
            ) : (
              <div className="box-product">No items in the cart</div>
            )}
          </div>
          <div className="to-pay">
            <div className="title-pay">To pay</div>
            <div className="box-pay">
              <div className="style-div">
                <div className="value">Value of products </div>
                <span>${price().price}</span>
              </div>
              <div className="style-div">
                <div className="delivery">Cost of delivery </div>
                <span>$0</span>
              </div>
              <hr></hr>
              <div className="style-div">
                <div className="sum">Sum</div>
                <span>${price().endPrice}</span>
              </div>
              <hr></hr>
              <button className="checkout">Checkout</button>
            </div>
            <div className="promo-code">
              <span onClick={expandContract}>
                Add promo code <i className="bi bi-caret-down-fill"></i>
              </span>
              <div className="div-promo hide">
                <form>
                  <input type="text" name="code" />
                  <button className="btn-promo">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
