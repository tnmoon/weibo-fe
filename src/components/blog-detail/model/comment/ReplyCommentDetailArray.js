import ReplyCommentDetail from './ReplyCommentDetail'

export default class ReplyCommentDetailArray {
  constructor (mainCommentDetail) {
    this.data = []
    this.mainCommentDetail = mainCommentDetail
  }

  increase () {
    // 获取评论回复的接口
  }

  clear () {
    this.data = []
  }

  unshift (replyCommentDetail) {
    replyCommentDetail.replyCommentDetailArray = this
    this.data.unshift(replyCommentDetail)
  }

  push (replyCommentDetail) {
    replyCommentDetail.replyCommentDetailArray = this
    this.data.push(replyCommentDetail)
  }
}
