import request from '@/plugin/axios'

export function getUploadPictureToken () {
  return request({
    url: '/getUploadPictureToken',
    method: 'get'
  })
}
