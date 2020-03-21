import layoutHeaderBodyFooter from '../layout/header-body'

/**
 * 主框架页面，也就是微博主要页面的路由
 */
const layoutViews = [
  {
    path: '/',
    redirect: { name: 'home' },
    component: layoutHeaderBodyFooter,
    children: [
      {
        path: 'home',
        name: 'home',
        redirect: { name: 'timeline' },
        component: () => import('@/views/home'),
        children: [
          {
            path: 'timeline',
            name: 'timeline',
            component: () => import('@/views/home/timeline')
          }
        ]
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search'),
        props: (route) => {
          const keyword = route.query.keyword ? route.query.keyword : ''
          return { keyword }
        }
      }
    ]
  }
]

/**
 * 登录页面路由
 */
const loginViews = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 注册页面路由
 */
const registerViews = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  }
]

/**
 * 错误页面路由
 */
const errorViews = [
  {
    path: '*',
    name: 'error',
    component: () => import('@/views/error')
  }
]

export default [
  ...layoutViews,
  ...loginViews,
  ...registerViews,
  ...errorViews
]
