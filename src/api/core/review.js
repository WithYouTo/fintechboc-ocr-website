// 引入axios的初始化模块
import request from '@/utils/request'
// 导出默认模块
export default {
  // 定义模块成员
  // 成员方法：获取积分等级列表
  list() {
    // 调用axios的初始化模块，发现远程ajax请求
    return request({
      url: '/admin/core/review/list',
      method: 'get',
    })
  },
  removeById(id) {
    return request({
      url: '/admin/core/review/remove1/' + id,
      method: 'delete',
    })
  },

  save(review) {
    return request({
      url: '/admin/core/review/save',
      method: 'post',
      data: review,
    })
  },

  getById(id) {
    return request({
      url: '/admin/core/review/get/' + id,
      method: 'get',
    })
  },

  updateById(review) {
    return request({
      url: '/admin/core/review/update',
      method: 'put',
      data: review,
    })
  },
}
