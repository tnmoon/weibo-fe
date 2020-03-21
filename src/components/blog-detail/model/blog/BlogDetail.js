import MainCommentDetailArray from '../comment/MainCommentDetailArray'
import MainCommentDetail from '../comment/MainCommentDetail'
import SonBlogDetailArray from './SonBlogDetailArray'

import { postBlog, postComment, postBlogLike, deleteBlogLike, postCollect, deleteCollect } from '@/api/blog'

export default class BlogDetail {
  constructor ({
    blogId,
    blogText,
    blogPostTerminal,
    blogPostTime,
    blogPostLocation,
    blogPictureUrlArray,
    userNickname,
    userIconUrl,
    userId,
    likeCount,
    commentCount,
    repostCount,
    hasLiked,
    hasCollected
  }) {
    this.blogId = blogId
    this.blogText = blogText
    this.blogPostTerminal = blogPostTerminal
    this.blogPostTime = blogPostTime
    this.blogPostLocation = blogPostLocation
    this.blogPictureUrlArray = blogPictureUrlArray || []
    this.userNickname = userNickname
    this.userIconUrl = userIconUrl
    this.userId = userId
    this.likeCount = likeCount
    this.commentCount = commentCount
    this.repostCount = repostCount
    this.hasLiked = hasLiked
    this.hasCollected = hasCollected
    this.sourceBlogDetail = null

    this.sonBlogDetailArray = new SonBlogDetailArray(this)
    this.blogDetailArray = null

    this.mainCommentDetailArray = new MainCommentDetailArray(this)
  }

  setSourceBlogDetail (sourceBlogDetail) {
    this.sourceBlogDetail = sourceBlogDetail
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
        await deleteBlogLike({ blogId: this.blogId })
      } else {
        this.likeCount++
        this.hasLiked = !this.hasLiked
        await postBlogLike({ blogId: this.blogId })
      }
    } catch (error) {
      console.error(error)
      if (this.hasLiked) this.likeCount--
      else this.likeCount++
      this.hasLiked = !this.hasLiked
    }
  }

  async toggleCollect () {
    try {
      this.hasCollected = !this.hasCollected
      if (!this.hasCollected) await deleteCollect({ blogId: this.blogId })
      else await postCollect({ blogId: this.blogId })
    } catch (error) {
      console.error(error)
      this.hasLiked = !this.hasLiked
    }
  }

  async repost ({ text, commentMeanwhile = false }) {
    // 这里两个异步操作待改为并行进行
    const data = await postBlog({
      text,
      postTerminal: 'weibo.com 微博网页版',
      pictureUrlArray: [],
      sourceBlogId: this.sourceBlogDetail?.blogId || this.blogId,
      leafBlogId: this.blogId
    })

    const newBlogDetail = new BlogDetail({
      ...data,
      userIconUrl: data.userProfilePictureUrl,
      commentCount: data.firstCommentCount + data.secondCommentCount,
      blogPictureUrlArray: data.blogPictureUrlList
    })

    if (data.sourceBlogDetail) {
      newBlogDetail.setSourceBlogDetail(
        new BlogDetail({
          ...data.sourceBlogDetail,
          userIconUrl: data.sourceBlogDetail.userProfilePictureUrl,
          commentCount: data.sourceBlogDetail.firstCommentCount + data.sourceBlogDetail.secondCommentCount,
          blogPictureUrlArray: data.sourceBlogDetail.blogPictureUrlList
        })
      )
    }

    this.sonBlogDetailArray.unshift(newBlogDetail) // 更新转发列表
    this.repostCount++ // 本微博的转发计数加1

    if (commentMeanwhile) await this.comment({ text })

    return newBlogDetail
  }

  async comment ({ text, repostMeanwhile = false }) {
    // 此处的两个异步操作待调整为并行进行
    const data = await postComment({
      text,
      ownerId: this.blogId,
      ownerType: 1
    })
    this.mainCommentDetailArray.unshift(new MainCommentDetail(data))

    this.commentCount++

    if (repostMeanwhile) {
      const repostText = this.sourceBlogDetail ? (text + '//@' + this.userNickname + ': ' + this.blogText) : text
      const newBlogDetail = await this.repost({ text: repostText })
      return newBlogDetail
    }
  }
}
