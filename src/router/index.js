import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 通用菜单，所有人都可见
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // 首页 
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },
]

// 匹配不到路径，直接跳转到404页面
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

/**
 * 发票申请
 */
export const asyncApplyRoutes = [
  // 发表报销一级菜单
  {
    // 父路由
    path: '/core/fapiao',
    component: Layout,
    // 如果直接访问父路由，则会跳转到其下的list子路由
    redirect: '/core/fapiao/invoice',
    name: 'fapiao',
    meta: { title: '发票报销', icon: 'el-icon-tickets' },
    // 默认值false，当父节点只有一个子节点时，不显示父节点
    // true，任何时候都显示父节点
    alwaysShow: true,
    // 子菜单
    children: [
      {
        // 子路由，父路由加上子路由即为一个真正的路由
        path: 'invoice',
        // 每个路由节点的name不能相同
        name: 'fapiao-invoice',
        // 执行template模板组件
        component: () => import('@/views/core/fapiao/invoice'),
        // 定义导航标题
        meta: { title: '增值税发票报销' },
      },
      {
        path: 'train',
        name: 'fapiao-train',
        component: () => import('@/views/core/fapiao/train'),
        meta: { title: '火车票报销' },
      },
      {
        path: 'taxi',
        name: 'fapiao-taxi',
        component: () => import('@/views/core/fapiao/taxi'),
        meta: { title: '出租车票报销' },
      },
      {
        path: 'record',
        name: 'fapiao-record',
        component: () => import('@/views/core/fapiao/record'),
        meta: { title: '我的申请' },
      },
      {
        path: 'detailinvoice/:id',
        name: 'fapiao-detail-invoice',
        component: () => import('@/views/core/fapiao/detailinvoice'),
        meta: { title: '查看增值税发票' },
        hidden: true,
      },
      {
        path: 'detailtrain/:id',
        name: 'fapiao-detail-train',
        component: () => import('@/views/core/fapiao/detailtrain'),
        meta: { title: '查看火车票' },
        hidden: true,
      },
      {
        path: 'detailtaxi/:id',
        name: 'fapiao-detail-taxi',
        component: () => import('@/views/core/fapiao/detailtaxi'),
        meta: { title: '查看出租车票' },
        hidden: true,
      },
      {
        path: 'modifydetailtaxi/:id',
        name: 'fapiao-modify-detail-taxi',
        component: () => import('@/views/core/fapiao/modifydetailtaxi'),
        meta: { title: '查看修改出租车票' },
        hidden: true,
      },
      {
        path: 'modifydetailtrain/:id',
        name: 'fapiao-modify-detail-train',
        component: () => import('@/views/core/fapiao/modifydetailtrain'),
        meta: { title: '查看修改火车票' },
        hidden: true,
      },
      {
        path: 'modifydetailinvoice/:id',
        name: 'fapiao-modify-detail-invoice',
        component: () => import('@/views/core/fapiao/modifydetailinvoice'),
        meta: { title: '查看修改增值税发票' },
        hidden: true,
      },
    ],
  },
]

/**
 * 发票审核
 */
export const asyncAuditRoutes = [
  {
    path: '/core/review',
    component: Layout,
    redirect: '/core/review/review',
    name: 'coreIntegralGrade',
    meta: {
      title: '发票审核', icon: 'el-icon-s-marketing',
      // roles: ['admin'] 
    },
    alwaysShow: true,
    // 子路由
    children: [
      {
        path: 'list',
        name: 'reviewList',
        component: () => import('@/views/core/review/review'),
        meta: {
          title: '待审核列表',
          // roles: ['admin']
        },
      },
      {
        path: 'form',
        name: 'reviewForm',
        component: () => import('@/views/core/review/form'),
        meta: {
          title: '已审核记录',
          // roles: ['admin']
        },
      },
    ],
  },
  // 审核页面 一级菜单（默认情况下隐藏）
  {
    // 父路由
    path: '/core/reviewDetail',
    component: Layout,
    redirect: '/core/reviewDetail/vatReview',
    name: 'reviewDetail',
    meta: { title: '审核界面', icon: 'el-icon-s-marketing' },
    // 默认值false，当父节点只有一个子节点时，不显示父节点
    // true，任何时候都显示父节点
    hidden: true,
    children: [
      {
        path: 'vatReview/:id',
        name: 'vatReview',
        component: () => import('@/views/core/reviewDetail/vatReview'),
        meta: {
          title: '增值税发票审核',
          // roles: ['admin']
        },
      },
      {
        path: 'taxiReview/:id',
        name: 'taxiReview',
        component: () => import('@/views/core/reviewDetail/taxiReview'),
        meta: {
          title: '出租车发票审核',
          // roles: ['admin'] 
        },
      },
      {
        path: 'trainReview/:id',
        name: 'trainReview',
        component: () => import('@/views/core/reviewDetail/trainReview'),
        meta: {
          title: '火车票审核',
          // roles: ['admin'] 
        },
      },
    ],
  },

  // 已审核查看页面 一级菜单（默认情况下隐藏）
  {
    // 父路由
    path: '/core/myReview',
    component: Layout,
    redirect: '/core/myReview/vatReview',
    name: 'myReview',
    meta: { title: '已审核', icon: 'el-icon-s-marketing' },
    // 默认值false，当父节点只有一个子节点时，不显示父节点
    // true，任何时候都显示父节点
    hidden: true,
    children: [
      {
        path: 'myVatReview/:id',
        name: 'vatReview',
        component: () => import('@/views/core/myReview/vatReview'),
        meta: {
          title: '增值税发票审核',
          // roles: ['admin']
        },
      },
      {
        path: 'myTaxiReview/:id',
        name: 'taxiReview',
        component: () => import('@/views/core/myReview/taxiReview'),
        meta: {
          title: '出租车发票审核',
          // roles: ['admin'] 
        },
      },
      {
        path: 'myTrainReview/:id',
        name: 'trainReview',
        component: () => import('@/views/core/myReview/trainReview'),
        meta: {
          title: '火车票审核',
          // roles: ['admin'] 
        },
      },
    ],
  },
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
