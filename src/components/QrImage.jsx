import { useEffect, useRef } from 'react'

function QrImage({children}){
    return (
        <div className='container is-fluid'>
            {children}
        </div>
    )
}

export default QrImage;