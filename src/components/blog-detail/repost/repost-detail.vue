<template>
  <div class="repost-detail"></div>
</template>

<script>
import BlogDetail from '../model/blog/BlogDetail'

export default {
  name: 'repost-detail',
  props: {
    blogDetail: {
      type: BlogDetail,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
</style>
