<template>
  <div class="comment-item comment-item-wrapper">
    <div class="comment-item-left-wrapper" v-if="showUserIcon">
      <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+commentDetail.userIconUrl" alt="用户头像" />
    </div>
    <div class="comment-item-right-wrapper">
      <div class="comment-item-text">
        <a class="comment-item-user-nickname">{{commentDetail.userNickname + '：'}}</a>
        <a>{{commentDetail.commentText}}</a>
      </div>
      <div class="comment-item-footer">
        <a>{{moment(this.commentDetail.commentPostTime).format("YYYY年M月D日 HH:mm")}}</a>
        <div>
          <el-button type="text" @click="onReplyButtonClick">回复</el-button>
          <el-button type="text" @click="onLikeButtonClick">
            <i
              class="el-icon-thumb"
              :style="{'color':this.commentDetail.hasLiked ? '#eb7350' : '#409EFF'}"
            ></i>
            <a v-if="commentDetail.likeCount!==0">{{commentDetail.likeCount}}</a>
            <a v-else>赞</a>
          </el-button>
        </div>
      </div>
      <comment-publish :visible.sync="commentPublishVisible" :client="commentDetail"></comment-publish>
    </div>
  </div>
</template>

<script>
import CommentPublish from './comment-publish'

import CommentDetail from '../model/comment/CommentDetail'
import ReplyCommentDetail from '../model/comment/ReplyCommentDetail'
import moment from 'moment'

export default {
  name: 'comment-detail',
  props: {
    commentDetail: {
      type: CommentDetail,
      required: true
    }
  },
  components: {
    CommentPublish
  },
  data () {
    return {
      commentPublishVisible: false
    }
  },
  computed: {
    showUserIcon () {
      return !(this.commentDetail instanceof ReplyCommentDetail)
    }
  },
  methods: {
    onReplyButtonClick () {
      this.commentPublishVisible = !this.commentPublishVisible
    },
    onLikeButtonClick () {
      this.commentDetail.toggleLike()
    },
    moment
  }
}
</script>

<style lang="scss">
.comment-item-wrapper {
  font-size: 12px;
  font-weight: 400;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .comment-item-left-wrapper {
    flex-grow: 0;
    flex-shrink: 0;
    height: 30px;
    margin-top: 4px;
    margin-right: 10px;
    img {
      width: 30px;
      border-radius: 50%;
      height: 30px;
    }
  }
  .comment-item-right-wrapper {
    flex-grow: 1;
    flex-shrink: 1;
    .comment-item-text {
      line-height: 20px;
      .comment-item-user-nickname {
        color: #32a2d5;
      }
    }
    .comment-item-footer {
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
      color: #808080;
      .el-button--text {
        padding: 0;
        font-size: 12px;
        font-weight: 400;
        a {
          margin-left: 4px;
        }
      }
    }
    .comment-publish {
      background-color: #fff;
      margin: 9px 0 5px 0;
      padding: 15px 15px 2px 15px;
    }
  }
}
</style>
