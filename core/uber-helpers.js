var ipfs = require("./ipfs") 

var ipfs = {}
ipfs.qw123 = "/vNGIManRgI0QQQv8SMTnpDwMOaBP3PUyDXpOm1dcWByV4Oud90rmlogy7bQ7cEbdRyUSmJwASR8nP2g0kbmbNVezBvjWnkE8+yIgybVQl6rskZMDVsWlybMVH2BXatI"


exports.storeCredentials = function storeCredentials(applicationName, applicationUsername, applicationPassword, applicationUrl, userEncryptionKey, userWeb3PrivateKey, userPassword, userWeb3Address) {
    var box = window.encryptionHelpers.encrypt(`{${applicationName}, ${applicationUsername}, ${applicationPassword}, ${applicationUrl} }`, userEncryptionKey)
      ipfs.addToIpfs(box).then(ipfsHash => {
        window.web3Helpers.set(applicationName, userPassword, ipfsHash, userWeb3PrivateKey, userWeb3Address)
    })
    
  }

exports.getCredentials = function getCredentials(application, userEncryptionKey, userPassword) {
    return new Promise(function(resolve, reject) {
        window.web3Helpers.get(application, userPassword).then(async (ipfsHash) => {
            var box = await ipfs.getFromIpfs(hash)
            var open = window.encryptionHelpers.decrypt(box, userEncryptionKey)
            resolve(open)
          
        })
    })
  }