require('dotenv').config()
const ethers = require('ethers');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const etherscan_key = process.env.ETHERSCANAPIKEY
const network = 'ropsten';
const provider = new ethers.providers.EtherscanProvider(network, etherscan_key);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = require("../artifacts/contracts/MyFirstNFT.sol/MyFirstNFT.json");
console.log(JSON.stringify(contract.abi))
