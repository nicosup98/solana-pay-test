import { ConnectButton } from "../components/connectButton";
import { wallet as walletAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { PaymentForm } from '../components/paymentForm';
function Home() {
  const wallet = useRecoilValue(walletAtom);
  
  return <div className="mt-2">{!!wallet ? <PaymentForm /> : <ConnectButton />}</div>;
}

export default Home;
