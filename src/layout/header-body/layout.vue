<template>
  <div class="layout-wrapper">
    <div class="header">
      <div class="layout-left-wrapper">
        <span @click="onWeiboClick">微博</span>
      </div>
      <div class="layout-center-wrapper">
        <div class="input-wrapper">
          <el-input
            type="mini"
            suffix-icon="el-icon-search"
            placeholder="找人"
            v-model="inputText"
            @keyup.enter.native="onSearch"
            v-if="showSearchArea"
          ></el-input>
        </div>
        <el-button type="text">首页</el-button>
        <el-button type="text">视频</el-button>
        <el-button type="text">发现</el-button>
        <el-button type="text">游戏</el-button>
        <template>
          <el-popover v-if="hasLoggedin" trigger="hover" width="50">
            <el-button type="primary" @click="onLogoutButtonClick">注销</el-button>
            <el-button slot="reference" type="text">{{userNickname}}</el-button>
          </el-popover>
          <el-button v-else type="text" @click="onLoginButtonClick">登录</el-button>
        </template>
      </div>
      <div class="layout-right-wrapper">
        <el-button type="text">私信</el-button>
        <el-button type="text">设置</el-button>
        <el-button type="text" @click="onPublishButtonClick">发布</el-button>
      </div>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'layout-header-body',
  data () {
    return {
      inputText: ''
    }
  },
  computed: {
    ...mapGetters('account', ['hasLoggedin']),
    ...mapState('account', ['userNickname']),
    showSearchArea () {
      return this.$route.path !== '/search'
    }
  },
  methods: {
    ...mapMutations('dialog', ['setLoginRegisterVisible', 'setBlogPublishVisible']),
    ...mapMutations('account', ['logout']),
    onLoginButtonClick () {
      this.setLoginRegisterVisible(true)
    },
    onLogoutButtonClick () {
      this.logout()
      this.$router.go(0)
    },
    onPublishButtonClick () {
      this.setBlogPublishVisible(true)
    },
    onSearch () {
      if (this.inputText.length === 0) {
        this.$message.warning('搜索内容不可为空')
        return
      }
      this.$router.push({
        path: '/search',
        query: { keyword: this.inputText }
      })
      this.inputText = ''
    },
    onWeiboClick () {
      if (this.$route.path === '/home/timeline') this.$router.go(0)
      else this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang='scss'>
.layout-wrapper {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .header {
    position: fixed;
    z-index: 2;
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #3983e4;
    color: #333;
    text-align: center;
    height: 50px;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
    .layout-left-wrapper {
      width: 100px;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: right;
      color: white;
      font-size: 20px;
      font-style: italic;
      span:hover {
        cursor: pointer;
      }
    }
    .layout-center-wrapper {
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 1000px;
      padding: 0 30px 0 30px;
      & > span:last-child {
        margin-left: 10px;
      }
      .input-wrapper {
        flex-grow: 1;
        flex-shrink: 1;
        margin-right: 20px;
        .el-input {
          .el-input__inner {
            height: 32px;
            border-radius: 0;
            background-color: whitesmoke;
          }
          .el-input__icon {
            line-height: 32px;
          }
        }
      }
      .el-button--text {
        color: white;
        :hover {
          color: #acc6ff;
        }
      }
    }
    .layout-right-wrapper {
      width: 100px;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      .el-button--text {
        color: white;
        :hover {
          color: #acc6ff;
        }
      }
    }
  }
  .body {
    flex-grow: 1;
    flex-shrink: 1;
    background-color: whitesmoke;
    position: relative;
    padding-top: 50px;
  }
}
</style>
