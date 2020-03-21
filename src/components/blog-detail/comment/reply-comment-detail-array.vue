<template>
  <div class="reply-comment-detail-array">
    <comment-detail
      v-for="i in replyCommentDetailArray.data.length"
      :key="replyCommentDetailArray.data[i-1].commentId"
      :comment-detail="replyCommentDetailArray.data[i-1]"
    ></comment-detail>
    <el-button v-if="replyCommentDetailArray.data.length===3" type="text" class="reply-button">
      查看更多
      <i class="el-icon-arrow-down"></i>
    </el-button>
  </div>
</template>

<script>
import ReplyCommentDetailArray from '../model/comment/ReplyCommentDetailArray'
import CommentDetail from './comment-detail'

export default {
  name: 'reply-comment-detail-array',
  components: {
    CommentDetail
  },
  props: {
    replyCommentDetailArray: {
      type: ReplyCommentDetailArray,
      required: true
    }
  }
}
</script>

<style lang="scss">
.reply-comment-detail-array {
  margin-top: 8px;
  background-color: #eaeaec;
  padding: 0 12px;
  .comment-item {
    padding: 7px 0;
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-bottom: 0;
    }
  }
  .el-button--text {
    font-size: 12px;
    font-weight: 400;
  }
  .reply-button {
    padding: 10px 0;
  }
}
</style>
