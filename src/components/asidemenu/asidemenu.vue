<template>
<!-- 侧边栏页面信息 -->
	<div class="aside-menu" v-show="isShowAsideMenu">
		<div class="menu">
			<div class="user" @click="InfoOrLogin">
			<!-- userInfo.success ? 'showInfo' : 'showLogin' -->
				<span class="user-avatar" >
					<img :src="userInfo.avatar_url || 'http://omratag7g.bkt.clouddn.com/icon-unlogin.svg'" alt="">
				</span>
				<span class="username">
					{{userInfo.success ? userInfo.loginname : '登录'}}
				</span>
			</div>

			<div class="infos">
				<div class="msg block" @click="showMsg">
					<i class="icon-msg"></i>我的消息
				</div>
				<div class="new block" @click="showNewArticle">
					<i class="icon-new"></i>发布话题
				</div>
				<div class="info block" @click="showInfo">
					<i class="icon-info"></i>个人中心
				</div>
				<div class="about block" @click="showAbout">
					<i class="icon-about"></i>关于
				</div>
			</div>
		</div>

		<div class="mask" @click.stop.prevent="showAsideMenu"></div>
	</div>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			isShowAsideMenu() {
				return this.$store.state.isShowAsideMenu;
			},
			// 用户信息
			userInfo() {
				// console.log(this.$store.state.userInfo);
				return this.$store.state.userInfo;
			}
		},
		methods:{
			showAsideMenu() {
				this.$store.commit('showAsideMenu',false);
			},
			showLogin() {
				this.$store.commit('showLogin',true);
			},
			showMsg() {
				this.$store.commit('showMsg',true);
			},
			showNewArticle() {
				this.$store.commit('showNewArticle',true);
			},
			showInfo() {
				this.$store.commit('showInfo',true);
			},
			showAbout() {
				this.$store.commit('showAbout', true);
			},
			InfoOrLogin() {
				if(this.userInfo.success){
					this.$store.commit('showInfo',true);
					return;
				}
				this.$store.commit('showLogin',true);
			}
		}

	}

</script>


<style lang="scss">
	.aside-menu {
		position: absolute;
		display: flex;
		z-index: 1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;

		.menu {
			width: 150px;
			background-color: #5c5e63;
			opacity:.9;
			color: #eee;
			padding-top: 60px;
			.user {
				width: 110px;
				padding-bottom: 10px;
				margin-left: 25px;
				border-bottom: 2px solid #fff;
				cursor: pointer;
				.user-avatar{
					img{
						width: 30px;
						height: 30px;
					}
				}
				.username{
					font-size: 18px;
					position: relative;
					top: -8px;
					left: 15px;
				}
			}
			.infos{
				display: flex;
				flex-direction: column;
				margin-top: 20px;
				.block {
					height: 50px;
					text-align: center;
					border-bottom: 1px solid #ccc;
					line-height: 50px;
          cursor: pointer;
				}
				.about {
					border: none;
					letter-spacing: 8px;
				}
				i {
					position: relative;
					top: 5px;
          display: inline-block;
          width: 22px;
          height: 22px;
          background-repeat: no-repeat;
          margin-right: 8px;
        }
        .icon-msg {
          background: url('../../common/icons/icon-msg.svg');
          background-size: contain;
        }
        .icon-new {
          background: url('../../common/icons/icon-new.svg');
          background-size: contain;
        }
        .icon-info {
          background: url('../../common/icons/icon-info.svg');
          background-size: contain;
        }
        .icon-about {
          background: url('../../common/icons/icon-about.svg');
          background-size: contain;
          margin-right: 20px;
        }
			}
		}
		.mask {
			flex:1;
			z-index: 40;
		}
	}
</style>

