var ipfsAPI = require('ipfs-api')

var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'}) 

exports.addToIpfs = function addToIpfs(data) {

    return ipfs.add(new Buffer(JSON.stringify(data)))
    .then(function(res) {
        return res;
    }).catch(function(err) {
        return err
    })

}


 exports.getFromIpfs = function getFromIpfs(hash) {
    return ipfs.cat(hash)
    .then(function(res) {
        return res.toString("utf8")
    }).catch(function(err) {
        return err.toString("utf8")
    })

}

