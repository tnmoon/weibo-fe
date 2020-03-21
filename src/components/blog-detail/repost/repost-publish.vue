<template>
  <div class="comment-publish" v-if="visible">
    <div class="comment-publish-first-floor">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6 }"
        v-model="inputText"
        :maxlength="140"
        show-word-limit
      ></el-input>
    </div>
    <div class="comment-publish-second-floor">
      <div class="comment-publish-second-floor-left-part">
        <el-button type="text">表情</el-button>
        <el-checkbox v-model="commentMeanwhile">同时评论给{{client.userNickname}}</el-checkbox>
        <el-checkbox
          v-model="commentToParentMeanwhile"
          v-if="client.parentBlogDetail"
        >同时评论给 {{client.parentBlogDetail.userNickname}}</el-checkbox>
      </div>
      <el-button size="mini" type="primary" @click="onPublishButtonClick" :loading="isPublishing">转发</el-button>
    </div>
  </div>
</template>

<script>
import BlogDetail from '../model/blog/BlogDetail'
import Emitter from '@/mixins/emitter'

export default {
  name: 'repost-publlish',
  mixins: [Emitter],
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true
    },
    client: {
      type: [BlogDetail],
      required: true
    }
  },
  data () {
    return {
      inputText: '',
      isPublishing: false,
      commentMeanwhile: false,
      commentToParentMeanwhile: false
    }
  },
  computed: {
    presetText () {
      return this.client.sourceBlogDetail ? '//@' + this.client.userNickname + ': ' + this.client.blogText : ''
    }
  },
  methods: {
    async onPublishButtonClick () {
      if (this.inputText.length === 0) {
        this.$message.error('转发内容不能为空')
        return false
      }
      try {
        this.isPublishing = true
        const newBlogDetail = await this.client.repost({
          text: this.inputText,
          commentMeanwhile: this.commentMeanwhile
        })
        this.dispatch('blog-detail', 'repost-success', newBlogDetail)

        if (this.commentToParentMeanwhile) {
          await this.client.parentBlogDetail.comment({
            text: this.inputText
          })
        }
        this.isPublishing = false
        this.inputText = this.presetText

        // 只要该评论或转发不是针对blog的，则在发送成功后隐藏该发布框
        if (this.client.blogDetailArray) this.$emit('update:visible', false)
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
