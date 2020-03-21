import request from '@/plugin/axios'

export function getTimelineBlog ({ lastBlogTimestamp = new Date().getTime(), lastBlogId = 0 }) {
  return request({
    url: '/getTimelineBlog',
    method: 'get',
    params: {
      lastBlogTimestamp,
      lastBlogId
    }
  })
}

export function postBlog ({ text, postLocation, postTerminal, pictureUrlArray, sourceBlogId, leafBlogId }) {
  return request({
    url: '/postBlog',
    method: 'post',
    data: {
      text,
      postLocation,
      postTerminal,
      pictureUrlArray,
      sourceBlogId,
      leafBlogId
    }
  })
}

export function getCommentByBlogId ({ blogId, lastCommentTimestamp, lastCommentId, lastLikeCount }) {
  return request({
    url: '/getCommentByBlogId',
    method: 'get',
    params: {
      blogId,
      lastCommentTimestamp,
      lastCommentId,
      lastLikeCount
    }
  })
}

export function postComment ({ text, ownerId, ownerType }) {
  return request({
    url: '/postComment',
    method: 'post',
    data: {
      text,
      ownerId,
      ownerType
    }
  })
}

export function postBlogLike ({ blogId, likeType }) {
  return request({
    url: '/postBlogLike',
    method: 'post',
    data: {
      likeType,
      blogId
    }
  })
}

export function deleteBlogLike ({ blogId }) {
  return request({
    url: '/deleteBlogLike',
    method: 'post',
    data: {
      blogId
    }
  })
}

export function getUserBlogDetail () {
  return request({
    url: '/getUserBlogDetail',
    method: 'get'
  })
}

export function postCollect ({ blogId }) {
  return request({
    url: '/postCollect',
    method: 'post',
    data: {
      blogId
    }
  })
}

export function deleteCollect ({ blogId }) {
  return request({
    url: '/deleteCollect',
    method: 'post',
    data: {
      blogId
    }
  })
}

export function postCommentLike ({ commentId }) {
  return request({
    url: '/postCommentLike',
    method: 'post',
    data: {
      commentId
    }
  })
}

export function deleteCommentLike ({ commentId }) {
  return request({
    url: '/deleteCommentLike',
    method: 'post',
    data: {
      commentId
    }
  })
}
