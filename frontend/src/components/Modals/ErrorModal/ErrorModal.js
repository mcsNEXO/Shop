import useError from "../../../hooks/useError";

export default function ErrorModal(props) {
  const [error, setError] = useError();
  return (
    <>
      <div
        className="container-errorModal"
        onClick={() => setError(false)}
      ></div>
      <div className="d-flex-w">
        <div className="content">
          <i className="bi bi-x-circle" onClick={() => setError(false)}></i>
          <div className="con">
            <div className="e-title">Error</div>
            <div className="box">{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}
