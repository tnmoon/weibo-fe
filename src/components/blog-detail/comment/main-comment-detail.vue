<template>
  <div
    class="main-content-detail"
    :class="{'show-reply': showReply}"
    :style="{'border-bottom' : showReply ? '0' : '1px solid #d9d9d9'}"
  >
    <comment-detail :comment-detail="mainCommentDetail"></comment-detail>
    <reply-comment-detail-array
      :reply-comment-detail-array="mainCommentDetail.replyCommentDetailArray"
      v-if="showReply"
    ></reply-comment-detail-array>
  </div>
</template>

<script>
import CommentDetail from './comment-detail'
import ReplyCommentDetailArray from './reply-comment-detail-array'

/**
 * 一个评论楼层由主评论和对他的众多回复评论组成
 * 这里规定，前者称 mainComment，后者称 replyComment
 */
export default {
  name: 'main-comment-detail',
  components: {
    CommentDetail,
    ReplyCommentDetailArray
  },
  componentName: 'main-comment-detail',
  props: {
    mainCommentDetail: {
      type: Object,
      required: true
    }
  },
  computed: {
    showReply () {
      return this.mainCommentDetail.replyCommentDetailArray.data.length !== 0
    }
  }
}
</script>

<style lang="scss">
.main-content-detail {
  &:last-child {
    border-bottom: 0px !important;
  }
  .reply-comment-detail-array {
    margin-left: 40px;
  }
}
</style>
