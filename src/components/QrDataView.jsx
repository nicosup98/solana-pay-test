function QrDataView({ qrData }) {
  const { amount, label, message, recipient, reference } = qrData;
  return (
    <>
      <div className="box">
        <div className="section">
          <h1 className="title">{label}</h1>
          <h2 className="subtittle">{message}</h2>
          <button className="button is-primary">monto {amount.toNumber()}</button>
        </div>
      </div>
    </>
  );
}

export default QrDataView;
