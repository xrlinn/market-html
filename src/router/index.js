import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'layout1',
          name: 'index',
          redirect: '/index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index'),
          children: [
            {
              path: '/index',
              name: 'index',
              meta: {
                title: '首页'
              },
              component: () => import('@/views/index/all')
            },
            {
              path: '/computer',
              name: 'computer',
              meta: {
                title: '首页'
              },
              component: () => import('@/views/index/computer')
            },
            {
              path: '/clothes',
              name: 'clothes',
              meta: {
                title: '首页'
              },
              component: () => import('@/views/index/clothes')
            },
            {
              path: '/fruit',
              name: 'fruit',
              meta: {
                title: '首页'
              },
              component: () => import('@/views/index/fruit')
            },
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          meta: {
            title: '消息'
          },
          component: () => import('@/views/msg')
        },
        {
          path: 'cart',
          name: 'cart',
          meta: {
            title: '购物车'
          },
          component: () => import('@/views/cart')
        },
        {
          path: 'person',
          name: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/person')
        }
      ]
    },
    {
      path: 'layout2',
      name: 'header-layout',
      component: () => import('@/views/header-layout'),
      children: [
        {
          path: '/details/:id',
          name: 'details',
          component: () => import('@/views/details'),
          meta: {
            title: '商品详情'
          }
        },
        {
          path: '/revise',
          name: 'revise',
          meta: {
            title: '修改个人信息'
          },
          component: () => import('@/views/revise')
        },
        {
          path: '/changeNickname',
          name: 'changeNickname',
          meta: {
            title: '修改昵称'
          },
          component: () => import('@/views/changeNickname')
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/changePassword')
        },
        {
          path: '/changeDesc',
          name: 'changeDesc',
          meta: {
            title: '修改个性签名'
          },
          component: () => import('@/views/changeDesc')
        },
        {
          path: '/changeAddress',
          name: 'changeAddress',
          meta: {
            title: '修改收货地址'
          },
          component: () => import('@/views/changeAddress')
        },
        {
          path: '/collection',
          name: 'collection',
          meta: {
            title: '已收藏商品'
          },
          component: () => import('@/views/collection')
        },
        {
          path: '/trace',
          name: 'trace',
          meta: {
            title: '我的足迹'
          },
          component: () => import('@/views/trace')
        },
        {
          path: '/order/:id',
          name: 'upOrder',
          meta: {
            title: '确认订单'
          },
          component: () => import('@/views/upOrder')
        },
        {
          path: '/order1/:id',
          name: 'upOrder1',
          meta: {
            title: '确认订单'
          },
          component: () => import('@/views/upOrder/one')
        }
      ]
    },
    {
      path: 'layout1',
      name: 'layout1',
      redirect: '/one',
      meta: {
        title: '我的订单'
      },
      component: () => import('@/views/layout1'),
      children: [
        {
          path: '/one',
          name: 'one',
          meta: {
            title: '我的订单'
          },
          component: () => import('@/views/layout1/o1'),
        },
        {
          path: '/two',
          name: 'two',
          meta: {
            title: '我的订单'
          },
          component: () => import('@/views/layout1/o2'),
        },
        {
          path: '/three',
          name: 'three',
          meta: {
            title: '我的订单'
          },
          component: () => import('@/views/layout1/o3'),
        },
        {
          path: '/four',
          name: 'four',
          meta: {
            title: '我的订单'
          },
          component: () => import('@/views/layout1/o4'),
        },
        {
          path: '/five',
          name: 'five',
          meta: {
            title: '我的订单'
          },
          component: () => import('@/views/layout1/o5'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/register')
    },
    {
      path: '/comment',
      name: 'comment',
      meta: {
        title: '发表评价'
      },
      component: () => import('@/views/comment')
    },
    {
      path: '/searchRes',
      name: 'searchRes',
      meta:{
        title: '搜索结果'
      },
      component: () => import('@/views/searchRes')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

export default router
