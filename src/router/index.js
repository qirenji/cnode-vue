import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/content/article.vue'
import ArticleList from '../components/content/articlelist.vue'
import User from'../components/user/user.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: ArticleList
    },
    {
    	path:'/article/:id',
    	name: 'article',
    	component: Article
    },
    {
      path:'/user/:name?',
      name: 'user',
      component: User
    }
  ]
})
