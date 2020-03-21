import MainCommentDetail from './MainCommentDetail'
import { getCommentByBlogId } from '@/api/blog'

export default class MainCommentDetailArray {
  constructor (blogDetail) {
    this.data = []
    this.blogDetail = blogDetail
  }

  /**
   * 每条 main comment 都会自带至多三条 reply comment
   */
  async increase () {
    const lastCommentDetailData = this.data[this.data.length - 1]
    const newCommentArray = await getCommentByBlogId({
      blogId: this.blogDetail.blogId,
      lastCommentTimestamp: lastCommentDetailData ? lastCommentDetailData.commentPostTime : new Date().getTime(),
      lastCommentId: lastCommentDetailData ? lastCommentDetailData.commentId : 0,
      lastLikeCount: lastCommentDetailData ? lastCommentDetailData.likeCount : null
    })

    newCommentArray.forEach(x => {
      const mainCommentDetail = new MainCommentDetail(x)

      x.replyList.forEach(y => {
        mainCommentDetail.addReplyComment(y)
      })

      this.push(mainCommentDetail)
    })

    return newCommentArray.length
  }

  clear () {
    this.data = []
  }

  unshift (mainCommentDetail) {
    mainCommentDetail.mainCommentDetailArray = this
    this.data.unshift(mainCommentDetail)
  }

  push (mainCommentDetail) {
    mainCommentDetail.mainCommentDetailArray = this
    this.data.push(mainCommentDetail)
  }
}
