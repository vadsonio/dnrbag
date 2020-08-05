import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=> import(/* webpackChunkName: "Main" */'@/components/layout/BodyMain.vue'),
      //http://localhost:8080/?name=ivan
      props: (route) => ({ name: route.query.name })
    },
    {
      path: '/createAdv',
      name: 'createAdv',
      component: ()=> import(/* webpackChunkName: "CreateAdv" */'@/components/layout/BodyCreate.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ()=> import(/* webpackChunkName: "Contacts" */'@/components/layout/BodyContacts.vue'),
      props: (route) => ({ name: route.query.name })
    },
    {
      path: '/account',
      name: 'account'
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: ()=> import(/* webpackChunkName: "signIn" */'@/components/layout/SignIn.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: ()=> import(/* webpackChunkName: "signUp" */'@/components/layout/SignUp.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: ()=> import(/* webpackChunkName: "Category" */ '@/components/layout/BodyCategory.vue'),
      props: (route) => ({ name: route.query.name })
    },
    {
      path: '/campaignInfo',
      name: 'campaignInfo',
      component: ()=> import(/* webpackChunkName: "CampaignSingle" */'@/components/layout/BodyCampaignSingle.vue')
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: ()=>import(/* webpackChunkName: "AdminPanel" */'@/components/layout/BodyAdmin.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
