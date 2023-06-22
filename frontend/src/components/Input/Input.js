import { useEffect } from "react";

const fun = (e) => {
  if (e.target.value !== "") {
    return e.target.nextElementSibling.classList.add("filled");
  } else {
    return e.target.nextElementSibling.classList.remove("filled");
  }
};

const InputText = ({ props }) => {
  useEffect(() => {
    const inputs1 = document.querySelectorAll(".auth-input");
    const inputs2 = document.querySelectorAll(".md-input");
    inputs2.forEach((e) => {
      if (e.value) {
        e.nextElementSibling.classList.add("filled");
      } else {
        return null;
      }
    });
  });
  return (
    <div className={`${props.class}-con-input ${props?.classContainer ?? ""}`}>
      <input
        type={props.type}
        name={props.name}
        value={props?.value}
        className={`${props.class}-input  ${props?.classInput ?? ""}`}
        onChange={props?.onChange}
        id={`${props.name}-input`}
        disabled={props.disabled ? true : false}
        onBlur={fun}
        placeholder={props.placeholder}
      />
      <label
        className={`${props.class}-label ${props.value && "filled"}`}
        htmlFor={`${props.name}-input`}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

function Input(props) {
  switch (props.type) {
    case "email":
      return <InputText props={props} />;
    case "password":
      return <InputText props={props} />;
    default:
      return <InputText props={props} />;
  }
}
export default Input;
