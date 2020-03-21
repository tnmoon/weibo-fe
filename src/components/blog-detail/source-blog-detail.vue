<template>
  <div class="source-blog-detail">
    <div class="source-blog-user">
      <a>{{'@'+data.userNickname}}</a>
    </div>
    <div class="source-blog-text">
      <a>{{data.blogText}}</a>
    </div>
    <picture-wall
      class="source-blog-media-part"
      v-if="data.blogPictureUrlArray !== null && data.blogPictureUrlArray.length !== 0"
      :urlArray="data.blogPictureUrlArray"
    ></picture-wall>
    <div class="source-blog-footer">
      <a>{{moment(this.data.blogPostTime).format("YYYY年M月D日 HH:mm")+" 来自 " + data.blogPostTerminal}}</a>
      <div class="source-blog-footer-right-part">
        <el-button type="text">
          <i class="el-icon-edit-outline"></i>
          <a v-if="data.repostCount">{{data.repostCount}}</a>
          <a v-else>转发</a>
        </el-button>
        <el-button type="text">
          <i class="el-icon-chat-dot-square"></i>
          <a v-if="data.commentCount">{{data.commentCount}}</a>
          <a v-else>评论</a>
        </el-button>
        <el-button type="text" @click="onLikeButtonClick">
          <i class="el-icon-thumb" :style="{'color' : this.data.hasLiked ? '#eb7350' : '#808080'}"></i>
          <a v-if="data.likeCount!==0">{{data.likeCount}}</a>
          <a v-else>赞</a>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import pictureWall from './picture-wall'

export default {
  name: 'source-blog-detail',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    pictureWall
  },
  methods: {
    async onLikeButtonClick () {
      this.data.toggleLike()
    },
    moment
  }
}
</script>

<style lang="scss">
.source-blog-detail {
  background-color: #f2f2f5;
  width: 500px;
  margin: 2px -20px -4px -80px;
  padding: 4px 20px 1px 80px;
  .source-blog-user {
    font-size: 12px;
    font-weight: 700;
    margin: 5px 0 3px 0;
  }
  .source-blog-text {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 3px;
    line-height: 21px;
    text-align: justify;
  }
  .source-blog-media-part {
    margin-top: 7px;
  }
  .source-blog-footer {
    margin: 1px 0 7px 0;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #808080;
    font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "WenQuanYi Micro Hei", sans-serif;
    .source-blog-footer-right-part {
      .el-button--text {
        padding: 0;
        font-size: 12px;
        font-weight: 400;
        color: #808080;
        a {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
