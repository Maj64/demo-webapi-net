// api
// get token
import Web3 from 'web3'

const state = {
  account: '',
  balance: '0',
  web3: null,
  netId: 0
}

const mutations = {
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  UPDATE_ACCOUNT: (state, web3Data) => {
    const web3 = web3Data.web3 || state.web3
    const { account, balance } = web3Data
    state.web3 = web3
    state.account = account
    state.balance = balance
  },
  UPDATE_NET_ID: (state, netId) => {
    state.netId = netId
  }
}

const actions = {
  updateAccount({ commit }, web3Data) {
    commit('UPDATE_ACCOUNT', web3Data)
  },
  updateNetId({ commit }, netId) {
    commit('UPDATE_NET_ID', netId)
  },
  async getConnectionInfo({ commit, state }) {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Make sure you have metamask!')
        return false
      }
      await ethereum.on('accountsChanged', function handleAccountsChanged(accounts) {
        // Update the current account when it is changed
        const newAccount = accounts[0]
        commit('UPDATE_ACCOUNT', { ...state, account: newAccount })
      })
      await ethereum.on('disconnect', function handleDisconnect(error) {
        // Handle the 'disconnect' event when the user's account is locked
        console.error(error)
        const newAccount = null
        commit('UPDATE_ACCOUNT', { ...state, account: newAccount })
      })
      const web3 = new Web3(ethereum)
      const accounts = await web3.eth.getAccounts()
      const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether')
      console.log('store', accounts)
      commit('UPDATE_ACCOUNT', { web3, account: accounts[0] || '', balance: Number(balance).toFixed(4) })
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
