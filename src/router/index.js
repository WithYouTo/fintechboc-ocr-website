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
  {
    // 父路由
    path: '/core/fapiao',
    component: Layout,
    // 如果直接访问父路由，则会跳转到其下的list子路由
    redirect: '/core/fapiao/zeng',
    name: 'fapiao',
    meta: { title: '发票报销', icon: 'el-icon-tickets' },
    // 默认值false，当父节点只有一个子节点时，不显示父节点
    // true，任何时候都显示父节点
    alwaysShow: true,
    children: [
      {
        // 子路由，父路由加上子路由即为一个真正的路由
        path: 'zeng',
        // 每个路由节点的name不能相同
        name: 'fapiao-zeng',
        // 执行template模板组件
        component: () => import('@/views/core/fapiao/zeng'),
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
    ],
  },

  {
    // 父路由
    path: '/core/review',
    component: Layout,
    // 如果直接访问父路由，则会跳转到其下的list子路由
    redirect: '/core/review/list',
    name: 'coreIntegralGrade',
    meta: { title: '发票审核', icon: 'el-icon-s-marketing' },
    // 默认值false，当父节点只有一个子节点时，不显示父节点
    // true，任何时候都显示父节点
    alwaysShow: true,
    children: [
      {
        // 子路由，父路由加上子路由即为一个真正的路由
        path: 'list',
        // 每个路由节点的name不能相同
        name: 'reviewList',
        // 执行template模板组件
        component: () => import('@/views/core/review/list'),
        // 定义导航标题
        meta: { title: '审核列表' },
      },
      {
        path: 'create',
        name: 'viewCreate',
        component: () => import('@/views/core/review/form'),
        meta: { title: '审核表单' },
      },
      {
        // :id 是一个占位符，表示这部分url会是任何一个id
        path: 'edit/:id',
        name: 'coreIntegralGradeEdit',
        component: () => import('@/views/core/review/form'),
        meta: { title: '编辑积分等级' },
        hidden: true, //隐藏
      },
    ],
  },

  {
    path: '/core',
    component: Layout,
    redirect: '/core/dict/list',
    name: 'coreDict',
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    alwaysShow: true,
    children: [
      {
        path: 'dict/list',
        name: '数据字典',
        component: () => import('@/views/core/dict/list'),
        meta: { title: '数据字典' },
      },
    ],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '例子', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树', icon: 'tree' },
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' },
      },
    ],
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' },
      },
    ],
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
