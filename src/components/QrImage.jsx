import { useEffect, useRef } from "react";

function QrImage({ children }) {
  return (
    <div className="container">
      <div className="is-flex is-justify-content-center">{children}</div>
    </div>
  );
}

export default QrImage;
