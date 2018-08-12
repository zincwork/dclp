var Web3 = require("web3")
const tx = require('ethereumjs-tx')
const wallet = require('ethereumjs-wallet')
const web3Provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/Njt2otjIXgtpcsbCtIhW");
const web3 = new Web3(web3Provider)


//  e.g. generateWeb3AccountFromUsernameAndPassword("myUsername", "myPassword")

<<<<<<< HEAD
exports.generateWeb3AccountFromUsernameAndPassword = function generateWeb3AccountFromUsernameAndPassword(username, password) {
=======
 exports.generateWeb3Account = function generateWeb3AccountFromUsernameAndPassword(username, password) {
>>>>>>> 83ac13a06aa2f72a079bd9b1a6feecddf9bf68b1
  const hash1 = web3.sha3(username)
  const hash2 = web3.sha3(password)
  const bytes32 = web3.sha3(`${hash1}${hash2}`)
  const privateKey = wallet.fromPrivateKey(new Buffer(bytes32.substr(2,66), "hex")).getPrivateKey().toString('hex')
  const address = wallet.fromPrivateKey(new Buffer(bytes32.substr(2,66), "hex")).getAddress().toString('hex')
  return { privatekey: privateKey, address: address}
 }

DCLP_RESOLVER_ABI = JSON.parse('[{"constant":true,"inputs":[{"name":"domainHash","type":"bytes32"}],"name":"getHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"domainHash","type":"bytes32"},{"name":"valueHash","type":"string"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
DCLP_ENS_RESOLVER_ADDRESS = "0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588"
var dclp = web3.eth.contract(DCLP_RESOLVER_ABI)
var dclpInstance = dclp.at(DCLP_ENS_RESOLVER_ADDRESS)

// web3 function 
// e.g. set("amazon", "mySecurePassword123", "qw03j382919s929292")

exports.set = function set(domain, password, ipfsHash, userPrivateKey, userAddress) {
  web3.eth.getTransactionCount(userAddress, function(err, txCount) {
    console.log(err, txCount)
    const domainHash = web3.sha3(`${domain}${password}`)
    const txData = {
      nonce: web3.toHex(txCount),
      gasLimit: web3.toHex(300000),
      gasPrice: web3.toHex(10e10),
      to: "0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588",
      from: userAddress,
      data: dclpInstance.add.getData(domainHash, ipfsHash)
    }
    const privateKey = new Buffer(userPrivateKey, "hex")
    const transaction = new tx(txData)
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString("hex")
    web3.eth.sendRawTransaction(("0x" + serializedTx), function(err, res) {
      console.log(err, res)
    })
  })
} 

//e.g. get("amazon", "mySecurePassword123").then(console.log)

exports.get = function get(domain, password) {
  return new Promise(function(resolve, reject) {
  const domainHash = web3.sha3(`${domain}${password}`)
    dclpInstance.getHash.call(domainHash, function(err, res) {
      resolve(res)
    })
  })
} 
