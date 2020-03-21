<template>
  <el-card class="search-user">
    <div class="search-user-left-wrapper">
      <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+userIconUrl" />
    </div>
    <div class="search-user-right-wrapper">
      <p class="user-nickname">
        {{userNickname}}
        <el-button size="mini" v-if="hasFollowed" @click="onDefollowClick" :loading="isLoading">已关注</el-button>
        <el-button size="mini" v-else type="primary" :loading="isLoading" @click="onFollowClick">关注</el-button>
      </p>
      <p class="user-description">
        <span v-if="userDescription">{{userDescription}}</span>
        <span v-else>他有点儿懒，什么简介都没写哦！</span>
      </p>
      <p class="user-blog-detail">
        <span>关注：{{followCount}}</span>
        <span>粉丝：{{fansCount}}</span>
        <span>微博：{{blogCount}}</span>
      </p>
    </div>
  </el-card>
</template>

<script>
import { follow, defollow } from '@/api/account'

export default {
  name: 'search-user',
  props: {
    userId: {
      type: Number,
      required: true
    },
    userNickname: {
      type: String,
      required: true
    },
    userIconUrl: {
      type: String,
      required: true
    },
    userDescription: {
      type: String,
      required: false
    },
    hasFollowed: {
      type: Boolean,
      required: true
    },
    followCount: {
      type: Number,
      required: true
    },
    fansCount: {
      type: Number,
      required: true
    },
    blogCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onDefollowClick () {
      try {
        this.isLoading = true
        await defollow({ bloggerId: this.userId })
        this.isLoading = false
        this.$emit('update:hasFollowed', false)
      } catch (error) {
        console.error(error)
        this.$message.error('操作失败')
        this.isLoading = false
      }
    },
    async onFollowClick () {
      try {
        this.isLoading = true
        await follow({ bloggerId: this.userId })
        this.isLoading = false
        this.$emit('update:hasFollowed', true)
      } catch (error) {
        console.error(error)
        this.$message.error('操作失败')
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
.search-user {
  width: 650px;
  .el-card__body {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    .search-user-left-wrapper {
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: 20px;
      height: 78px;
      width: 78px;
      img {
        height: 78px;
        width: 78px;
        border-radius: 50%;
      }
    }
    .search-user-right-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      p {
        margin: 8px 0;
        font-size: 12px;
        font-weight: 400;
      }
      .user-nickname {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
        .el-button {
          margin-left: 10px;
        }
      }
      .user-blog-detail {
        span {
          margin-right: 15px;
        }
      }
      :last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
