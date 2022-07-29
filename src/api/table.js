import request from '@/utils/request'

// 我的申请列表
export function getMyApplyList(data) {
  return request({
    url:  '/history/user',
    method: 'post',
    data,
  })
}

// 待审核Api
export function getList(data) {
  return request({
    url:  '/audit/list',
    method: 'post',
    data,
  })
}


// 已审核Api
export function getHistory(data) {
  return request({
    url:  '/audit/history',
    method: 'post',
    data,
  })
}

// 查看申请单详情
export function show(id) {
  return request({
    url: `/history/info/detail/${id}`,
    method: 'get',
  })
}

// 用户删除记录
export function recordDelete(id) {
  return request({
    url: `/history/delete/${id}`,
    method: 'delete',
  })
}

// 审核接口
export function saveStatus(data) {
  return request({
    url:  '/audit/check',
    method: 'post',
    data,
  })
}
