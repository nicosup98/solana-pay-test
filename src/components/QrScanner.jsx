import { QrReader } from 'react-qr-reader';

// this have an error
function QrScanner({onResult}) {
    return (
        <QrReader onResult={onResult} scanDelay={1000}/>
    )
}

export default QrScanner