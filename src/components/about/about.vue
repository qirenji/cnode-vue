<template>
<!-- 关于 页面信息 -->
	<div class="about">
		<i @click="showAbout" class="close"></i>
		<div class="about-content">
			<h1>关于</h1>
			<h2>Vue.js打造一个开源的CNode社区</h2>
			<p class="skill"><b>技术栈</b>：</p>
      <div>Vue2<br>Vuex(不同组件状态共享)<br>vue-router(路由)<br>axios(发起http请求)<br>SASS(SCSS)<br>Express<br>Webpack<br>Moment.js(时间处理)<br>ES6<br>localStorage(HTML5)<br>CSS3</div>
      <p class="url"><b>源码地址</b>：<a href="javascript:" target="_blank">GitHub</a></p>
      <p class="url"><b>个人网站</b>：<a href="http://www.qirenji.info" target="_blank">qirenji</a></p>
		</div>
		<div class="mask" @click="showAbout"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		showAbout() {
			this.$store.commit('showAbout', false);
		}
	}
}

</script>


<style lang='scss' scoped>
	.about {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 0, 0, .5);
    .close {
      position: absolute;
      z-index: 3;
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url('./close.svg') no-repeat;
      background-size: contain;
      top: 11%;
      right: 12%;
    }
    @media screen and (min-width: 760px) {
      .close {
        right: 26%;
      }
    }
    .about-content {
      position: relative;
      z-index: 2;
      width: 80%;
      height: 80%;
      background-color: white;
      border-radius: 10px;
      padding: 30px 10px;
      box-shadow: 0 0 20px gray;
      overflow: auto;

      h1 {
        text-align: center;
        font-size: 1.6rem;
        color: #31c27c;
				padding: 20px;	
	      }
      h2 {
        font-size: 1.2rem;
        text-align: center;
      }
      .skill,.url {
        text-indent: 1.2rem;
        margin-top: 16px;
        line-height: 2rem;
        b {
          display: inline-block;
        }

      }
      div {
        padding-left: 60px;
        line-height: 1.5rem;
      }
      
    }
    @media screen and (min-width: 760px) {
      .about-content {
        width: 50%!important;
      }
    }
    .mask {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: none;
    }
  }
</style>
