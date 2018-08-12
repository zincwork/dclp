
var ipfs = {}
ipfs.qw123 = "YjFRslbFMgQhhWM1gHuxJZDwMOaBP3PUyDXpOm1dcWByV4Oud90rmlogy7bQ7cEbdRyUSmJwASR8nP2gwkjARtVezEvySHkA6/Ge3TzXBFmkrnJtBVlIlCfLVX6WXoM/Nw=="


exports.storeCredentials = function storeCredentials(applicationName, applicationUsername, applicationPassword, applicationUrl, userEncryptionKey, userWeb3PrivateKey, userPassword, userWeb3Address) {
    var box = window.encryptionHelpers.encrypt(`{${applicationName}, ${applicationUsername}, ${applicationPassword}, ${applicationUrl} }`, userEncryptionKey)
    window.ipfs.addToIpfs(box).then(ipfsHash => {
        window.web3Helpers.set(applicationName, userPassword, ipfsHash, userWeb3PrivateKey, userWeb3Address)
    })
    
  }

exports.getCredentials = function getCredentials(application, userEncryptionKey, userPassword) {
    return new Promise(function(resolve, reject) {
        window.web3Helpers.get(application, userPassword).then((ipfsHash) => {
            var box = ipfs[ipfsHash]
            var open = window.encryptionHelpers.decrypt(box, userEncryptionKey)
            resolve(open)
          
        })
    })
  }