<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div v-if="!currentAccount" class="right-menu-item btn-container">
        <button class="btn-connect" @click="connectWallet">Connect Wallet</button>
      </div>
      <div v-else>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
            <div class="user-name">gor: {{ currentAccount }}</div>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-dropdown-item @click.native="handleShowProfile">Profile</el-dropdown-item>
            <!-- <router-link to="/profile/index">
            </router-link> -->
            <router-link to="/wallet/list">
              <el-dropdown-item divided>Wallets</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <template v-if="device !== 'mobile'">
          <!-- <div class="right-menu-item">
              <div v-if="!currentContract">
                <el-button class="primaryButton" @click="attachContract">Attach Contract</el-button>
              </div>
            </div> -->
          <!-- <search id="header-search" class="right-menu-item" /> -->

          <error-log class="errLog-container right-menu-item hover-effect" />

          <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

          <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
                  <size-select id="size-select" class="right-menu-item hover-effect" />
                </el-tooltip> -->

          <el-tag effect="dark" size="small" class="right-menu-item tag-coin">Goerli</el-tag>

        </template>
      </div>
    </div>

    <div class="modal-container">
      <el-dialog
        :title="dialogData.title"
        class="modal"
        :visible.sync="dialogData.dialogVisible"
        :close-on-click-modal="false"
        :width="dialogData.width"
        :top="dialogData.marginTop"
        :before-close="handleClose"
      >
        <div class="profile-container">
          <div class="profile-avt-wrapper">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="profile-avt-item">
            <div class="profile-name">{{ profile.name }}</div>
          </div>
          <div class="profile-content">
            <div class="profile-address">gor:{{ profile.address }}</div>
            <div class="profile-info">
              <div class="info-item">Wallet <div>{{ profile.wallet }}</div></div>
              <div class="info-item">Connected network <div>{{ profile.connectedNetwork }}</div></div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog
    // Screenfull,
    // SizeSelect,
    // Search
  },
  data() {
    return {
      currentAccount: null,
      currentContract: null,
      contractAddress: '<Your deployed contract Address>',
      dialogData: {
        title: 'Profile',
        dialogVisible: false,
        width: '30%',
        marginTop: '12vh'
      },
      profile: {
        name: 'Human',
        address: '',
        wallet: 'Metamask',
        connectedNetwork: 'Goerli'
      },
      isUnlocked: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  mounted() {
    this.checkConnectedWalletExist()
  },
  methods: {
    checkConnectedWalletExist: async function() {
      try {
        const { ethereum } = window
        if (!ethereum) {
          alert('Make sure you have metamask!')
          return false
        } else {
          console.log('We have the ethereum object', ethereum)
        }
        await ethereum.on('accountsChanged', this.handleAccountsChanged)
        await ethereum.on('disconnect', this.handleDisconnect)
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if (accounts.length !== 0) {
          const account = accounts[0]
          console.log('Found an authorized account:', account)
          this.currentAccount = account
          return true
        } else {
          console.log('No authorized account found')
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
    handleAccountsChanged(accounts) {
      // Update the current account when it is changed
      this.currentAccount = accounts[0]
    },
    handleDisconnect(error) {
      // Handle the 'disconnect' event when the user's account is locked
      console.error(error)
      this.currentAccount = null
    },
    connectWallet: async function() {
      try {
        const { ethereum } = window
        if (!ethereum) {
          alert('Get MetaMask!')
          return
        }
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        })
        console.log('Connected', accounts[0])
        this.currentAccount = accounts[0]
      } catch (error) {
        console.log(error)
      }
    },
    shortenString(str) {
      if (str.length <= 28) {
        return str
      } else {
        const firstThree = str.slice(0, 20)
        const lastThree = str.slice(-5)
        return `${firstThree}...${lastThree}`
      }
    },
    handleShowProfile() {
      this.dialogData = { ...this.dialogData, dialogVisible: true }
      this.profile = { ...this.profile, address: this.shortenString(this.currentAccount) }
    },
    handleClose() {
      this.dialogData = { ...this.dialogData, dialogVisible: false }
      this.profile = { ...this.profile, address: this.shortenString(this.currentAccount) }
    },
    attachContract: async function() {
      /* const provider = new this.$ethers.providers.JsonRpcProvider('http://127.0.0.1:7545')
      const signer = provider.getSigner()*/
      // const network = await provider.getNetwork();
      // console.log(network);
      /* const abi = Greeter.abi
      // The Contract object
      this.currentContract = new this.$ethers.Contract(this.contractAddress, abi, signer)
      console.log(await this.currentContract.symbol()) */
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: $--color-background-paper;
  border-bottom: 2px solid $--color-border-light;

  /* box-shadow: 0 1px 4px rgba(48, 48, 51, .08); */
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 18px;

    &:focus {
      outline: none;
    }

    .tag-coin {
      display: inline-block;
      min-width: 70px;
      font-size: 11px;
      line-height: 24px;
      text-align: center;
      border-radius: 4px;
      padding: 4px 8px;
    }
    .btn-connect {
      outline: 0px;
      border: 0px rgb(18, 255, 128);
      margin: 0px;
      vertical-align: middle;
      min-width: 64px;
      color: rgba(0, 0, 0, 0.87);
      background-color: rgb(18, 255, 128);
      box-shadow: rgb(161 163 167) 0px 0px 2px;
      border-radius: 6px;
      font-weight: bold;
      line-height: 1.25;
      font-size: 14px;
      padding: 8px 24px;
      &:hover {
        text-decoration: none;
        background-color: rgb(12, 178, 89);
      }
    }

    .btn-container {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      /* font-size: 18px; */
      /* color: #5a5e66; */
      margin-right: 20px;
      border: 2px solid #303033;
      vertical-align: -webkit-baseline-middle;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-name {
          color: rgb(255, 255, 255);
        }

        .el-icon-caret-bottom {
          display: none;
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

  }
  .profile-container {
    display: flex;
    color: rgb(255, 255, 255);
    .profile-avt-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
      flex: 3;
      border-right: 1px solid #515151;
      padding-bottom: 14px;
      border-bottom: 1px solid #515151;
      .profile-avt-item {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
      .profile-name {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.1;
        text-align: justify;
        font-family: "DM Sans", sans-serif;
      }
    }
    .profile-content {
      flex: 7;
      display: flex;
      gap: 10px;
      flex-direction: column;

      .profile-address {
        flex: 2;
        font-size: 16px;
        border-bottom: 1px solid #515151;
        padding: 8px 16px;
      }

      .profile-info {
        flex: 8;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        .info-item {
          display: flex;
          flex: 0.5;
          width: 100%;
          justify-content: space-between;
          border-bottom: 1px solid #515151;
          padding: 4px 16px;
        }
      }
    }
  }
}
</style>
