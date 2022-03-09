import { atom } from 'recoil'

export const wallet =  atom({
    key: 'wallet',
    default: null
})

export const qrData =  atom({
    key: 'qrData',
    default: null
})