// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(VueAxios, axios);

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 默认选择all标签
		tab: 'all',
		// 文章列表
		articleList: [],
		// 话题
		collectTopics: [],
		isLoading: false,
		isMore: false,
		isShowAsideMenu: false,
		isShowInfo: false,
		isShowLogin: false,
		isShowMsg: false,
		isShowNewArticle: false,
		isShowAbout: false,
		// 用户信息
		userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {avatar_url: '', id: '', loginname: '', success: false},
		// assesstoken
		ak: localStorage.ak || ''
	},
	mutations: {
		//切换tab
		changeTab(state,payload) {
			state.isLoading = payload.hasOwnProperty('isLoading')? payload.isLoading : state.isLoading;
			state.tab = payload.type || state.tab;
			state.articleList = payload.articleList || state.articleList;
		},
		changeMore(state,flag) {
			state.isMore = flag;
		},
		showAsideMenu(state,flag) {
			state.isShowAsideMenu = flag;
		},
		viewArticle(state,flag) {
			state.isLoading = flag;
		},
		showInfo(state,flag) {
			state.isShowInfo = flag;
		},
		showLogin(state, flag) {
			state.isShowLogin = flag;
		},
		showMsg(state, flag) {
			state.isShowMsg = flag;
		},
		showNewArticle(state,flag) {
			state.isShowNewArticle = flag;
		},
		showAbout(state,flag) {
			state.isShowAbout = flag;
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		//更新accesstoken
		updateAk(state,ak) {
			state.ak = ak;
		},
		// 更新话题
		updateCollect(state,collectTopics) {
			state.collectTopics = collectTopics;
		}

	}
})
// 关闭生产模式下给出的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
