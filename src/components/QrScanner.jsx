import { QrReader } from 'react-qr-reader';

// this have an error
function QrScanner({scanFn}) {
    return (
        <QrReader onResult={scanFn} scanDelay={500}/>
    )
}

export default QrScanner