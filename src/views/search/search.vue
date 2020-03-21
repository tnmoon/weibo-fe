<template>
  <div class="search-wrapper">
    <div class="search-top-wrapper">
      <span>微博搜索</span>
      <el-input v-model="inputText" @keyup.enter.native="onSearch" placeholder="目前暂仅支持对用户昵称进行精确搜索"></el-input>
      <el-button type="primary" @click="onSearch">搜索</el-button>
    </div>
    <div class="search-left-wrapper">
      <search-user
        class="search-left-flow"
        v-if="loadingStatus===0"
        :user-id="userDetail.userId"
        :user-nickname="keyword"
        :user-icon-url="userDetail.userIconUrl"
        :user-description="userDetail.userDescription"
        :has-followed.sync="userDetail.hasFollowed"
        :follow-count="userDetail.followCount"
        :fans-count="userDetail.fansCount"
        :blog-count="userDetail.blogCount"
      ></search-user>
      <el-card class="loading-card search-left-flow" v-if="loadingStatus!==0">
        <template v-if="loadingStatus===1">
          <i class="el-icon-loading"></i>
          <a>正在加载中，请稍后...</a>
        </template>
        <template v-else-if="loadingStatus===-1">
          <a>请求超时，</a>
          <el-button type="text" @click="loadSearchResult">点击重新载入</el-button>
        </template>
        <template v-else>
          <a>抱歉，未找到 "{{keyword}}" 相关结果</a>
        </template>
      </el-card>
    </div>
    <div class="search-right-wrapper"></div>
  </div>
</template>

<script>
import SearchUser from '@/components/search-user'
import { searchUser } from '@/api/search'

export default {
  name: 'search',
  props: {
    keyword: {
      type: String
    }
  },
  data () {
    return {
      loadingStatus: 1, // -1代表加载失败，0代表加载成功，1代表正在加载，2代表无搜索结果
      userDetail: {},
      inputText: this.keyword
    }
  },
  components: {
    SearchUser
  },
  methods: {
    async loadSearchResult () {
      try {
        this.loadingStatus = 1
        this.userDetail = await searchUser({ keyword: this.inputText })
        if (this.userDetail === null) this.loadingStatus = 2
        else this.loadingStatus = 0
      } catch (error) {
        this.loadingStatus = -1
        console.error(error)
      }
    },
    onSearch () {
      if (this.$route.query.keyword !== this.inputText) { this.$router.push({ path: 'search', query: { keyword: this.inputText } }) }
      this.loadSearchResult()
    }
  },
  created () {
    if (this.keyword.length !== 0) this.loadSearchResult()
  }

}
</script>

<style lang="scss">
.search-wrapper {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  .search-top-wrapper {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 8px 230px 0 0;
    .el-input {
      width: 570px;
    }
    .el-button {
      width: 100px;
    }
  }
  .search-left-wrapper {
    .search-left-flow {
      margin-top: 8px;
    }
    .loading-card {
      width: 650px;
      .el-card__body {
        padding: 12px 0;
        text-align: center;
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
  }
}
</style>
