const encryptionHelpers = require('./encryption-helpers');
const uberHelpers = require('./uber-helpers');
const web3Helpers = require('./web3-helpers');
const ipfs = require('./ipfs');

console.log(web3Helpers)
if (window) {
  window.encryptionHelpers = encryptionHelpers;
  window.web3Helpers = web3Helpers;
  window.ipfs = ipfs;
  window.uberHelpers = uberHelpers;
}
