var ipfs = require("./ipfs") 

 var qw123 = "YjFRslbFMgQhhWM1gHuxJZDwMOaBP3PUyDXpOm1dcWByV4Oud90rmlogy7bQ7cEbdRyUSmJwASR8nP2gwkjARtVezEvySHkA6/Ge3TzXBFmkrnJtBVlIlCfLVX6WXoM/Nw=="


exports.storeCredentials = function storeCredentials(applicationName, applicationUsername, applicationPassword, applicationUrl, userEncryptionKey, userWeb3PrivateKey, userPassword, userWeb3Address) {
    var box = window.encryptionHelpers.encrypt(`{${applicationName}, ${applicationUsername}, ${applicationPassword}, ${applicationUrl} }`, userEncryptionKey)
      ipfs.addToIpfs(qw123).then(ipfsHash => {
          console.log("ipfshash",ipfsHash)
        window.web3Helpers.set(applicationName, userPassword, ipfsHash, userWeb3PrivateKey, userWeb3Address)
    })
    
  }

exports.getCredentials = function getCredentials(application, userEncryptionKey, userPassword) {
    return new Promise(function(resolve, reject) {
        window.web3Helpers.get(application, userPassword).then(async (ipfsHash) => {
            var box = qw123
            var open = window.encryptionHelpers.decrypt(box, userEncryptionKey)
            resolve(open)
          
        })
    })
  }