<template>
  <div class="repost-detail-array">
    <repost-detail></repost-detail>
  </div>
</template>

<script>
import SonBlogDetailArray from '../model/blog/SonBlogDetailArray'
import RepostDetail from '../repost/repost-detail'
export default {
  name: 'repost-detail-array',
  props: {
    repostDetailArray: {
      type: SonBlogDetailArray,
      required: true
    }
  },
  components: {
    RepostDetail
  }
}
</script>

<style lang="scss">
.repost-detail-array {
  margin-top: 9px;
  background-color: #eaeaec;
  padding: 0 12px;
  .comment-item {
    padding: 7px 0;
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
