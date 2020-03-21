import CommentDetail from './CommentDetail'

export default class ReplyCommentDetail extends CommentDetail {
  constructor ({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl, userId }) {
    super({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl, userId })
    this.replyCommentDetailArray = null
  }

  get myId () {
    return this.replyCommentDetailArray.mainCommentDetail.mainCommentDetailArray.blogDetail.myId
  }

  get myNickname () {
    return this.replyCommentDetailArray.mainCommentDetail.mainCommentDetailArray.blogDetail.myNickname
  }

  get myIconUrl () {
    return this.replyCommentDetailArray.mainCommentDetail.mainCommentDetailArray.blogDetail.myIconUrl
  }

  async comment ({ text, repostMeanwhile = false }) {
    const mainCommentDetail = this.replyCommentDetailArray.mainCommentDetail
    await mainCommentDetail.comment({ text })

    if (repostMeanwhile) {
      const blogDetail = this.replyCommentDetailArray.mainCommentDetail.mainCommentDetailArray.blogDetail
      let repostText

      if (blogDetail.sourceBlogDetail) {
        repostText = text + '//@' + this.userNickname + ': ' + this.commentText +
          '//@' + mainCommentDetail.userNickname + ': ' + mainCommentDetail.commentText +
          '//@' + blogDetail.userNickname + ': ' + blogDetail.blogText
      } else {
        repostText = text + '//@' + this.userNickname + ': ' + this.commentText +
          '//@' + mainCommentDetail.userNickname + ': ' + mainCommentDetail.commentText
      }

      await blogDetail.repost({ text: repostText })
    }
  }
}
