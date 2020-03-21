<template>
  <div class="body-home-wrapper">
    <div class="home-content">
      <div class="home-content-left-wrapper">
        <el-button type="text">首页</el-button>
        <el-button type="text">我的收藏</el-button>
        <el-button type="text">我的评论</el-button>
        <el-button type="text">我的赞</el-button>
      </div>
      <div class="home-content-center-wrapper">
        <router-view></router-view>
      </div>
      <div class="home-content-right-wrapper">
        <user-card
          v-if="hasLoggedin"
          :user-nickname="userNickname"
          :user-id="userId"
          :user-icon-url="userIconUrl"
          :blog-count="blogCount"
          :fans-count="fansCount"
          :follow-count="followCount"
        ></user-card>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/user-card'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    UserCard
  },
  computed: {
    ...mapGetters('account', ['hasLoggedin']),
    ...mapState('account', ['userId', 'userNickname', 'userIconUrl', 'fansCount', 'followCount', 'blogCount'])
  },
  methods: {
    onPublishSuccess (data) {
      this.$refs.blogDetailArray.publishBlog(data)
      this.blogCount++
      console.log('publish')
    }
  },
  created () {
    console.log(this.hasLoggedin, 'hasLoggedin')
  }
}
</script>

<style lang="scss">
.body-home-wrapper {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .home-content {
    flex-grow: 0;
    flex-shrink: 0;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1000px;
    height: 100%;
    .home-content-left-wrapper {
      position: fixed;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 150px;
      height: 100%;
      padding: 20px 0 0 0;
      .el-button {
        margin-left: 10px;
      }
    }
    .home-content-center-wrapper {
      width: 600px;
      height: 100%;
      padding: 10px 0 0 0;
      position: relative;
      left: 160px;
    }
    .home-content-right-wrapper {
      width: 230px;
      height: 100%;
      padding: 10px 0 0 0;
    }
  }
}
</style>
