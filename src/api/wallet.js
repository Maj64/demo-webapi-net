// import data from '../data/Wallet.json'
// import store from '@/store'

// const WALLET_CONTRACT_ABI = [
//   'function addOwner(address) public',
//   'function withdraw(address, uint) external',
//   'function submitTransaction(address,uint,bytes,address)',
//   'function confirmTransaction(uint) public',
//   'function executeTransaction(uint) public',
//   'function revokeConfirmation(uint) public',
//   'function getBalance() external view',
//   'function getOwners() public view',
//   'function getOwners() public view',
//   'function getTransactions() public view',
//   'function getTokens() public view',
//   'function getTransactionCount() public view',
//   'function getTransaction(uint) public view',
//   'function addTokenManage(address)',
//   'function createToken(string,string,uint8,uint256) public',
//   'function getBalanceOfToken(address,address) public view'
// ]

// const walletAddress = '0x220227062F914bFe6fE15302077a615eD296dD07'
// // const walletByteCode = JSON.parse(data).bytecode

// export async function get() {
//   console.log(store.state.provider)
//   return
//   const contract = new getters.ethers.Contract(walletAddress, WALLET_CONTRACT_ABI, getters.provider)
//   console.log(contract.getOwners())

//   // Wallet.setProvider(web3.currentProvider)
//   // const multiSig = await Wallet.at(wallet)
//   // const balance = web3.utils.fromWei(await web3.eth.getBalance(multiSig.address), 'ether')
//   // const owners = await multiSig.getOwners()
//   // const name = await multiSig.name()
//   // const tokens = await multiSig.getTokens()
//   // const numConfirmationsRequired = await multiSig.numConfirmationsRequired()
//   // const detailTokens = []
//   // return {
//   //   name,
//   //   address: multiSig.address,
//   //   balance: Number(balance).toFixed(4),
//   //   owners,
//   //   tokens,
//   //   numConfirmationsRequired: numConfirmationsRequired.toNumber(),
//   //   transactionCount: 1,
//   //   transactions: [],
//   //   detailTokens
//   // }
// }
// // async function deposit(web3, account, params)
// // async function createWallet(web3, account, params)
// // async function importWallet(web3, account, params)
// // async function addUserToWallet(web3, account, params)
// // async function getTokensApi(web3, account, params)
// // async function getTransactionsApi(web3, account, params)
// // async function getOwnersApi(web3, account, params)
// // async function submitRequestOwner(web3, account, params)
// // async function confirmRequestOwner(web3, account, params)
// // async function executeRequestOwner(web3, account, params)
// // async function getWalletAtAddress(web3, account, params)
// // async function submitTransaction(web3, account, params)
// // async function confirmTransaction(web3, account, params)
// // async function revokeConfirmation(web3, account, params)
// // async function executeTransaction(web3, account, params)
// // async function createToken(web3, account, params)
// // async function getBalanceOfToken(web3, account, params)
// // function subscribe(web3, address, callback)
