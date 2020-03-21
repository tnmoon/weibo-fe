<template>
  <el-card class="user-card">
    <div class="user-card-background" :style="{'background-image' : 'url('+profileCover+')'}">
      <img :src="'http://q5s8clnvd.bkt.clouddn.com/'+userIconUrl" />
    </div>
    <div class="user-card-detail">
      <div class="user-name">
        <a>{{userNickname}}</a>
      </div>
      <div class="user-statistics">
        <div class="statistics-item">
          <span class="number">{{followCount}}</span>
          <span class="item">关注</span>
        </div>
        <div class="statistics-item">
          <span class="number">{{fansCount}}</span>
          <span class="item">粉丝</span>
        </div>
        <div class="statistics-item">
          <span class="number">{{blogCount}}</span>
          <span class="item">微博</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import userIcon from '@/../public/user-icon.png'
import profileCover from '@/../public/profile-cover.jpg'

export default {
  name: 'user-card',
  props: {
    userNickname: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: false
    },
    userIconUrl: {
      type: String,
      required: true
    },
    blogCount: {
      type: Number,
      required: true
    },
    followCount: {
      type: Number,
      required: true
    },
    fansCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      userIcon,
      profileCover
    }
  }
}
</script>

<style lang="scss">
.user-card {
  .el-card__body {
    padding: 0;
    .user-card-background {
      width: 230px;
      height: 75px;
      text-align: center;
      img {
        display: block;
        position: relative;
        height: 60px;
        width: 60px;
        margin-left: -30px;
        border-radius: 50%;
        bottom: -30px;
        left: 50%;
      }
    }
    .user-card-detail {
      width: 210px;
      height: 65px;
      padding: 16px 10px 9px 10px;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .user-name {
        padding-top: 5px;
        text-align: center;
        font-size: 14px;
        line-height: 16px;
        font-weight: 700;
      }
      .user-statistics {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        flex-shrink: 1;
        margin-top: 3px;
        .statistics-item {
          width: 10px;
          height: 100%;
          flex-grow: 1;
          flex-shrink: 1;
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .number {
            font-size: 18px;
            font-weight: 700;
          }
          .item {
            font-size: 12px;
            font-weight: 400;
            color: #808080;
          }
        }
      }
    }
  }
}
</style>
