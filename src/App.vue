<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
      :visible="loginRegisterVisible"
      :close-on-click-modal="false"
      @open="onLoginRegisterDialogOpen"
      @close="onLoginRegisterDialogClose"
      width="400px"
    >
      <login-register></login-register>
    </el-dialog>
    <el-dialog
      :visible="blogPublishVisible"
      :close-on-click-modal="false"
      class="blog-publish-dialog"
      @open="onBlogPublishDialogOpen"
      @close="onBlogPublishDialogClose"
      width="510px"
    >
      <blog-publish @publish-success="onPublishSuccess"></blog-publish>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import loginRegister from '@/components/login-register'
import blogPublish from '@/components/blog-publish'

export default {
  name: 'app',
  components: {
    loginRegister,
    blogPublish
  },
  computed: {
    ...mapState('dialog', ['loginRegisterVisible', 'blogPublishVisible'])
  },
  methods: {
    ...mapMutations('dialog', ['setLoginRegisterVisible', 'setBlogPublishVisible']),
    ...mapMutations('timeline', ['unshift']),
    onLoginRegisterDialogOpen () {
      this.setLoginRegisterVisible(true)
    },
    onLoginRegisterDialogClose () {
      this.setLoginRegisterVisible(false)
    },
    onBlogPublishDialogOpen () {
      this.setBlogPublishVisible(true)
    },
    onBlogPublishDialogClose () {
      this.setBlogPublishVisible(false)
    },
    onPublishSuccess (newBlogDetail) {
      this.unshift(newBlogDetail)
      this.setBlogPublishVisible(false)
    }
  }
}
</script>

<style lang="scss">
.blog-publish-dialog {
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      top: 17px;
    }
  }
  .el-dialog__body {
    padding: 0;
    .el-textarea {
      // width: auto;
      font-size: 12px;
      .el-textarea__inner {
        padding: 5px 7px;
      }
    }
  }
}
</style>
