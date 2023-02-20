<template>
  <div class="app-container">
    <div class="app-wrapper app-token">
      <div class="app-header"><h2>Overview</h2></div>
      <div class="app-content">
        <div class="avatar-wrapper">
          <div class="avatar-item">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          </div>
          <div class="avatar-item">
            <el-tag effect="dark" size="small" class="right-menu-item tag-coin">Goerli</el-tag>
          </div>
        </div>
        <div class="wallet-content">
          <div class="wallet-item">wallet-v1</div>
          <div class="wallet-item">gor:0xA9BFF0374e99834C9BcA4e7d1f0A003636CE6F87</div>
        </div>
        <div class="wallet-info">
          <div class="info-count">
            <div class="title">Tokens</div>
            <div class="number">0</div>
          </div>
          <div class="info-btn">
            <button>Token</button>
          </div>
        </div>
      </div>
    </div>
    <div class="app-wrapper app-transaction" />
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  .app-wrapper {
    flex: 0.5;
    background-color: #1c1c1c;
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 22px;
    padding: 24px;
    border-radius: 6px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }
}
</style>
