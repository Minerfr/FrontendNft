import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
 const { cart, removeAllFromCart, images } = useContext(CartContext);
 const navigate = useNavigate();

 // State to store the account address
 const [account, setAccount] = useState("");

 // State to store the contract instance
 const [contract, setContract] = useState(null);

 // State to track if the wallet is connected
 const [walletConnected, setWalletConnected] = useState(false);

 // Function to connect to MetaMask and set the account
 const connectMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setWalletConnected(true); // Enable the "Connect to Contract" button
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error('Ethereum browser extension is not installed.');
    }
 };

 // Function to connect to the smart contract
 const connectContract = async () => {
    const Address = "0x60906A689F76edb1D5D3e0F22CE207bB49bFE70d";
    const ABI = [
        {
          "inputs": [],
          "name": "changeWord",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(Address, ABI, signer);
    setContract(contractInstance);
 };

 // Automatically connect to the smart contract when the application loads
 useEffect(() => {
    if (walletConnected) {
      connectContract();
    }
 }, [walletConnected]);

 // Function to initiate the transaction with MetaMask
 const changeData = async () => {
    if (!contract) {
      console.error('Smart contract not initialized');
      return;
    }

    try {
      // Specify the recipient's address
      const recipientAddress = "0x04349Ea20B19f54233DF7B64391162b43De9EB41";

      // Specify the amount of MATIC to send (in wei)
      const amountToSend = ethers.utils.parseEther("0.001"); // Adjust the amount as needed

      // Create a transaction to send MATIC
      const tx = await contract.signer.sendTransaction({
        to: recipientAddress,
        value: amountToSend,
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction successful:', receipt);

      // If the transaction is successful, clear the cart and navigate back
      await removeAllFromCart();
      navigate('/'); // Redirect back to home page
    } catch (error) {
      console.error("Transaction failed:", error);
      // Handle transaction failure (e.g., show an error message to the user)
    }
 };

 // Calculate the total price of all items in the cart
 const totalPrice = cart.reduce((total, item) => total + item.price, 0);

 return (
    <div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <img src={item.src} alt={item.alt} />
          <p>Price: ${item.price}</p>
        </div>
      ))}
      <p>Total Price: ${totalPrice}</p>
      <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
      <button className="buy-button" onClick={changeData} disabled={!contract}>Pay</button>
      <button className="buy-button" onClick={() => navigate('/')}>Back</button>
    </div>
 );
};

export default CartPage;
