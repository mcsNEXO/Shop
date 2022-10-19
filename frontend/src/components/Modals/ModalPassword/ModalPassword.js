import Input from "../../Input/Input";
import "./ModalPassword.css";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { useState } from "react";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../../helpers/validations";

export default function ModalPassword(props) {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState();
  const closeModal = props.closeModal();

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  const [form, setForm] = useState({
    currentPassword: {
      value: "",
      error: "",
    },
    newPassword: {
      value: "",
      error: "",
      rules: [{ rule: "min", number: 6 }, "required"],
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const changeHandler = (value, type) => {
    const { error } = validate(form[type].rules, value, type);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
        setError: setError(error),
      },
    });
  };

  const editPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordData = {
      currentPassword: form.currentPassword.value,
      newPassword: form.newPassword.value,
      confirmPassword: form.confirmPassword.value,
      _id: auth._id,
    };
    try {
      const res = await axios.put("edit-password", passwordData);
      setAuth(res.data.user);
      closeModal();
    } catch (e) {
      console.log(e);
      if (e.response.data.message[0].includes(":")) {
        setError(e.response.data.message[0].split(":")[2]);
      } else {
        setError(e.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="con-modal-pass" onClick={closeModal}></div>
      <div className="con2-modal-pass">
        <div className="box-modal-pass">
          <div className="modal-pass-label">
            <div>Edit password </div>
            <div className="modal-pass-close">
              <i className="bi bi-x-circle" onClick={props.closeModal()}></i>
            </div>
          </div>
          <form onSubmit={editPassword}>
            <div className="modal-pass-input">
              <Input
                type="password"
                name="password"
                onChange={(e) =>
                  changeHandler(e.target.value, "currentPassword")
                }
                class="auth"
                placeholder="Current password"
              />
            </div>
            <div className="modal-pass-input">
              <Input
                type="password"
                name="new-password"
                onChange={(e) => changeHandler(e.target.value, "newPassword")}
                class="auth"
                placeholder="New password"
              />
            </div>
            <div className="modal-pass-input">
              <Input
                type="password"
                name="confirm-new-password"
                onChange={(e) =>
                  changeHandler(e.target.value, "confirmPassword")
                }
                id="password"
                class="auth"
                placeholder="Confirm password"
              />
            </div>
            <div className="auth-error">{error}</div>
            <div className="modal-pass-btn">
              <LoadingButton loading={loading}>Save</LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
