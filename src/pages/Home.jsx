import { ConnectButton } from "../components/connectButton";
import { wallet as walletAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { Link } from 'react-router-dom'
function Home() {
  const wallet = useRecoilValue(walletAtom);
  return (
    <>
      <div className="mt-2">
        {!!wallet? (
          <>
            <Link to='/Transaction'> transaction </Link>
            <Link to='/Payment'> Payment </Link>
          </>
        ) :<ConnectButton/>}

      </div>
    </>
  );
}

export default Home;
