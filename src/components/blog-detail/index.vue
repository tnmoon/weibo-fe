<template>
  <div class="blog-detail">
    <el-card>
      <div class="blog-detail-header" v-if="tabVisible"></div>
      <div class="blog-detail-content">
        <div class="blog-detail-user-icon-wrapper">
          <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+blogDetail.userIconUrl" alt="用户头像" />
        </div>
        <div class="blog-detail-content-wrapper">
          <div class="blog-username-part">
            <a>{{blogDetail.userNickname}}</a>
          </div>
          <div class="blog-publish-detail">
            <a>{{moment(this.blogDetail.blogPostTime).format("YYYY年M月D日 HH:mm")+" 来自 " + blogDetail.blogPostTerminal}}</a>
          </div>
          <div class="blog-text-part">
            <a>{{blogDetail.blogText}}</a>
          </div>
          <source-blog-detail
            v-if="blogDetail.sourceBlogDetail"
            :data="blogDetail.sourceBlogDetail"
          ></source-blog-detail>
          <picture-wall
            class="blog-media-part"
            v-else-if="blogDetail.blogPictureUrlArray !== null && blogDetail.blogPictureUrlArray.length !== 0"
            :urlArray="blogDetail.blogPictureUrlArray"
          ></picture-wall>
        </div>
      </div>
      <div class="blog-detail-footer">
        <el-button type="text" @click="onCollectButtonClick">
          <i
            class="el-icon-star-off"
            :style="{'color':this.blogDetail.hasCollected ? '#eb7350' : '#409EFF'}"
          ></i>
          <a>收藏</a>
        </el-button>
        <el-button type="text" @click="onRepostButtonClick">
          <i class="el-icon-edit-outline"></i>
          <a v-if="blogDetail.repostCount!==0">{{blogDetail.repostCount}}</a>
          <a v-else>转发</a>
        </el-button>
        <el-button type="text" @click="onCommentButtonClick">
          <i class="el-icon-chat-dot-square"></i>
          <a v-if="blogDetail.commentCount!==0">{{blogDetail.commentCount}}</a>
          <a v-else>评论</a>
        </el-button>
        <el-button type="text" @click="onLikeButtonClick">
          <i
            class="el-icon-thumb"
            :style="{'color':this.blogDetail.hasLiked ? '#eb7350' : '#409EFF'}"
          ></i>
          <a v-if="blogDetail.likeCount!==0">{{blogDetail.likeCount}}</a>
          <a v-else>点赞</a>
        </el-button>
      </div>
      <div class="item-detail-wrapper" v-if="attachmentType===1">
        <span class="arrow-sign repost-arrow">
          <i class="arrow-sign-line"></i>
          <em class="arrow-sign-background"></em>
        </span>
        <div class="item-publish-wrapper">
          <div class="user-icon-wrapper">
            <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+myUserIconUrl" alt="用户头像" />
          </div>
          <repost-publish :client="blogDetail" class="item-publish"></repost-publish>
        </div>
        <!-- <repost-detail-array :repost-detail-array="blogDetail.repostDetailArray"></repost-detail-array> -->
      </div>
      <div class="item-detail-wrapper" v-else-if="attachmentType===2">
        <span class="arrow-sign comment-arrow">
          <i class="arrow-sign-line"></i>
          <em class="arrow-sign-background"></em>
        </span>
        <div class="item-publish-wrapper">
          <div class="user-icon-wrapper">
            <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+myUserIconUrl" alt="用户头像" />
          </div>
          <comment-publish :client="blogDetail" class="item-publish"></comment-publish>
        </div>
        <main-comment-detail-array :main-comment-detail-array="blogDetail.mainCommentDetailArray"></main-comment-detail-array>
      </div>
    </el-card>
  </div>
</template>

<script>
import PictureWall from './picture-wall'
import SourceBlogDetail from './source-blog-detail'
import MainCommentDetailArray from './comment/main-comment-detail-array'
import RepostDetailArray from './repost/repost-detail-array'
import CommentPublish from './comment/comment-publish'
import RepostPublish from './repost/repost-publish'

import BlogDetail from './model/blog/BlogDetail'
import moment from 'moment'

export default {
  name: 'blog-detail',
  props: {
    myUserIconUrl: {
      type: String,
      required: true
    },
    myUserNickname: {
      type: String,
      required: true
    },
    blogDetail: {
      type: BlogDetail,
      required: true
    }
  },
  componentName: 'blog-detail',
  components: {
    PictureWall,
    SourceBlogDetail,
    MainCommentDetailArray,
    // RepostDetailArray,
    CommentPublish,
    RepostPublish
  },
  data () {
    return {
      tabVisible: false,
      attachmentType: 0 // 控制评论区和转发区的显示方式
    }
  },
  methods: {
    onLikeButtonClick () {
      this.blogDetail.toggleLike()
    },
    onCollectButtonClick () {
      this.blogDetail.toggleCollect()
    },
    onRepostButtonClick () {
      if (this.attachmentType === 1) this.attachmentType = 0
      else this.attachmentType = 1
    },
    onCommentButtonClick () {
      if (this.attachmentType === 2) this.attachmentType = 0
      else this.attachmentType = 2
    },
    moment
  }
}
</script>

<style lang="scss">
.blog-detail {
  width: 600px;
  .el-card {
    width: 100%;
    height: 100%;
    .el-card__body {
      width: 100%;
      height: 100%;
      padding: 0;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .blog-detail-header {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #f2f2f5;
      }
      .blog-detail-content {
        width: auto;
        flex-grow: 1;
        flex-shrink: 1;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 20px 4px 20px;
        .blog-detail-user-icon-wrapper {
          height: 100%;
          width: 60px;
          text-align: start;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .blog-detail-content-wrapper {
          height: 100%;
          width: 500px;
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .blog-username-part {
            width: 100%;
            height: 18px;
            padding-top: 5px;
            margin-bottom: 7px;
            font-size: 14px;
            font-weight: 700;
          }
          .blog-publish-detail {
            width: 100%;
            font-size: 12px;
            font-weight: 400;
            color: #808080;
            margin-bottom: 3px;
          }
          .blog-text-part {
            width: 100%;
            font-size: 14px;
            line-height: 23px;
            font-weight: 400;
            margin-bottom: 2px;
          }
          .blog-media-part {
            flex-grow: 1;
            flex-shrink: 1;
            width: 100%;
            margin-top: 3px;
          }
        }
      }
      .blog-detail-footer {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        height: 40px;
        border-top: 1px solid #f2f2f5;
        .el-button--text {
          width: 150px;
          span {
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            i {
              font-size: 16px;
            }
            a {
              margin-left: 5px;
              font-size: 12px;
              text-align: center;
              line-height: 16px;
            }
          }
        }
      }
      .item-detail-wrapper {
        border-top: 1px solid #d9d9d9;
        width: 100%;
        background-color: #f2f2f5;
        .item-publish-wrapper {
          margin: -7px 20px 0 20px;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          .user-icon-wrapper {
            flex-grow: 0;
            flex-shrink: 0;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .item-publish {
            flex-grow: 1;
            flex-shrink: 1;
            margin-left: 10px;
          }
        }
        .arrow-sign {
          position: relative;
          top: -14px;
          .arrow-sign-line {
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            border-bottom-color: #d9d9d9;
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 7px;
            border-style: solid;
            vertical-align: top;
          }
          .arrow-sign-background {
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            border-bottom-color: #f2f2f5;
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 7px;
            border-style: solid;
            vertical-align: top;
            position: relative;
            top: 1px;
            left: -14px;
          }
        }
        .repost-arrow {
          left: 225px;
        }
        .comment-arrow {
          left: 375px;
        }
      }
    }
  }
}
</style>
