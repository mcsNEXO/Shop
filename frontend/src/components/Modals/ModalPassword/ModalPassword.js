import Input from "../../Input/Input";
import "./ModalPassword.css";
export default function ModalPassword(props) {
  window.addEventListener("keydown", function (e) {
    const kox = props.closeModal();
    if (e.key === "Escape") kox();
  });
  return (
    <>
      <div className="con-modal-pass"></div>
      <div className="box-modal-pass">
        <div className="modal-pass-label">
          <div>Edit password </div>
          <div className="modal-pass-close">
            <i className="bi bi-x-circle" onClick={props.closeModal()}></i>
          </div>
        </div>
        <form>
          <div className="modal-pass-input">
            <Input
              type="password"
              name="password"
              class="auth"
              placeholder="Current password"
            />
          </div>
          <div className="modal-pass-input">
            <Input
              type="password"
              name="password"
              class="auth"
              placeholder="New password"
            />
          </div>
          <div className="modal-pass-input">
            <Input
              type="password"
              name="password"
              id="password"
              class="auth"
              placeholder="Confirm password"
            />
          </div>

          <div className="modal-pass-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
