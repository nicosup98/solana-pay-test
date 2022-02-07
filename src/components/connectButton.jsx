import { connectWallet } from "../solana/solana";
import { useRecoilState } from "recoil";
import { wallet as walletAtom } from "../atoms";

export function ConnectButton() {
  const [_, setWallet] = useRecoilState(walletAtom);

  const handleConnectWallet = async () => {
    const wallet = await connectWallet();
    setWallet(wallet);
  };
  return (
    <div className="is-flex is-justify-content-center">
      <button className="button is-ligth" onClick={handleConnectWallet}>
        Connect Wallet
      </button>
    </div>
  );
}
