<template>
	<div class="article-list">
	
		<transition-group name="slide-top">
			<div v-for="(item, index) of articleList" :key="item.last_reply_at+index" class="item">
				<div class="avatar">
					<img :src="item.author.avatar_url" alt="">
				</div>
				<div class="title">
					<p class="text">
						<span class="flag" :class="{special: item.top || item.good}">
							{{(item.top ? '置顶' : '') || (item.good ? '精华': '') || types[item.tab]}}</span>
						<router-link :to="{name: 'article', params: {id: item.id}}">{{item.title}}</router-link>
					</p>
					<p class="view">
						<span class="viewed">{{item.reply_count}}/{{item.visit_count}}</span>
						<span class="date">{{item.last_reply_at | formatDate}}</span>
					</p>
				</div>
			</div>
		</transition-group>

			<div class="more" v-show="isMore">
				<i class="icon-more"></i>
			</div>
	</div>
</template>

<script>
import {formatDate} from 'common/js/date.js';

	export default {
		data() {
			return {
				types: {
					ask: '问答',
					job: '招聘',
					share: '分享'
				}
			}
		},
		computed: {
			articleList() {
				return this.$store.state.articleList;
			},
			isMore() {
				return this.$store.state.isMore;
			}
		},
		filters: {
			formatDate(time) {
				return formatDate(time);
			}
		},
		created() {
			this.$store.commit('changeTab',{isLoading: true})
			this.axios.get('https://cnodejs.org/api/v1/topics')
				.then(result => result.data.data)
				.then(articleList => this.$store.commit('changeTab',{articleList:articleList, isLoading:false}))
		}
	}
</script>

<style lang="scss">
	.article-list {
		position: relative;
		z-index: 1;
		.item {
			padding-left: 2%;
			width: 100%;
			height: 60px;
			display: flex;
			border-bottom: 1px solid rgba(0,0,0,.1);
			.avatar {
				flex: 0 0 50px;
				padding:10px;
				img {
					width: 40px;
					height: 40px;
					border-radius: 5px;
					// border: 1px solid #000;
				}
			}
			.title {
				flex: 1;
				background-color: white;
				font-size: 15px;
				overflow: hidden;
				padding-top: 15px;
				.text {
					width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
          .flag{
          	background-color: #e5e5e5;
          	font-size: 80%;
          	padding: 4px ;
          	border-radius: 8px;
          	margin-right: 4px;
          }
          .special {
          	background-color: #80db01;
          	color: white;
          }
          a {
          	color: #000;
          	&:hover{text-decoration: underline;
						line-height: 1rem;
          	}
          }
				}
				.view {
					width: 95%;
					position: relative;
					font-size: 85%;
					color:gray;
					margin-top: 10px;
					padding-left: 40px;
					.date{
						position: absolute;
						right: 12%;
					}
				}

			}
		}
		@media screen and (min-width:760px){
			.item {
				margin: auto;
				width: 70%;
			}
		}
		.more{
			text-align: center;
			height: 50px;
			.icon-more {
				display: inline-block;
				background: url('../../common/icons/icon-loading.svg') no-repeat;
				background-size: contain;
				width :30px;
				height: 30px;
				margin: 10px auto;
				animation: loading 5s linear infinite;
			}	
		}
	}
</style>



