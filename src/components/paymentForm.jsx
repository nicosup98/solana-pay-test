import { airdrop,makeTransaction } from '../solana'
import { wallet as walletAtom } from '../atoms'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

export function PaymentForm() {
  const wallet = useRecoilValue(walletAtom)
  const [reciver,setreciver] = useState({wallet:'',amount:0})
  const handleAirdrop = async (e)=> {
    e.preventDefault()
    await airdrop(reciver);
  }

  const handleTranasaction = async (e)=> {
    e.preventDefault()
    await makeTransaction(reciver);
  }
    return (
      <>
        <div className="">
          <button className="button is-secondary mb-3"  onClick={()=>{setreciver(pv=>({...pv,wallet: wallet.publicKey.toString()}))}}>
            paste my wallet
          </button>
        </div>
        <form>
          <div className="field">
            <label className="label">wallet</label>
            <div className="control">
              <input className="input" value={reciver.wallet} type="text" name="userToPay" onChange={(e)=>{setreciver(pv=> ({...pv,wallet:e.target.value}))}}/>
            </div>
          </div>
          <div className="field">
            <label className="label">amount</label>
            <div className="control">
              <input type="number" className="input" value={reciver.amount} name="amount" onChange={(e)=>{setreciver(pv=> ({...pv,amount:e.target.value}))}}/>
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control"></div>
          </div>
    
          <button className="button is-blue" disabled={wallet.publicKey.toString() === reciver.wallet || !reciver.amount || !reciver.wallet} onClick={handleTranasaction}>
            send sol
          </button>

          <button className="button is-primary ml-2" disabled={!reciver.amount || !reciver.wallet} onClick={handleAirdrop}>
            airdrop
          </button>
        </form>
      </>
        
      );
}
