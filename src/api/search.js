import request from '@/plugin/axios'

export function searchUser ({ keyword }) {
  return request({
    url: '/search/user',
    method: 'get',
    params: {
      keyword
    }
  })
}
