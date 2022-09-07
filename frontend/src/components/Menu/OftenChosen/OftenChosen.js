import "./OftenChosen.css";
import Product from "./Product/Product";
import { productItem } from "./Product/productItem";

export default function OftenChosen(props) {
  const next = () => {
    const container = [...document.querySelectorAll(".slider-chosen")];
    container.forEach((item, i) => {
      let containerWidth = item.getBoundingClientRect().width;
      item.scrollLeft += containerWidth;
    });
  };
  const pre = () => {
    const container = [...document.querySelectorAll(".slider-chosen")];
    container.forEach((item, i) => {
      let containerWidth = item.getBoundingClientRect().width;
      item.scrollLeft -= containerWidth;
    });
  };
  return (
    <div className="often-chosen">
      <div className="title-slider">Often chosen products</div>
      <div className="slider-chosen">
        {productItem.map((item) => {
          return (
            <Product
              key={item.id}
              id={item.id}
              img={item.img}
              sex={item.sex}
              name={item.name}
              prize={item.prize}
            />
          );
        })}
      </div>
      <div className="slider-arrows">
        <i className="bi bi-arrow-left preBtn" onClick={pre}></i>
        <i className="bi bi-arrow-right nextBtn" onClick={next}></i>
      </div>
    </div>
  );
}
