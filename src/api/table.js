import request from '@/utils/request'

// 用户提交历史申报
export function getList(data) {
  return request({
    url: '/history/user',
    method: 'post',
    data,
  })
}
