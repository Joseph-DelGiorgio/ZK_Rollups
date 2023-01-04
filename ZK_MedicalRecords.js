// When the script is run, it will connect to the Polygon ZK EVM test net, set up the necessary 
// parameters for the private transaction, and send the transaction. The receipt for the transaction 
// will be logged to the console. This transaction will add the specified medical record data to the records 
// for the patient with the specified ID, without revealing any sensitive information about the patient or the record.


const Web3 = require('web3');
const fs = require('fs');

async function main() {
  // Connect to Polygon ZK EVM test net
  const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-test.polygon.io/'));

  // Set up contract
  const contractAbi = JSON.parse(fs.readFileSync('MedicalRecords.abi').toString());
  const contractAddress = '0x...'; // Replace with contract address
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // Set up parameters for private transaction
  const patientId = '1234'; // Replace with the ID of the patient
  const record = {
    // Replace with the medical record data you want to store
    bloodType: 'AB+',
    allergies: ['peanuts', 'bees'],
    medications: ['ibuprofen', 'aspirin'],
  };
  const privateTxData = contract.methods.addRecord(patientId, record).encodeABI();
  const privateTo = contractAddress;

  // Send private transaction
  const privateTx = {
    from: patientId,
    to: privateTo,
    data: privateTxData,
    privateFrom: patientId,
    privateTo: [privateTo],
    usePrivateNetwork: true,
  };
  const receipt = await web3.eth.sendTransaction(privateTx);
  console.log(receipt);
}

main();
