<template>
  <div class="comment-publish" v-if="visible">
    <div class="comment-publish-first-floor">
      <el-input
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        v-model="inputText"
        :maxlength="64"
        show-word-limit
      ></el-input>
    </div>
    <div class="comment-publish-second-floor">
      <div class="comment-publish-second-floor-left-part">
        <el-button type="text">表情</el-button>
        <el-checkbox v-model="repostMeanwhile">同时转发到我的微博</el-checkbox>
      </div>
      <el-button size="mini" type="primary" @click="onPublishButtonClick" :loading="isPublishing">评论</el-button>
    </div>
  </div>
</template>

<script>
import BlogDetail from '../model/blog/BlogDetail'
import ReplyCommentDetail from '../model/comment/ReplyCommentDetail'
import MainCommentDetail from '../model/comment/MainCommentDetail'
import Emitter from '@/mixins/emitter'
export default {
  name: 'comment-publish',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true
    },
    client: {
      type: [ReplyCommentDetail, MainCommentDetail, BlogDetail],
      required: true
    }
  },
  mixins: [Emitter],
  data () {
    return {
      inputText: '',
      isPublishing: false,
      repostMeanwhile: false
    }
  },
  computed: {
    presetText () {
      if (this.client instanceof BlogDetail) return ''
      else return '回复@' + this.client.userNickname + ': '
    }
  },
  methods: {
    async onPublishButtonClick () {
      if (this.inputText.length === 0) {
        this.$message.error('评论内容不能为空')
        return false
      }
      try {
        this.isPublishing = true
        const newBlogDetail = await this.client.comment({
          text: this.inputText,
          repostMeanwhile: this.repostMeanwhile
        })
        if (this.repostMeanwhile) this.dispatch('blog-detail', 'repost-success', newBlogDetail)

        this.isPublishing = false
        this.inputText = this.presetText

        // 只要该评论或转发不是针对blog的，则在发送成功后隐藏该发布框
        if (!(this.client instanceof BlogDetail)) this.$emit('update:visible', false)
      } catch (error) {
        console.error(error)
        this.isPublishing = false
        this.$message.error('发送失败，请稍后重试')
      }
    }
  },
  created () {
    this.inputText = this.presetText
  }

}
</script>

<style lang="scss">
.comment-publish {
  .comment-publish-first-floor {
    .el-textarea__inner {
      padding: 5px 7px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .comment-publish-second-floor {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
    .comment-publish-second-floor-left-part {
      .el-button--text {
        font-size: 12px;
        font-weight: 400;
      }
      .el-checkbox {
        margin-left: 10px;
        .el-checkbox__label {
          font-size: 12px;
          font-weight: 400;
          padding-left: 5px;
        }
        .el-checkbox__inner {
          width: 12px;
          height: 12px;
        }
        .el-checkbox__inner::after {
          top: 0;
          left: 3px;
        }
      }
    }
  }
}
</style>
