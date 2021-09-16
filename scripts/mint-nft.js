require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyFirstNFT.sol/MyFirstNFT.json");
const contract_address = '0x2E11Fe044e58A2Db7a9894dc3203391dDc8d7db4';
const nft_contract = new web3.eth.Contract(contract.abi,contract_address);

async function mintNFT(tokenURI){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

  // create tx
  const tx = {
    'from': PUBLIC_KEY,
    'to': contract_address,
    'nonce': nonce,
    'gas':500000,
    'data': nft_contract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise
  .then((signedTx) => {
    // send tx
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function(err, hash) {
        if(!err){
          console.log('The hash of your transaction is: ', hash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!");
        } else {
            console.log('something went wrong when submitting the transaction: ',
            err);
        }
      }
    );
  })
  .catch((err) => {
    console.log('Promise failed', err);
  });
}

mintNFT('https://gateway.pinata.cloud/ipfs/QmYusUf5nbc7KKLgNnF6UShTAxLdJtoUE1zbBcwtBGg6yx');
