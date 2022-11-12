export default function ErrorModal(props) {
  return (
    <>
      <div className="container-errorModal" onClick={props.closeModal}></div>
      <div className="content">
        <i className="bi bi-x-circle" onClick={props.closeModal}></i>
        <div className="con">
          <div className="e-title">Error</div>
          <div className="box">{props.text}</div>
        </div>
      </div>
    </>
  );
}
