var nacl = require("tweetnacl")
var util = require("tweetnacl-util")
var Web3 = require("web3")

var exampleEnsName = "myUsername"
var examplePassword = "myPassword"
var exampleNonce = util.decodeBase64("vwEG8KRadOw08+IrW770kb88+iOGWHxa")
var exampleJson = `{"appName": "gmail", "username": "geeogi", "password": "securePassword123", "url": "http://gmail.com"}`

var exampleBytes32String = generate32BytesFromTwoStrings(exampleEnsName, examplePassword)
var privateKey = generatePrivateKeyFromBytes32(exampleBytes32String)

// Generate a bytes32 string deterministically 
// using the username and password

function generate32BytesFromTwoStrings(a, b) {
 const hash1 = Web3.utils.sha3(a)
 const hash2 = Web3.utils.sha3(b)
 return Web3.utils.sha3(`${hash1}${hash2}`)
}

// Generate a privateKey deterministically 
// using that bytes32 string

function generatePrivateKeyFromBytes32(bytes32) {
    return nacl.box.keyPair.fromSecretKey(util.decodeBase64(`${bytes32.substr(0,43)}=`)).secretKey
}

// Encrypt a string

function encrypt(message) {
    const box = nacl.secretbox(util.decodeUTF8(message), exampleNonce, privateKey)
    const encoded = util.encodeBase64(box)
    return encoded
}  

// Decrypt a string

function decrypt(box) {
    const open  = nacl.secretbox.open(util.decodeBase64(box), exampleNonce, privateKey)
    const encoded = util.encodeUTF8(open)
    return encoded
    
}

module.exports = {
    generate32BytesFromTwoStrings: generate32BytesFromTwoStrings
}
// e.g. console.log(decrypt(encrypt(exampleJson)))
