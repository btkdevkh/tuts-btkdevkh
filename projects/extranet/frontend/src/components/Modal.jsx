const Modal = ({ children, setShow }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("fixed")) {
          setShow(false);
        }
      }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-[rgb(0,0,0,.7)] flex items-center p-3"
    >
      {children}
    </div>
  );
};

export default Modal;
