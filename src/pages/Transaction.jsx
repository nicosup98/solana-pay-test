import { airdrop,makeTransaction } from '../solana/solana'
import { wallet as walletAtom } from '../atoms'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'

function Transaction() {
  const wallet = useRecoilValue(walletAtom)
  const [receiver,setreceiver] = useState({wallet:'',amount:0})
  const handleAirdrop = async (e)=> {
    e.preventDefault()
    await airdrop(receiver);
  }

  const handleTranasaction = async (e)=> {
    e.preventDefault()
    await makeTransaction(receiver);
  }
    return (
      <>
        <div className="mt-3">
          <button className="button is-secondary mb-3"  onClick={()=>{setreceiver(pv=>({...pv,wallet: wallet.publicKey.toString()}))}}>
            paste my wallet
          </button>
        </div>
        <form>
          <div className="field">
            <label className="label">wallet</label>
            <div className="control">
              <input className="input" value={receiver.wallet} type="text" name="userToPay" onChange={(e)=>{setreceiver(pv=> ({...pv,wallet:e.target.value}))}}/>
            </div>
          </div>
          <div className="field">
            <label className="label">amount</label>
            <div className="control">
              <input type="number" className="input" value={receiver.amount} name="amount" onChange={(e)=>{setreceiver(pv=> ({...pv,amount:e.target.value}))}}/>
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control"></div>
          </div>
    
          <button className="button is-blue" disabled={wallet.publicKey.toString() === receiver.wallet || !receiver.amount || !receiver.wallet} onClick={handleTranasaction}>
            send sol
          </button>

          <button className="button is-primary ml-2" disabled={!receiver.amount || !receiver.wallet} onClick={handleAirdrop}>
            airdrop
          </button>
        </form>
      </>
        
      );
}

export default Transaction;
