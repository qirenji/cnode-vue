<template>
  <div id="app">

    <VHeader></VHeader>
    
    <VContent></VContent>

    <AsideMenu></AsideMenu>

    <transition name="show">
      <Login v-if="isShowLogin"></Login>
    </transition>

    <transition name="show">
      <Msg v-if="isShowMsg"></Msg>
    </transition>

    <transition name="show">
      <NewArticle v-if="isShowNewArticle"></NewArticle>
    </transition>

    <transition name="show">
      <Info v-if="isShowInfo"></Info>
    </transition>

    <transition name="show">
      <About v-if="isShowAbout"></About>
    </transition>

    

  </div>
</template>

<script>
import VHeader from 'components/header/header.vue';
import VContent from 'components/content/content.vue';
import AsideMenu from 'components/asidemenu/asidemenu.vue'
import Login from 'components/login/login.vue'
import Info from 'components/info/info.vue'
import Msg from 'components/msg/msg.vue'
import NewArticle from 'components/newarticle/newarticle.vue'
import About from 'components/about/about.vue'

export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    AsideMenu,
    Login,
    Msg,
    NewArticle,
    Info,
    About
  },
  computed: {
    isShowLogin() {
      return this.$store.state.isShowLogin;
    },
    isShowMsg() {
      return this.$store.state.isShowMsg;
    },
    isShowInfo() {
      return this.$store.state.isShowInfo;
    },
    isShowNewArticle() {
      return this.$store.state.isShowNewArticle;
    },
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

.show-enter-active {
  transition: all .3s ease;
}
.show-leave-active {
  transition: all .2s ease-in;
}
.show-enter, .show-leave-active {
  transform: translateX(200px);
  opacity: 0;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>
