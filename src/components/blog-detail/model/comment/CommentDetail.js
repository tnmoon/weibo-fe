import { postCommentLike, deleteCommentLike } from '@/api/blog'

export default class CommentDetail {
  constructor ({ commentId, commentText, commentPostTime, likeCount, hasLiked, userNickname, userIconUrl, userId }) {
    this.commentId = commentId
    this.commentText = commentText
    this.commentPostTime = commentPostTime
    this.likeCount = likeCount
    this.hasLiked = hasLiked

    this.userId = userId
    this.userNickname = userNickname
    this.userIconUrl = userIconUrl
  }

  /**
   * 点赞/收藏的逻辑是，先更新视图，使用户快速感知到点赞/收藏操作生效
   * 再与后端进行交互，使点赞操作被写入数据库
   * 若此交互失败，则再修正之前被修改了的视图（在catch内）
   */
  async toggleLike () {
    try {
      if (this.hasLiked) {
        this.likeCount--
        this.hasLiked = !this.hasLiked
        await deleteCommentLike({ commentId: this.commentId })
      } else {
        this.likeCount++
        this.hasLiked = !this.hasLiked
        await postCommentLike({ commentId: this.commentId })
      }
    } catch (error) {
      console.error(error)
      if (this.hasLiked) this.likeCount--
      else this.likeCount++
      this.hasLiked = !this.hasLiked
    }
  }
}
