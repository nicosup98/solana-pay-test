import { useRecoilValue } from "recoil";
import { qrData as qrDataAtom } from "../atoms";
import QrImage from "../components/QrImage";
import { createQR } from "@solana/pay";
import { useEffect, useRef } from "react";
function QrPayment() {
  const url = useRecoilValue(qrDataAtom);
  const qrRef = useRef(null);
  useEffect(() => {
    const qr = createQR(url);
    qr.append(qrRef.current);
  });
  return (
    <QrImage>
      <div ref={qrRef} />
      <span>{url}</span>
    </QrImage>
  );
}

export default QrPayment;
