import { createPortal } from "react-dom";
import { useRef } from 'react'
function Dialog({ children, closeDialog, open, title, showCpButton }) {
  const cpText = useRef(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cpText.current.innerText);
  }
  const DialogContainer = () => (
    <div className={!!open ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title || ''}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeDialog}
          ></button>
        </header>
        <section ref={cpText} className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
          <button className="button"  onClick={closeDialog}>close</button>
          {showCpButton && (<button className="button"  onClick={copyToClipboard}>copy</button>)}
        </footer>
      </div>
    </div>
  );
  return createPortal(
    <DialogContainer />,
    document.getElementById("modal-root")
  );
}

export default Dialog;
