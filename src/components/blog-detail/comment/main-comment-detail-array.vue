<template>
  <div class="comment-detail">
    <div class="comment-display" v-if="mainCommentDetailArray.data.length>0">
      <main-comment-detail
        v-for="i in mainCommentDetailArray.data.length"
        :key="mainCommentDetailArray.data[i-1].commentId"
        :main-comment-detail="mainCommentDetailArray.data[i-1]"
      ></main-comment-detail>
    </div>
    <div class="comment-more">
      <template v-if="loadingStatus===0">
        <el-button type="text" @click="loadCommentDetail">
          查看更多
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </template>
      <template v-if="loadingStatus===1">
        <el-button type="text">
          <i class="el-icon-loading"></i>
          正在加载中，请稍后...
        </el-button>
      </template>
      <template v-if="loadingStatus===-1">
        <el-button type="text" @click="loadCommentDetail">请求超时，点击重新载入</el-button>
      </template>
      <template v-if="loadingStatus===2">
        <a>已加载到底啦！</a>
      </template>
    </div>
  </div>
</template>

<script>
import MainCommentDetail from './main-comment-detail'
import MainCommentDetailArray from '../model/comment/MainCommentDetailArray'

export default {
  name: 'main-comment-detail-array',
  components: {
    MainCommentDetail
  },
  props: {
    mainCommentDetailArray: {
      type: MainCommentDetailArray,
      required: true
    }
  },
  data () {
    return {
      loadingStatus: 0 // -1代表加载失败，0代表加载成功，1代表正在加载，2代表已加载到底
    }
  },
  methods: {
    async loadCommentDetail () {
      try {
        this.loadingStatus = 1
        const increaseLength = await this.mainCommentDetailArray.increase()
        if (increaseLength === 7) this.loadingStatus = 0
        else this.loadingStatus = 2
      } catch (error) {
        console.error(error)
        this.loadingStatus = -1
      }
    }
  },
  created () {
    this.mainCommentDetailArray.clear() // 切勿删除
    this.loadCommentDetail()
  },
  destroyed () {
    this.mainCommentDetailArray.clear()
  }
}
</script>

<style lang="scss">
.comment-detail {
  .comment-display {
    margin: 0 20px;
    border-top: 1px solid #d9d9d9;
    .main-content-detail {
      padding: 8px 0;
    }
    .show-reply {
      padding-bottom: 4px;
    }
    :first-child.show-reply {
      padding-top: 10px;
    }
    :last-child.show-reply {
      padding-bottom: 15px;
    }
  }
  .comment-more {
    border-top: 1px solid #d9d9d9;
    text-align: center;
    .el-button--text {
      font-size: 12px;
      font-weight: 400;
      border: 0px;
      padding: 9px 0;
      span {
        line-height: 17px;
      }
    }
    a {
      color: #606266;
      display: block;
      font-size: 12px;
      font-weight: 400;
      padding: 9px 0;
    }
  }
}
</style>
