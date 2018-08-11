var Web3 = require("web3")
const tx = require('ethereumjs-tx')
const web3Provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/Njt2otjIXgtpcsbCtIhW");
const web3 = new Web3(web3Provider)

var USER_PRIVATE_KEY = "525e13e98d945933f4120ab15a1f24f21b2c58a82fe62560db093c6115b12969"
var USER_ADDRESS = "0x5Fd5d2d289d9cb427327f8505049529Ff9741AF2"

DCLP_RESOLVER_ABI = JSON.parse('[{"constant":true,"inputs":[{"name":"domainHash","type":"bytes32"}],"name":"getHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"domainHash","type":"bytes32"},{"name":"valueHash","type":"string"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
DCLP_ENS_RESOLVER_ADDRESS = "0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588"
var dclp = web3.eth.contract(DCLP_RESOLVER_ABI)
var dclpInstance = dclp.at(DCLP_ENS_RESOLVER_ADDRESS)

// ENS Functions

function set(domain, ipfsHash) {
  web3.eth.getTransactionCount(USER_ADDRESS, function(err, txCount) {
    const domainHash = web3.sha3(domain)
    const txData = {
      nonce: web3.toHex(txCount),
      gasLimit: web3.toHex(300000),
      gasPrice: web3.toHex(10e10),
      to: "0x3aF6597B35F36b7f4eC8164FCa5b3819b7bB1588",
      from: USER_ADDRESS,
      data: dclpInstance.add.getData(domainHash, ipfsHash)
    }
    const privateKey = new Buffer(USER_PRIVATE_KEY, "hex")
    const transaction = new tx(txData)
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString("hex")
    web3.eth.sendRawTransaction(("0x" + serializedTx), function(err, res) {
      console.log(err, res)
    })
  })
} 


 set("8d0dee9e0ae4fa6e284a3b5a8443014ef9558b95282eb749460c56e98a58d9cb","qw0dee9e0ae4fa6e284a3b5a8443014ef9558b95282eb749460c56e98a58d9cb")