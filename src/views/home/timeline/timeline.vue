<template>
  <div class="timeline-wrapper">
    <blog-publish @publish-success="unshift"></blog-publish>
    <blog-detail
      v-for="i in blogDetailArray.length"
      :key="blogDetailArray[i-1].blogId"
      :blog-detail="blogDetailArray[i-1]"
      :my-user-icon-url="userIconUrl"
      :my-user-nickname="userNickname"
      @repost-success="unshift"
    ></blog-detail>
    <el-card class="loading-card">
      <template v-if="loadingStatus === 0 || loadingStatus === 1">
        <i class="el-icon-loading"></i>
        <a>正在加载中，请稍后...</a>
      </template>
      <template v-else-if="loadingStatus===-1">
        <a>请求超时，</a>
        <el-button type="text" @click="loadBlogDetailData">点击重新载入</el-button>
      </template>
      <template v-else>
        <a>已经到底啦！</a>
      </template>
    </el-card>
  </div>
</template>

<script>
import BlogDetail from '@/components/blog-detail'
import BlogPublish from '@/components/blog-publish'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'timeline',
  components: {
    BlogDetail,
    BlogPublish
  },
  computed: {
    ...mapState('timeline', ['blogDetailArray']),
    ...mapState('account', ['userNickname', 'userIconUrl'])
  },
  data () {
    return {
      loadingStatus: 0 // -1代表加载失败，0代表加载成功，1代表正在加载，2代表已加载到底
    }
  },
  methods: {
    ...mapActions('timeline', ['increase']),
    ...mapMutations('timeline', ['unshift']),
    scrollEvent () {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeigh = document.body.scrollHeight
      if (scrollTop + clientHeight >= scrollHeigh) {
        this.onScrollToBottom()
      }
    },
    async loadBlogDetailData () {
      try {
        this.loadingStatus = 1
        const increaseLength = await this.increase()
        if (increaseLength === 10) this.loadingStatus = 0
        else this.loadingStatus = 2
      } catch (error) {
        console.error(error)
        this.loadingStatus = -1
      }
    },
    /**
     * loadingStatus为-1、1、2时分别代表上次加载失败、正在加载、已加载到底
     * 在这些情况下都无需触发到底事件
     * 只有在上次加载成功的情况下，才自动触底加载
     */
    onScrollToBottom () {
      if (this.loadingStatus === 0) this.loadBlogDetailData()
    }
  },
  created () {
    this.loadBlogDetailData()
  },
  mounted () {
    window.addEventListener('scroll', this.scrollEvent, false)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent)
  }

}
</script>

<style lang="scss">
.blog-detail {
  margin-top: 8px;
}
.loading-card {
  text-align: center;
  margin-top: 8px;
  .el-card__body {
    padding: 12px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: rgb(51, 51, 51);
    font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "WenQuanYi Micro Hei", sans-serif;
    a {
      margin-left: 5px;
    }
  }
  .el-button--text {
    padding: 0;
  }
}
</style>
