import "./Collection.css";
import { NavLink } from "react-router-dom";
export default function Collection(props) {
  const panorama = process.env.PUBLIC_URL + "/img/jpg/picture4.jpg";
  return (
    <div className="container-collection">
      <div className="min-desc">Feel better in new style</div>
      <div className="title-collection">
        <h1>SPRITBOX collection</h1>
      </div>
      <div className="desc-collection">A collection for cyclists and more</div>
      <div className="btn-collection">
        <button>
          <NavLink to="/">Check it out</NavLink>
        </button>
      </div>
      <div
        className="baner-collection"
        style={{ backgroundImage: `url(${panorama})` }}
      ></div>
    </div>
  );
}
