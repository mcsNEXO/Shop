import "./ProfilePage.css";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useFavorite from "../../../hooks/useFavorite";

export default function ProfilePage(props) {
  const [auth] = useAuth();
  const [favorite] = useFavorite();
  return (
    <div className="pg-container">
      <div className="pg-box pg-height">
        <div className="pg-img">
          <NavLink to="my-data">
            <img
              loading="lazy"
              src={process.env.PUBLIC_URL + "/uploads/" + auth.image}
              alt="avatar"
            />
          </NavLink>
        </div>
        <div className="pg-img-title">
          <span>
            Welcome to your profile <i>{auth.firstName}</i>
          </span>
        </div>
      </div>
      <div className="pg-box-product">
        <div className="pg-products-title">Recently viewed products</div>
        <div className="pg-last-products">
          <div className="pg-product"></div>
          <div className="pg-product"></div>
          <div className="pg-product"></div>
        </div>
      </div>

      <div className="pg-box-product">
        <div className="pg-promotions">
          <div className="pg-promotion-title">
            See promotions we have for you
          </div>
          <div className="pg-promotion-con">
            <div className="pg-promotion">
              <div className="pg-promotion-img"></div>
              <div className="pg-promotion-desc">sth</div>
            </div>
            <div className="pg-promotion">
              <div className="pg-promotion-img"></div>
              <div className="pg-promotion-desc">sth</div>
            </div>
            <div className="pg-promotion">
              <div className="pg-promotion-img"></div>
              <div className="pg-promotion-desc">sth</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pg-box-product">
        <div className="pg-favorites">
          <div className="pg-favorite-title">Favorite</div>
          {favorite?.length > 0 ? (
            favorite?.map((item, index) => (
              <div className="pg-favorite" key={index.toString()}>
                <img
                  loading="lazy"
                  src={process.env.PUBLIC_URL + "img/jpg/shoes/" + item.image}
                  alt="prodcut"
                />
              </div>
            ))
          ) : (
            <div>You don't have any favorites products</div>
          )}
        </div>
      </div>
    </div>
  );
}
