import { Transaction,SystemProgram,PublicKey,LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getConnection } from './connection'

export async function airdrop(transactionData) {
    console.log({transactionData});
    const connection = getConnection();
    try {
        let airdropSignature = await connection.requestAirdrop(
            new PublicKey(transactionData.wallet),
            Number(transactionData.amount)* LAMPORTS_PER_SOL,
        );
        
        await connection.confirmTransaction(airdropSignature);
        alert('airdrop done')
    } catch (error) {
        console.error(error);
    }

}

export async function makeTransaction(transactionData){
    console.log({transactionData});
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
            lamports:Number(transactionData.amount)* LAMPORTS_PER_SOL,
        }));
       const signed = await provider.signTransaction(transaction);
       const signature = await connection.sendRawTransaction(signed.serialize());
       await connection.confirmTransaction(signature);
        alert('transaction done')
    } catch (error) {
        console.error(error);
    }

}