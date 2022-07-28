import request from '@/utils/request'

// 用户提交历史申报
export function getList(data) {
  return request({
    url: '/history/user',
    method: 'post',
    data,
  })
}

// 用户查看历史详细信息
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
