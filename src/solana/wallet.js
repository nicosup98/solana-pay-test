import { Transaction,SystemProgram,sendAndConfirmTransaction,PublicKey,LAMPORTS_PER_SOL,Keypair } from '@solana/web3.js'
import { getConnection } from './connection'
import { getProvider } from './provider'
export async function connectWallet(){
    try {
        const provider =getProvider();
        return await provider.connect()
    } catch (error) {
        console.error(error)
    }
}

export async function airdrop(transactionData) {
    const connection = getConnection();
    try {
        let airdropSignature = await connection.requestAirdrop(
            new PublicKey(transactionData.wallet),
            Number(transactionData.amount * LAMPORTS_PER_SOL),
        );
        
        await connection.confirmTransaction(airdropSignature);
        alert('airdrop done')
    } catch (error) {
        console.error(error);
    }

}

export async function makeTransaction(transactionData){
    const connection = getConnection();
    const provider = getProvider();
    const recentBlockHash = await connection.getRecentBlockhash();
    try {
        const transaction = new Transaction({
            feePayer: provider.publicKey,
            recentBlockhash: recentBlockHash.blockhash,
        });
        transaction.add(SystemProgram.transfer({
            fromPubkey:provider.publicKey,
            toPubkey:new PublicKey(transactionData.wallet),
            lamports:Number(transactionData.amount * LAMPORTS_PER_SOL),
        }));
       const signed = await provider.signTransaction(transaction);
       const signature = await connection.sendRawTransaction(signed.serialize());
       await connection.confirmTransaction(signature);
        alert('transaction done')
    } catch (error) {
        console.error(error);
    }

}