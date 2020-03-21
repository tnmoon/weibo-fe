import ReplyCommentDetailArray from './ReplyCommentDetailArray'
import ReplyCommentDetail from './ReplyCommentDetail'
import CommentDetail from './CommentDetail'

import { postComment } from '@/api/blog'

export default class MainCommentDetail extends CommentDetail {
  constructor ({ commentId, commentText, commentPostTime, likeCount, hasLiked, replyCount, userNickname, userIconUrl, userId }) {
    super({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl, userId })
    this.replyCount = replyCount
    this.replyCommentDetailArray = new ReplyCommentDetailArray(this)
    this.mainCommentDetailArray = null
  }

  addReplyComment ({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl }) {
    this.replyCommentDetailArray.push(new ReplyCommentDetail({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl }))
  }

  async comment ({ text, repostMeanwhile = false }) {
    const data = await postComment({
      text,
      ownerId: this.commentId,
      ownerType: 2
    })

    this.replyCommentDetailArray.unshift(new ReplyCommentDetail(data))

    this.mainCommentDetailArray.blogDetail.commentCount++
    this.replyCount++

    if (repostMeanwhile) {
      const blogDetail = this.mainCommentDetailArray.blogDetail

      let repostText
      if (blogDetail.sourceBlogDetail) {
        repostText = text + '//@' + this.userNickname + ': ' + this.commentText +
          '//@' + blogDetail.userNickname + ': ' + blogDetail.blogText
      } else {
        repostText = text + '//@' + this.userNickname + ': ' + this.commentText
      }

      await blogDetail.repost({ text: repostText })
    }
  }
}
