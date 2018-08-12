var nacl = require("tweetnacl")
var util = require("tweetnacl-util")
var Web3 = require("web3")
const web3 = new Web3()

var exampleEnsName = "myUsername"
var examplePassword = "myPassword"
var exampleNonce = util.decodeBase64("vwEG8KRadOw08+IrW770kb88+iOGWHxa")
var exampleJson = `{"appName": "gmail", "username": "geeogi", "password": "securePassword123", "url": "http://gmail.com"}`

var exampleBytes32String = generate32BytesFromTwoStrings(exampleEnsName, examplePassword)
var privateKey = generatePrivateKeyFromBytes32(exampleBytes32String)
 
function generateEncryptionKeyFromUsernameAndPassword(username, password) {
    var bytes32String = generate32BytesFromTwoStrings(username, password)
    return generatePrivateKeyFromBytes32(bytes32String)
}

// Generate a bytes32 string deterministically 
// using the username and password

function generate32BytesFromTwoStrings(a, b) {
 const hash1 = web3.sha3(a)
 const hash2 = web3.sha3(b)
 return web3.sha3(`${hash1}${hash2}`)
}

// Generate a privateKey deterministically 
// using bytes32 string

function generatePrivateKeyFromBytes32(bytes32) {
    return nacl.box.keyPair.fromSecretKey(util.decodeBase64(`${bytes32.substr(0,43)}=`)).secretKey
}

// Encrypt a string

function encrypt(message, userPrivateKey) {
    const box = nacl.secretbox(util.decodeUTF8(message), exampleNonce, userPrivateKey)
    const encoded = util.encodeBase64(box)
    return encoded
}  

// Decrypt a string

function decrypt(box, userPrivateKey) {
    const open  = nacl.secretbox.open(util.decodeBase64(box), exampleNonce, userPrivateKey)
    const encoded = util.encodeUTF8(open)
    return encoded
    
}

module.exports = {
    generate32BytesFromTwoStrings: generate32BytesFromTwoStrings
}
// e.g. console.log(decrypt(encrypt(exampleJson)))
