import request from '@/plugin/axios'

export function login({ username, password }) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register({ username, password, nickname }) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      nickname
    }
  })
}

export function follow({ bloggerId }) {
  return request({
    url: '/follow',
    method: 'post',
    data: {
      bloggerId
    }
  })
}

export function defollow({ bloggerId }) {
  return request({
    url: '/defollow',
    method: 'post',
    data: {
      bloggerId
    }
  })
}

export function getUserDetail({ userId = null } = {}) {
  return request({
    url: '/getUserDetail',
    method: 'get',
    params: {
      userId
    }
  })
}
