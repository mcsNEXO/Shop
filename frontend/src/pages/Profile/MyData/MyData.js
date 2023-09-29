import "./MyData.css";
import React, { useState } from "react";
import Input from "../../../components/Input/Input";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../../../components/helpers/validations";
import axios from "../../../axios";
import ModalPassword from "../../../components/Modals/ModalPassword/ModalPassword";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import ModalImage from "../../../components/Modals/ModalImage/ModalImage";

export default function MyData(props) {
  const [image, setImage] = useState();
  const [modalPassword, setModalPassword] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState({
    error: "",
  });
  const [form, setForm] = useState({
    email: {
      value: auth.email,
      error: "",
      rules: ["email", { rule: "min", number: 6 }, "required"],
    },
    firstName: {
      value: auth.firstName,
      error: "",
      rules: ["required"],
    },
    lastName: {
      value: "",
      error: "",
      rules: ["required"],
    },
  });

  const buttonDisabled = Object.values(error).filter((x) => x).length;

  const showModalPassword = () => {
    setModalPassword(true);
  };
  const showModalImage = () => {
    setModalImage(true);
  };

  const changeHandler = (value, type) => {
    const { error } = validate(form[type].rules, value, type);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
        fun: setError({ error: error }),
      },
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: form.email.value,
      firstName: form.firstName.value,
      _id: auth._id,
    };
    try {
      const res = await axios.put("edit-data", data);
      setAuth(res.data.user);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const closeModal = () => {
    setModalPassword(!modalPassword);
  };
  const closeModalImage = () => {
    setModalImage(!modalImage);
  };
  return (
    <>
      {modalImage ? <ModalImage closeModal={closeModalImage} /> : null}
      {modalPassword ? <ModalPassword closeModal={() => closeModal} /> : null}
      <div className="md-container">
        <div className="md-box">
          <form onSubmit={onSubmit}>
            <div className="md-input-file">
              <div className="md-img">
                <img
                  loading="lazy"
                  src={
                    auth.image
                      ? process.env.PUBLIC_URL + "/uploads/" + auth.image
                      : process.env.PUBLIC_URL + "/uploads/avatar3.png"
                  }
                  alt="avatar"
                />
              </div>
              <div className="md-center btn-upload">
                <button onClick={showModalImage}>Upload Image</button>
              </div>
            </div>
            <hr className="md-hr"></hr>
            <div className="md-inputs">
              <Input
                type="email"
                name="email"
                value={form.email.value}
                onChange={(e) => changeHandler(e.target.value, "email")}
                placeholder="E-mail"
                class={`${form.email.error ? "error-input md" : "md"}`}
              ></Input>
              {form.email.error ? (
                <div className="error-text">{form.email.error}</div>
              ) : (
                <div className="positive-text">all right</div>
              )}
              <div className="password-edit">
                <Input
                  type="password"
                  value="*************"
                  disabled="true"
                  name="password"
                  placeholder="Password"
                  class="md"
                ></Input>
                <button className="md-btn-pass" onClick={showModalPassword}>
                  Edit
                </button>
              </div>
              <div className="positive-text">all right</div>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName.value}
                onChange={(e) => changeHandler(e.target.value, "firstName")}
                class={`${form.firstName.error ? "error-input md" : "md"}`}
              ></Input>
              {form.firstName.error ? (
                <div className="error-text">
                  {form.firstName.error.toLowerCase()}
                </div>
              ) : (
                <div className="positive-text">all right</div>
              )}
            </div>
            <div className="md-final-btn">
              <LoadingButton loading={loading} disabled={buttonDisabled}>
                Save
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
