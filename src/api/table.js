import request from '@/utils/request'

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

export function show(id) {
  return request({
    url: `/history/info/detail/${id}`,
    method: 'get',
    // params: data,
  })
}

export function saveStatus(data) {
  return request({
    url:  '/audit/check',
    method: 'post',
    data,
  })
}

