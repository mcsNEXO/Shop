/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../../../axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";
import "./ModalImage.css";

export default function ModalImage(props) {
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [loading, setLoading] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(
    (e) => {
      if (image) {
        uploadImage();
      }
    },
    [image]
  );

  const uploadImage = async (e) => {
    e ? e.preventDefault() : console.log();
    setLoading(true);
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("_id", auth._id);
    try {
      if (newImage) {
        await deleteUploadImage(e);
      }
      const res = await axios.post("image", formdata);
      console.log(res);
      setNewImage(
        process.env.PUBLIC_URL + "/uploads/" + res.data.file.filename
      );
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const deleteUploadImage = async (e, flag) => {
    e ? e.preventDefault() : console.log("no");
    setLoading(true);
    if (!newImage) {
      console.log("!NEWIMAGE", newImage, e, flag);
      return props.closeModal();
    }
    console.log("NEWIMAGE exist", newImage, e, flag);
    try {
      await axios.post("cancel-image", {
        pathImage: newImage,
        userImage: auth.image,
        _id: auth._id,
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    flag ? props.closeModal() : console.log();
  };

  const saveImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!newImage) {
      return props.closeModal();
    }
    try {
      const res = await axios.post("save-image", {
        image: newImage,
        userImage: auth.image,
        _id: auth._id,
      });
      setAuth(res.data.user);
      setNewImage("");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    props.closeModal();
  };
  return (
    <>
      <div
        className="con-modal-pass"
        onClick={(e) => deleteUploadImage(e, { flag: true })}
      ></div>
      <div className="con2-modal-pass">
        <div className="box-modal-pass">
          <div className="box-image">
            <img
              src={
                newImage
                  ? newImage
                  : process.env.PUBLIC_URL + "/uploads/" + auth.image
              }
              alt="src"
            />
          </div>
          <form encType="multipart/form-data" onSubmit={saveImage}>
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
            <div className="modal-img-btn">
              <LoadingButton
                className="img-btn"
                loading={loading}
                type="submit"
              >
                Save
              </LoadingButton>
              <LoadingButton
                className="img-btn"
                onClick={(e) => deleteUploadImage(e, { flag: true })}
              >
                Cancel
              </LoadingButton>
              {auth.image ? (
                <LoadingButton className="del-img-btn" loading={loading}>
                  Delete
                </LoadingButton>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
