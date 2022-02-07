import { clusterApiUrl, Connection } from '@solana/web3.js'

const CURRENTNETWORK = clusterApiUrl('devnet')

export function getConnection(){
    return new Connection(CURRENTNETWORK,'confirmed')
}