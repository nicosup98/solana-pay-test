import { Transaction,SystemProgram,PublicKey,LAMPORTS_PER_SOL, Keypair,sendAndConfirmTransaction } from '@solana/web3.js'
import { getConnection } from './connection'
import { createTransaction,encodeURL,parseURL  } from "@solana/pay"
import { getProvider } from './provider'
import { BigNumber } from 'bignumber.js'

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

export function createURLPayment({amount, label, message}){
    //const {amount, label, message}= paymentData;
    const provider = getProvider();
    const recipient = provider.publicKey
    const reference = new Keypair().publicKey
    const url = encodeURL({amount: new BigNumber(amount),label , message, recipient, reference})
    return url

}

export async function makePayment(encodedURL){
    let isPaymentDone = false;
    try {
        const provider = getProvider();
        const connection = getConnection();
        const {amount, label, message, recipient, reference} = getUrlInfo(encodedURL);
        const payer = provider.publicKey
        const tx = await createTransaction(connection,payer,recipient,new BigNumber(amount),{reference})
        const recentBlockHash = await connection.getRecentBlockhash();
        tx.recentBlockhash = recentBlockHash.blockhash
        tx.feePayer = payer
        console.log({tx});
        const signed = await provider.signTransaction(tx);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);
        isPaymentDone = true;
        
    } catch (error) {
        console.error(error);
        isPaymentDone = false;
    }
    return isPaymentDone;
    
}

export function getUrlInfo(url){
    return parseURL(url);
}

