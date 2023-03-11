import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./contracts/chai.json";
import './App.css';
import Buy from './components/Buy';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x026f6a86fa66d02ccf84238d556c95b962fb395a";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts" })
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({ provider, signer, contract });
      }
      catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div className="App">
      <Buy state={state}></Buy>
    </div>
  );
}

export default App;
