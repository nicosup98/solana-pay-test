import { createURLPayment, getUrlInfo, makePayment } from "../solana/solana";
import { useState } from "react";
import QrScanner from "../components/QrScanner";
import QrDataView from "../components/QrDataView";
import { qrData as qrDataAtom } from '../atoms'
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'

function Payment() {
  // mode to switch between sender and receiver
  const [mode, setMode] = useState("sender");

  const SenderContainer = () => {
    const navigate = useNavigate()
    const [payment, setPayment] = useState({
      amount: 0,
      label: "",
      message: "",
    });

    const [_, setQr] = useRecoilState(qrDataAtom);

    const clearForm = () => {
      setPayment({ amount: 0, label: "", message: "" });
    };
    const handlePayment = () => {
      console.log({ payment });
      const url = createURLPayment(payment);
      setQr(url);

      clearForm();
      navigate('/QrPayment')
    };
    return (
      <>
        <form
          className="mt-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="field">
            <div className="control">
              <input
                className="input"
                value={payment.amount}
                type="number"
                min="1"
                placeholder="amount"
                onInput={(e) => {
                  setPayment((pv) => ({ ...pv, amount: e.target.value }));
                }}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                type="text"
                className="input"
                value={payment.label}
                placeholder="label"
                onInput={(e) => {
                  setPayment((pv) => ({ ...pv, label: e.target.value }));
                }}
              />
            </div>
            <div className="control is-expanded">
              <input
                type="text"
                className="input"
                value={payment.message}
                placeholder="message"
                onInput={(e) => {
                  setPayment((pv) => ({ ...pv, message: e.target.value }));
                }}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={handlePayment}>
                send
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={clearForm}>
                clear
              </button>
            </div>
          </div>
        </form>
      </>
    );
  };

  const ReceiverContainer = () => {
    const [qrData, setQrData] = useState("");
    const [urlInfo, setUrlInfo] = useState(null);
    const handleScan = (data, err) => {
      //!err && !!data ? setQrData(data.text) : console.error(err);
      if (!!data) {
        setQrData(data.text);
      }
      // if(!!err) {
      // console.error(err);
      //}
    };
    const handlePayment = () => {
      const info = getUrlInfo(qrData);
      setUrlInfo(info);
    };
    return (
      <>
        <div className="is-flex is-justify-content-center">
          <div>
            <QrScanner onResult={handleScan} />
            <input
              type="text"
              value={qrData}
              onChange={(e) => {
                setQrData(e.target.value);
              }}
              className="input"
              placeholder="url payment"
            />
            <button className="button is-light mt-2" onClick={handlePayment}>
              aceptar
            </button>
          </div>
        </div>
        <div className="mt-2">
        {!!urlInfo && (< QrDataView qrData={urlInfo} onAcept={()=>{makePayment(qrData)}} />)}
        </div>
      </>
    );
  };
  return (
    <div className="box mt-2">
      <div className="control">
        <label className="radio">
          <input
            type="radio"
            name="mode"
            value="sender"
            checked={mode === "sender"}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          />
          <span className="ml-1">sender</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="mode"
            value="receiver"
            checked={mode === "receiver"}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          />
          <span className="ml-1">receiver</span>
        </label>
      </div>
      {mode === "sender" ? <SenderContainer /> : <ReceiverContainer />}
    </div>
  );
}

export default Payment;
