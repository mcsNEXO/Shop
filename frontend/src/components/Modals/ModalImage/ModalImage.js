import axios from "../../../axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./ModalImage.css";

export default function ModalImage(props) {
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  window.addEventListener("keydown", async function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      console.log(newImage);
      if (newImage) {
        const data = {
          _id: auth._id,
          pathImage: newImage,
        };
        await axios.post("delete-image", data);
      }
      props.closeModal();
    }
  });
  const uploadImage = async (e) => {
    e ? e.preventDefault() : console.log("No");
    // e.preventDefault();
    try {
      let res;
      if (newImage) {
        cancel();
      }
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("_id", auth._id);
      res = await axios.post("image", formdata);
      setNewImage(
        process.env.PUBLIC_URL + "/uploads/" + res.data.file.filename
      );
      // console.log(res);

      // console.log("bez flagi", newImage);
      // if (flag) {
      //   if (!image || !newImage) {
      //     return props.closeModal();
      //   }
      //   formdata.append("flag", true);
      //   res = await axios.post("image", formdata);
      //   setAuth(res.data.user);
      //   console.log("flaga", newImage);
      // }
    } catch (e) {
      console.log(e);
    }
  };
  const cancel = async (e) => {
    e ? e.preventDefault() : console.log("no");
    if (!newImage) {
      return props.closeModal();
    }
    try {
      const res = await axios.post("delete-image", {
        pathImage: newImage,
        userImage: auth.image,
        _id: auth._id,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    props.closeModal();
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  const show = async (e) => {
    e.preventDefault();
    if (!newImage) {
      return props.closeModal();
    }
    const res = await axios.post("save-image", {
      image: newImage,
      userImage: auth.image,
      _id: auth._id,
    });
    setAuth(res.data.user);
    setNewImage("");
    return;
  };
  const showData = (e) => {
    e.preventDefault();
    console.log("auth.image ", auth.image);
    console.log("newImage ", newImage);
  };
  return (
    <>
      <div className="con-modal-pass"></div>
      <div className="con2-modal-pass">
        <div className="box-modal-pass">
          <div className="box-image">
            <img
              // src={process.env.PUBLIC_URL + "/uploads/" + auth.image}
              src={
                newImage
                  ? newImage
                  : process.env.PUBLIC_URL + "/uploads/" + auth.image
              }
              alt="src"
            />
          </div>

          <form encType="multipart/form-data" onSubmit={show}>
            <div className="md-right">
              <input
                type="file"
                id="md-file"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label className="md-file" htmlFor="md-file">
                Upload image
              </label>
            </div>
            <button type="submit">Save</button>
            <button onClick={cancel}>Cancel</button>
          </form>
        </div>
      </div>
      <button
        style={{ position: "absolute", top: "0", zIndex: "100" }}
        onClick={showData}
      >
        SHOWME
      </button>
    </>
  );
}
