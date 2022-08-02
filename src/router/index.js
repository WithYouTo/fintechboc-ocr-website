import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
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
// ]
//   // asyncRoutes 动态路由
//   // 发票审核一级菜单
//     export const asyncRoutes = [
    {
    path: '/core/review',
    component: Layout,
    redirect: '/core/review/review',
    name: 'coreIntegralGrade',
    meta: { title: '发票审核', icon: 'el-icon-s-marketing', 
            // roles: ['admin'] 
          },
    alwaysShow: true,
    // 子路由
    children: [
      {
        path: 'list',
        name: 'reviewList',
        component: () => import('@/views/core/review/review'),
        meta: { title: '待审核列表', 
                // roles: ['admin']
              },
      },
      {
        path: 'form',
        name: 'reviewForm',
        component: () => import('@/views/core/review/form'),
        meta: { title: '已审核记录', 
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
    hidden:true,
    children: [
      {
        path: 'vatReview/:id',
        name: 'vatReview',
        component: () => import('@/views/core/reviewDetail/vatReview'),
        meta: { title: '增值税发票审核',
                // roles: ['admin']
              },
      },
      {
        path: 'taxiReview/:id',
        name: 'taxiReview',
        component: () => import('@/views/core/reviewDetail/taxiReview'),
        meta: { title: '出租车发票审核',
                // roles: ['admin'] 
              },
      },
      {
        path: 'trainReview/:id',
        name: 'trainReview',
        component: () => import('@/views/core/reviewDetail/trainReview'),
        meta: { title: '火车票审核',
                // roles: ['admin'] 
              },
      },
    ],
  },

  { path: '*', redirect: '/404', hidden: true },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
//export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' },
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' },
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' },
  //             },
  //           ],
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' },
  //     },
  //   ],
  // },

//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//         meta: { title: 'External Link', icon: 'link' },
//       },
//     ],
//   },

//   // 404 page must be placed at the end !!!
  
// ]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// router.beforeEach((to, from, next) => {
//   if to.meta.
// } )

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
