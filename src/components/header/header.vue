<template>
	<div class="header">
		<div class="title">
			<i class="icon-menu" @click.stop.prevent="showAsideMenu"></i>
			<h1>CNode社区</h1>
			<i class="icon-msg" v-show="ak" @click="showMsg"></i>
			<span @click="showMsg" class="msg-count" v-show="msgCount !== 0">{{msgCount}}</span>
			<span @click="signout" v-show="ak" class="singout">退出</span>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				msgCount: 0,
				signOutConfirm: false
			}
		},
		methods: {
			showAsideMenu() {
				this.$store.commit('showAsideMenu',true);
			},
			showMsg() {
				this.$store.commit('showMsg', true);
			},
			signout() {
				this.signOutConfirm = confirm('确认退出登录吗？');
				if(this.signOutConfirm){
					localStorage.clear();
					location.reload()
				}
			}
		},
		computed: {
			ak() {
				return this.$store.state.ak;
			}
		},
		created() {
			if(!this.ak) {
				return;
			}
			this.axios.get('https://cnodejs.org/api/v1/message/count?accesstoken=' + this.ak)
				.then(result => result.data)
				.then(data => {
					if(data.success) {
						this.msgCount = data.data;
					}
				})
		}
	}
</script>

<style lang="scss">
	.header {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 70px;
		background:#5c5e63;
		color: white;
		justify-content:center;
		align-items: center;
		i {
			position: absolute;
			z-index: 1;
			display: inline-block;
			flex: 1;
			width: 25px;
			height: 25px;
		}
		i.icon-menu {
			left: 20px;
			top: 25px;
			background: url('../../common/icons/icon-menu.svg') no-repeat;
			background-size: contain;
		}
		i.icon-msg {
      right: 55px;
      top: 23px;
      background: url('../../common/icons/icon-msg.svg') no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    span.msg-count {
      position: absolute;
      z-index: 1;
      width: 15px;
      height: 15px;
      right: 45px;
      top: 18px;
      text-align: center;
      line-height: 15px;
      color: #fff;
      background-color: #ff4081;
      border-radius: 50%;
      font-size: 60%;
    }
		h1 {
			font-size: 30px;
			letter-spacing: 2px;
			font-weight: 700;
			font-style: oblique;
		}
		.singout {
			position: absolute;
			right: 8px;
			top: 28px;
			cursor: pointer;
		}
	}
</style>



