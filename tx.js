// importing dependencies
import Web3 from 'web3';

// const rpcURL = "https://sepolia.infura.io/v3/2b2ef1e320624d5396c9f418a0fdc41b";
const rpcURL = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(rpcURL);

// const address = '0x3bEADC9336900B681676bb58E4DcDde35dd3970a';
const fromAddress = '0xd7aa5d659222521E969D687FaDA05a048AAc72F4';
const toAddress = '0xF4CF0e5D17E662C94900532c7177e7c4e5017D07';
const privateKey =
  '0xaf2c8d9c45c0efc4e0775434d6142411331c50772d339c0e7efd2fcc056b12fe';

// Fucntion to check balance of an Ethereum account
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
    const amount = web3.utils.toWei('20', 'ether');
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
// sendETH(fromAddress, toAddress, privateKey);
