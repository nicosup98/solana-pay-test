function QrDataView({ qrData, onAcept }) {
  const { amount, label, message } = qrData;
  return (
    <>
      <div className="box">
        <div className="section">
          <h1 className="title">{label}</h1>
          <h2 className="subtittle">{message}</h2>
          <button className="button is-primary" onClick={onAcept}>monto {amount.toNumber()}</button>
        </div>
      </div>
    </>
  );
}

export default QrDataView;
