var ipfsAPI = require('ipfs-api')

var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'}) 

const hello = {
    a:"b",
    b:"B"
}
ipfs.add(new Buffer(JSON.stringify(hello))).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err)
})