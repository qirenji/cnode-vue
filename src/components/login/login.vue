<template>
  <div class="login">
    <div class="login-header">
      <i class="icon-back" @click="showLogin"></i>登录
    </div>

    <div class="input">
      <input v-model="inputVal" type="text" placeholder="请输入Access Token">
      <button @click.stop.prevent="check(inputVal)">验证</button>
    </div>
  
    <div class="tips">
      <ul>
        <li>为了更好的体验情登录😊</li>
        <li>输入CNode账号的Access Token😄</li>
        <li>在个人中心可以获取Access Token😉</li>
        <li>调用的是官方API,请放心使用🤗</li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  name: 'login',
  
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    showLogin() {
      this.$store.commit('showLogin',false);
      // this.$store.commit('showMsg',false);
    },
    // 验证accesstoken
    check(ak) {
      if(!ak.trim()) {
        return;
      }
      this.axios.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: ak})
        .then(result => {
          if(result.status === 200){
            return result.data;
          }
        })
        .catch(function(error) {
          console.log('验证失败',error);
        })
        .then((userInfo) => {
          this.$store.commit('updateUserInfo',userInfo);
          this.$store.commit('updateAk',ak);
          localStorage.userInfo = JSON.stringify(userInfo);
          localStorage.ak = ak;
          this.showLogin();
        })
    }
    
  },
  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  monted() {
    this.inputVal = this.ak;
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;

    .login-header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 60px;
      background-color: #5c5e63;
      color: white;
      font-size: 1.4rem;

      i.icon-back {
        position: absolute;
        left: 10px;
        top: 11px;
        display: inline-block;
        width: 38px;
        height: 38px;
        background: url('../../common/icons/icon-back.svg') no-repeat;
        background-size: contain;
      }
    }

    .input {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 120px;
      flex: 1;
      width: 100%;
      // background-color: rgba(0, 0, 0, .1);

      input {
        outline: none;
        border: none;
        height: 30px;
        width: 250px;
        // border-radius: 5px;
        border-bottom: 1px solid gray;
        font-size: 1.3rem;
        padding: 0;
      }

      button {
        margin-top: 30px;
        font-size: 1.3rem;
        background-color: #2196f3;
        color: white;
        border: none;
        padding: 5px 15px;
        border-radius: 5px;
        letter-spacing: 3px;
        outline: none;
      }
    }
    .tips {
      flex: 2;
      color: gray;
      // box-shadow: 0 0 10px gray;
      // border: 1px solid gray;
      li {
        list-style: disc;
        padding-top: 20px;
        font-size: 16px;
      }
    }
  }
</style>
