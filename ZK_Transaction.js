
// When the script is run, it will connect to the Polygon ZK EVM test net, set up the 
// necessary parameters for the private transaction, and send the transaction. 

// The receipt for the transaction will be logged to the console.


const Web3 = require('web3');
const zkInterface = require('@polymathnetwork/zk-eth-contracts/abi/ISnapshot.json');
const zkBytecode = require('@polymathnetwork/zk-eth-contracts/bin/ISnapshot.bin');

async function main() {
  // Connect to Polygon ZK EVM test net
  const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-test.polygon.io/'));

  // Set up account and contract
  const account = '0x...'; // Replace with your account address
  const contract = new web3.eth.Contract(zkInterface, null, { data: zkBytecode });

  // Set up parameters for private transaction
  const goerliETHAmount = '1'; // Replace with the amount of Goerli test net ETH you want to swap
  const privateTxData = contract.methods.transfer(account, goerliETHAmount).encodeABI();
  const privateTo = contract.options.address;

  // Send private transaction
  const privateTx = {
    from: account,
    to: privateTo,
    data: privateTxData,
    privateFrom: account,
    privateTo: [privateTo],
    usePrivateNetwork: true,
  };
  const receipt = await web3.eth.sendTransaction(privateTx);
  console.log(receipt);
}

main();
