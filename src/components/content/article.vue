<template>

	<div class="article-detail">

		<div class="body" v-show="!isLoading">

			<div class="article">

				<div class="article-title">
					<h1 class="title"><span class="flag" v-show="infos.top || infos.good">{{infos.top ? '置顶' : '精华'}}</span>{{infos.title}}</h1>
					<div class="desc">
						<p>发布于 {{infos.create_at | formatDate}} 作者 <router-link :to="{name: 'user', params: {name: infos.author && infos.author.loginname}}">{{infos.author && infos.author.loginname}}</router-link>&nbsp;&nbsp;{{infos.visit_count}} 次浏览 来自 {{types[infos.tab]}}</p>
					</div>
				</div>
		
				<div v-html="infos.content" class="content"></div>
			</div>

			<div class="reply">
				<div class="other">
					<div @click="collect" class="collect"><i :class="[isCollected ? 'collected' : 'collected-no']"></i>收藏文章</div>
					<div class="total-reply">{{infos.reply_count}} 回复</div>
				</div>

				<div v-for="(item, index) of replies" class="reply-item">

          <div class="reply-author">
            <div class="reply-avatar">
              <img :src="item.author.avatar_url" alt="">
              <div class="reply-desc">
                <router-link :to="{name: 'user', params: {name: item.author && item.author.loginname}}">{{item.author.loginname}}</router-link>
                  {{replies.length - index}}楼 • {{item.create_at | formatDate}}
                  <span @click="showTextArea(index)" class="reply-at">回复</span>
                  <i @click="ups(index, item.id, item)" :class="[item.ups.indexOf(userInfo.id) !== -1 ? 'ups-yes' : 'ups-no']" class="icon-reply-at"></i>
                  <span class="ups-count">{{ item.ups.length }}</span>
              </div>
            </div>
          </div>

          <div v-html="item.content" class="reply-content"></div>

          <transition name="slide-top">
            <div class="reply-one" v-show="currentIndex===index">
              <textarea v-model.trim="replyOneContent" class="replay-one-text" placeholder="请输入回复内容"></textarea>
							<button @click="reply(item.id,item.author.loginname)" class="replay-one-btn" type="button">回复</button>
              <button class="replay-one-btn" @click="currentIndex=null;replyOneContent=''">取消</button>
            </div>
          </transition>


        </div>

				<div class="reply-input">
					<div class="replay-title">添加回复</div>
					<textarea v-model.trim="replyContent" class="replay-text" placeholder="请输入回复内容"></textarea>
					<button @click="reply('')" class="replay-btn" type="button">回复</button>
				</div>

			</div>

		</div>
	
		<div class="back">
			<i @click.stop.prevent="$router.go(-1)" class="icon-back"></i>
		</div>

	</div>

</template>

<script>
import {formatDate} from 'common/js/date.js';
	export default {
		data() {
			return {
				id: this.$route.params.id,
				infos:{},
				types: { share: '分享', ask: '问答', job: '招聘'},
				oImgs:[],
				isCollected: false,
				replies: [],
				currentIndex: null,
				replyOneContent: '',
				replyContent:''
			}
		},
		filters: {
			formatDate(time) {
				return formatDate(time);
			}
		},
		computed: {
			isLoading() {
				return this.$store.state.isLoading;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			ak() {
				return this.$store.state.ak;
			},
			collectTopics() {
				return this.$store.state.collectTopics;
			}
		},
		created(){
			this.$store.commit('viewArticle', true);
			this.$store.commit('showInfo',false);
			this.$store.commit('showAsideMenu',false);
			this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
				.then(result => result.data.data)
				.then(data => this.infos = data)
				.then(infos => this.replies = infos.replies.reverse())
				.then(() => this.$store.commit('viewArticle',false))
				.then(() => {
					this.oImgs = document.querySelector('.content').querySelectorAll('img');
					for(let img of this.oImgs){
						img.onclick = () =>location.href = img.src;
					}
				})
		},
		mounted() {
			if(!this.ak) {
				return;
			}
			this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
      .then(result => result.data.data)
      .then(collectTopics => {
        this.$store.commit('updateCollect', collectTopics);
        collectTopics.forEach(item => {
          item.id === this.id ? this.isCollected = true : '';
        })
      })
		},
		methods: {
			ups(index, upsId, item) {
				if(!this.ak) {
					this.$store.commit('showLogin',true);
					return;
				}
				if(item.author.loginname === this.userInfo.loginname) {
					alert('不能自己为自己点赞哦😯')
					return
				}
				this.axios.post(`https://cnodejs.org/api/v1/reply/${upsId}/ups`,{accesstoken: this.ak})
					.then(result => {
						if(result.data.success){
							this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
							.then(result => result.data.data)
							.then(data => this.infos = data)
							.then(infos => this.replies = infos.replies.reverse())
						}
					})
			},
			collect() {
				// console.log(localStorage)
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (!this.isCollected) {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          console.log('result', result);
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      	}
    	},
    	showTextArea(index) {
    		this.currentIndex = index;
    		this.replyOneContent = `@`+this.replies[index].author.loginname;
    	},
    	reply(id,name) {
    		if(!this.ak) {
    			this.$store.commit('showLogin', true);
    			return;
    		}
    		else if(!id) {
    			this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: this.replyContent})
          	.then(() => {this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.replyContent ='';
          	})
       	 })
    		}else {
    			this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: this.replyOneContent,
          reply_id: id
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.currentIndex = null;
              this.replyOneContent = ''
            })
        })
      }
    	}
		}
	}
</script>

<style lang="scss" scoped>
	
	.article-detail {
		position: relative;
		z-index: 1;
		height: 100%;
		padding:8px 5px 0 5px;
		background-color: rgba(0,0,0,.07);
		overflow-x: hidden;
		overflow-y: auto;
		.body {
			// background-color: #ccc;
			border-radius: 4px;
			padding: 10px;
			.article {
				background-color: white;
				width: 100%;
				border-radius: 10px;
				.article-title{
					border-bottom: 1px solid rgba(0,0,0,.1);
					padding:10px;
					.title{
						font-size: 20px;
						height: 30px;
						line-height: 25px;
						display: inline-block;
						.flag{
	          	background-color: #80db01;
	          	font-size: 80%;
	          	padding: 2px 4px ;

	          	color: white;
	          	margin-right: 10px;
	          }
					}
					.desc {
						padding-top: 5px;
						p {
							font-size: 85%;
							color: gray;
							a {
							color:#000;
							}
						}
						
					}
				}
				.content {

					overflow: hidden;
					margin: 15px;


				}
			}
			.reply {
				background-color: white;
				border-radius: 8px;
				margin-top: 10px;
				overflow: hidden;
				height: 100%;
				.other {
					padding:10px;
					background-color: #A1A1A1;
					position: relative;
					.collect {							
	          i {
	          	display: inline-block;
	            width: 18px;
	            height: 18px;
	            margin-right: 3px;
	          }
					}
					.total-reply {
						position: absolute;
						top: 15px;
						right: 10px;
					}
          .collected {
            background: url('../../common/icons/icon-collect-yes.svg') no-repeat;
            background-size: contain;
            background-position: 0 3px;
          }
          .collected-no {
            background: url('../../common/icons/icon-collect-no.svg') no-repeat;
            background-size: contain;
            background-position: 0 3px;
          }
				}
				.reply-item {
					background-color: white;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          padding-top: 5px;
          padding-bottom: 8px;
            .reply-author {
              // padding-left: 10px;
              padding: 0 3%;
              .reply-avatar {
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 3px;
                }
                .reply-desc {
                  position: relative;
                  flex: 1;
                  padding-left: 10px;
                  font-size: 85%;
                  color: rgba(100,100,255,0.9);
                  .reply-at {
                    position: absolute;
                    right: 60px;
                    cursor: pointer;
                  }
                  .reply-at:hover {
                  	text-decoration: underline;
                  }
                  .icon-reply-at {
                    position: absolute;
                    right: 35px;
                    top: -2px;
                    display: inline-block;
                    width: 15px;
                    height: 15px;

                  }
                  .ups-yes {
                    background: url('../../common/icons/icon-ups-yes.svg') no-repeat;
                    background-size: contain;
                  }
                  .ups-no {
                    background: url('../../common/icons/icon-ups-no.svg') no-repeat;
                    background-size: contain;
                  }
                  span.ups-count {
                    position: absolute;
                    color: gray;
                    right: 20px;
                  }
                }
              }
            }
            .reply-content {
            	// background: red;
              padding: 0 15px;
            }

            .reply-one {
              width: 100%;
              height: 100%px;
              padding-top: 2px;

              .replay-one-text {
              width: 97%;
              height: 150px;
              border:1px solid #f1f1f1;
              font-size: 1rem; 
              padding-left: 5px;
              padding-right: 5px;
            }
            
            .replay-one-btn {
              font-size: 1rem;
              padding: 3px 8px;
              background-color: #2196f3;
              color: white;
              border-radius: 5px;
              margin-bottom: 10px; 
              margin-left: 10px;
            }
              button:nth-of-type(1) {
                background-color: #2196f3;
                color: white;
              }
              button:nth-of-type(2) {
                background-color: gray;
                color: #fff;
              }
            }
          }
				}
				.reply-input {
            width: 100%;
            .replay-title {
							width: 100%;
							background-color: #A1A1A1;
							padding: 12px;
            }

            .replay-text {
              width: 97%;
              height: 150px;
              // border:none;
              font-size: 1rem; 
              padding-left: 5px;
              padding-right: 5px;
              border:1px solid #f1f1f1;
            }
            
            .replay-btn {
              font-size: 1rem;
              padding: 3px 8px;
              background-color: #2196f3;
              color: white;
              border-radius: 5px;
              margin-bottom: 10px; 
              margin-left: 10px;
            }
          }
			}
		}
	@media screen and (min-width: 760px) {
    .article-detail {
      padding-left: 5%;
      padding-right: 5%;
      .article-title {
        text-align: center;
      }
    }
  }

</style>



