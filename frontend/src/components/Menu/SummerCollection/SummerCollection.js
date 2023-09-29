import "./SummerCollection.css";

export default function SummerCollection(props) {
  const beach = process.env.PUBLIC_URL + "/img/jpg/beach.jpg";

  return (
    <div className="container-summer">
      <div className="title-summer">Get ready for summer</div>
      <div className="block-summer-desc">See what we have prepared for you</div>
      <div className="thumb-summer">
        <div className="img-summer">
          <img loading="lazy" src={beach} alt="beach"></img>
        </div>
        <div className="block-summer">
          <div className="desc-summer">Say hello to summer with SUDO</div>
          <button className="btn-summer">Check it out</button>
        </div>
      </div>
    </div>
  );
}
