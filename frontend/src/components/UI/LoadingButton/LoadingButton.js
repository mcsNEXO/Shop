import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function LoadingButton(props) {
  const buttonProps = { ...props };
  delete buttonProps.loading;
  return props.loading ? (
    <Button variant="dark" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className="visually-hidden">Loading...</span>
    </Button>
  ) : (
    <button {...buttonProps}>{props.children}</button>
  );
}
