import { useRecoilValue } from "recoil";
import { qrData as qrDataAtom } from "../atoms";
import QrImage from "../components/QrImage";
import { createQR } from "@solana/pay";
import { useEffect, useRef, useState } from "react";
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
    alert("Link copied to clipboard");
  };

  const downloadQr = () => {
    qrSt.download({extension:'jpeg'});
    alert("QR image downloaded");
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
    </>
  );
}

export default QrPayment;
