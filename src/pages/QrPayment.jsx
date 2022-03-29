import { useRecoilValue } from "recoil";
import { qrData as qrDataAtom } from "../atoms";
import QrImage from "../components/QrImage";
import { createQR } from "@solana/pay";
import { useEffect, useRef, useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
function QrPayment() {
  const url = useRecoilValue(qrDataAtom);
  const qrRef = useRef(null);
  const [qrSt, setQr] = useState(null);
  useEffect(() => {
    const qr = createQR(url, 200);
    qr.append(qrRef.current);
    setQr(qr);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    NotificationManager.info("", "Link copied to clipboard", 2000);
  };

  const downloadQr = () => {
    qrSt.download();
    NotificationManager.success("", "qr downloaded", 2000);

  };
  return (
    <>
      <QrImage>
        <div className="box">
          <div ref={qrRef} />
          <a className="is-size-5  mr-2" onClick={copyLink}>
            copy link
          </a>
          <a className="is-size-5 ml-2" onClick={downloadQr}>
            download qr
          </a>
        </div>
      </QrImage>
      <NotificationContainer/>
    </>
  );
}

export default QrPayment;
