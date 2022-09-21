const fun = (e) => {
  if (e.target.value !== "") {
    return e.target.nextElementSibling.classList.add("filled");
  } else {
    return e.target.nextElementSibling.classList.remove("filled");
  }
};

const InputText = ({ props }) => {
  return (
    <div className={`${props.class}-con-input`}>
      <input
        type={props.type}
        name={props.name}
        className={`${props.class}-input`}
        onChange={props.onChange}
        id={`${props.name}-input`}
        onBlur={fun}
        placeholder={props.placeholder}
      />
      <label className={`${props.class}-label`} htmlFor={`${props.name}-input`}>
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
