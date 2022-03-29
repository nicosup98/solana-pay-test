function QrDataView({ qrData, onAccept, onSuccess }) {
  const { amount, label, message } = qrData;
  const handlePayment = async ()=> {
    const response = await onAccept()
    console.log({response});
    if (response) {
      onSuccess()
    }   
  }
  return (
    <>
      <div className="box">
        <div className="section">
          <h1 className="title">{label}</h1>
          <h2 className="subtittle">{message}</h2>
          <button className="button is-primary" onClick={handlePayment}>monto {amount.toNumber()} sol</button>
        </div>
      </div>
    </>
  );
}

export default QrDataView;
