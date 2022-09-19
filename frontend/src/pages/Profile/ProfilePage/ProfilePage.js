import "./ProfilePage.css";
import useAuth from "../../../hooks/useAuth";

export default function ProfilePage(props) {
  const [auth, setAuth] = useAuth();
  return (
    <div className="pg-container">
      <div className="pg-box pg-height">
        <div className="pg-img">{/* <img></img> */}</div>
        <div className="pg-img-title">
          Welcome to your profile <i>{auth.firstName}</i>
        </div>
      </div>
      <div className="pg-box">
        <div className="pg-things">
          <div className="pg-products-title">Recently viewed products</div>
          <div className="pg-last-products">
            <div className="pg-product"></div>
            <div className="pg-product"></div>
            <div className="pg-product"></div>
          </div>
        </div>
      </div>

      <div className="pg-box">
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
      <div className="pg-box">
        <div className="pg-favorites">
          <div className="pg-favorite-title">Favorite</div>
          <div className="pg-favorite"></div>
        </div>
      </div>
    </div>
  );
}
