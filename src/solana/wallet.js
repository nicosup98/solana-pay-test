import { getProvider } from './provider'
export async function connectWallet(){
    try {
        const provider =getProvider();
        return await provider.connect()
    } catch (error) {
        console.error(error)
    }
}

