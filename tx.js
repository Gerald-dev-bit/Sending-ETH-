// importing dependencies
import Web3 from 'web3';

const rpcURL = 'your rpc server'; // I recommend using Ganache. Download the application and start a new project
const web3 = new Web3(rpcURL);

const fromAddress = 'yourAddress';
const toAddress = 'yourAddress';
const privateKey =
  'use fromAddress privateKey';

// Function to check balance of an Ethereum account
async function checkBalance(address) {
  try {
    const balance = await web3.eth.getBalance(address);
    console.log(
      `Balance of ${address}: ${web3.utils.fromWei(balance, 'ether')} ETH`
    );
  } catch (error) {
    console.error(`Error fetching balance for ${address}:`, error);
  }
}

// call the function with a valid ETH address
checkBalance(fromAddress);
checkBalance(toAddress);

// Fucntion to send ETH from one address to another
async function sendETH(fromAddress, toAddress, privateKey) {
  try {
    const amount = web3.utils.toWei('input any amount you want to send', 'ether');
    const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000;

    const transactionObject = {
      from: fromAddress,
      to: toAddress,
      value: amount,
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: nonce,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
      privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
  } catch (error) {
    console.error(
      `Error sending ETH from ${fromAddress} to ${toAddress}:`,
      error
    );
  }
}
// Function usage
sendETH(fromAddress, toAddress, privateKey);
