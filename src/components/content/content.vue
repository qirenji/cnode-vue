<template>
	<div class="content">
		<ul class="tab">
			<li class="type" >
				<div @click="changeTab('all')" :class="{active: tab==='all'}">
					<router-link to="/">首页</router-link>
				</div>
			</li>
			<li class="type" >
				<div @click="changeTab('good')" :class="{active: tab==='good'}">
					<router-link to="/">精华</router-link>
				</div>
			</li>
			<li class="type" >
				<div @click="changeTab('share')" :class="{active: tab==='share'}">
					<router-link to="/">分享</router-link>
				</div>
			</li>
			<li class="type" >
				<div @click="changeTab('ask')" :class="{active: tab==='ask'}">
					<router-link to="/">问答</router-link>
				</div>
			</li>
			<li class="type" >
				<div @click="changeTab('job')" :class="{active: tab==='job'}">
					<router-link to="/">招聘</router-link>
				</div>
			</li>
		</ul>

		<div ref="article" @scroll="scroll($event)" class="article">
      <div class="loading">
        <i v-show="isLoading" class="icon-loading"></i>
      </div>
        <router-view></router-view>
    </div>
	
		<transition name="slide-fade">
      <div v-show="isShowTop" class="top">
        <i @click.stop.prevent="toTop" class="icon-top"></i>
      </div>
    </transition>

	</div>

</template>

<script>

	export default {
		data() {
			return {
				page: 1,
				over: false,
				isShowTop:false
			}
		},
		computed: {
			tab() {
      	return this.$store.state.tab;
			},
			isLoading() {
				return this.$store.state.isLoading;
			},
    	articleList() {
     		return this.$store.state.articleList;
    	}
		},
		methods:{
			changeTab(type,page=1) {
				this.$store.commit('changeTab',{type:type,articleList:[], isLoading:true});
				this.axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${type}`)
					.then(result => result.data.data)
					.then(articleList => this.$store.commit('changeTab',{type:type, articleList:articleList, isLoading: false}))
			},
			scroll(event) {
      if (event.target.clientHeight > event.target.scrollTop) {
        this.isShowTop = false;
      } else {
        this.isShowTop = true;
      }
	      if (this.$route.path !== '/') {
	        return;
	      } else if(!this.over) {
	        let flag =  event.target.clientHeight + event.target.scrollTop === event.target.scrollHeight;
	        if (flag) {
	          this.$store.commit('changeMore', true);
	          this.page ++;
	          this.axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.tab}`)
	            .then(result => result.data.data)
	            .then(articleList => {
	              if (!articleList.length) {
	                this.over = true;
	                this.$store.commit('changeMore', false);
	                return;
	              }
	              this.$store.commit('changeTab', {articleList: this.articleList.concat(articleList), isLoading: false})
	            })
	            .then(() => this.$store.commit('changeMore', false))
	        }
	      }
    	},
    	toTop() {
	      if (this.$refs.article.scrollTop <= 0) {
	        return;
	      }
	      let time = setInterval(() => {
	        if (this.$refs.article.scrollTop <= 0) {
	          clearInterval(time);
	        }
	        this.$refs.article.scrollTop -= 200;
	      }, 1)
    	}

		}
	}


</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex:1;
		position: relative;
		.tab{
			display: flex;
			height: 40px;
			width: 100%;
			background-color: #5c5e63;
			a {
				color: #ccc;
				}
		}
		.type {
			flex: 1;
			display: flex;
			justify-content: center;
	    align-items: center;
	    a:hover {
	    	color: #fff;
	    }
		}
		.active{
	    	line-height: 28px;
				width: 60px;
				text-align: center;
				font-size: 18px;
				border-radius: 4px;
				background-color: #ccc;
				a{
					color:#000;
					&:hover{
						color:#000;
					}
				}
	    }

		.article {
	      flex: 1;
	      position: relative;
	      width: 100%;
	      overflow: auto;
	      transition: 1s linear;
	      .loading {
	        display: flex;
	        justify-content: center;
				.icon-loading {
					background: url('../../common/icons/icon-loading.svg') no-repeat;
					background-size: contain;
					width :30px;
					height: 30px;
					margin: 10px auto;
					animation: loading .5s linear infinite;
				}
			}
		}
		.top {
      position: fixed;
      z-index: 1;
      bottom: 10px;
      right: 15px;
      width: 45px;
      height: 45px;
      .icon-top {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../common/icons/icon-top.svg') no-repeat;
        background-size: contain;
      }
    }

    @media screen and (min-width: 760px) {
      .top {
        bottom: 10px;
        right: 60px;
        width: 55px;
        height: 55px;
      }
    }

	}



</style>





