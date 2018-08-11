# dclp
ENS Hackathon (Team DCLP)

PROJECT DESCRIPTION

OVERVIEW
The DCLP (Decentralised LastPass) project replicates core functionality from LastPass (password storage) application in a decentralised manner, securely storing a user's login usernames and passwords on the blockchain & IPFS

SITE ACCESS DATA

The data required to log into a site is defined below

siteAccessData = #{
  appName: "gmail",
  username: "geeogi",
  password: "securePassword123",
  url: "https://gmail.com"
}

IPFS & BLOCKCHAIN
The siteAccessData is stored on IPFS after being encrypted with the user's password. The IPFS hash obtained from adding this to IPFS is called the "siteAccessDataIPFSHash".

The "siteAccessDataIPFSHash "is stored on the Resolver contract aginst the domainHash. The domainHash is a hash of the site url (e.g. https://gmail.com) with the user's ENS name as below (from Resolver.sol)

  function add(bytes32 domainHash, string valueHash) external {
          allHashes[domainHash] = valueHash;
      }

USER'S UNIVERSAL PRIVATE KEY
The extension automatically generates a private key (ethereum account) per user by hashing the user's ENS name and the user's password.

EXTENSION 

Functionality
a. The extension uses a password so the user can access it
b. The extension has a set of hard-code url/username/passwords initially
c. The user's ENS_ID & password is set the first time the extension is launched (hardcoded for th first version?)
d. The extension displays a list of urls that it can log into automatically
 
Operation
1. If a user types a site URL into a browser, the extension 
  a. Checks if the user is already logged into that site, and if they are logged in the extension does nothing
  b. If the user is not logged in, the extension checks if the login credentials for that URL i.e. URL.<APPLICATION-NAME>.<ENS_ID> exists on the blockchain
  c. If the blockchain does have the password URL, then the username & password for that URL are retrieved 
  d. If blockchai does not have credentials for that domain, it does nothing (for now, eventually it will prompt the user to add the URL credentials)

2. If the extension has retrieved site credentials it fills in the username/password fields and auto 'presses' the login button
a. If the login fails the extension prompts the suser to update thelogin credentials (future functionailty)



