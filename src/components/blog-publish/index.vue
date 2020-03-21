<template>
  <el-card class="blog-publish-wrapper">
    <div class="first-floor-wrapper">
      <a>快来发一条微博吧！</a>
    </div>
    <el-input
      maxlength="140"
      show-word-limit
      type="textarea"
      :autosize="{minRows: 3, maxRows: 6}"
      v-model="blogText"
    ></el-input>
    <div class="third-floor-wrapper">
      <div class="third-floor-left-part">
        <el-button type="text">表情</el-button>
        <el-popover width="270" trigger="click" :offset="-6">
          <el-upload
            action="https://up-z0.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="uploadOptionForm"
            :before-upload="beforePictureUpload"
            :on-success="onPictureUploadSuccess"
            :limit="9"
            :on-exceed="onPictureExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="80px" height="80px" :src="dialogImageUrl" alt />
          </el-dialog>
          <el-button slot="reference" type="text" class="upload-picture-button">图片</el-button>
        </el-popover>
        <el-button type="text">话题</el-button>
        <el-button type="text">文章</el-button>
      </div>
      <div class="third-floor-right-part">
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option label="公开" :value="1"></el-option>
          <el-option label="粉丝" :value="2"></el-option>
          <el-option label="仅自己" :value="3"></el-option>
        </el-select>
        <el-button
          size="small"
          type="primary"
          :loading="isPublishLoading"
          @click="onPublishButtonClick"
        >发布</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getUploadPictureToken } from '@/api/uploadPicture'
import { postBlog } from '@/api/blog'
import BlogDetail from '@/components/blog-detail/model/blog/BlogDetail'

export default {
  name: 'blog-publish',
  data () {
    return {
      blogText: '',
      dialogImageUrl: '',
      dialogVisible: false,
      selectValue: 1,
      pictureUrlArray: [],
      isPublishLoading: false,
      uploadOptionForm: {
        token: ''
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforePictureUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
        return false
      }
    },
    onPictureUploadSuccess (res) {
      this.pictureUrlArray.push(res.key)
    },
    onPictureExceed () {
      this.$message.warning('最多仅支持上传9张图片')
    },
    async onPublishButtonClick () {
      if (this.blogText.length === 0) {
        this.$message.error('博文内容不能为空')
        return false
      }
      try {
        this.isPublishLoading = true
        const data = await postBlog({
          text: this.blogText,
          postTerminal: 'weibo.com 微博网页版',
          pictureUrlArray: this.pictureUrlArray,
          sourceBlogId: null
        })
        this.isPublishLoading = false
        this.$message.success('发布成功')

        const newBlogDetail = new BlogDetail({
          ...data,
          userIconUrl: data.userProfilePictureUrl,
          commentCount: data.firstCommentCount + data.secondCommentCount,
          blogPictureUrlArray: data.blogPictureUrlList
        })
        if (data.sourceBlogDetail) {
          newBlogDetail.setSourceBlogDetail(
            new BlogDetail({
              ...data.sourceBlogDetail,
              userIconUrl: data.sourceBlogDetail.userProfilePictureUrl,
              commentCount: data.sourceBlogDetail.firstCommentCount + data.sourceBlogDetail.secondCommentCount,
              blogPictureUrlArray: data.sourceBlogDetail.blogPictureUrlList
            })
          )
        }

        this.$emit('publish-success', newBlogDetail)
        this.blogText = ''
      } catch (error) {
        console.error(error)
        this.isPublishLoading = false
        this.$message.error('发布失败，请稍后重试')
        this.$emit('publish-failed')
      }
    }
  },
  created () {
    getUploadPictureToken()
      .then(data => {
        this.uploadOptionForm.token = data
      })
      .catch(error => {
        console.error(error.message, '获取图床上传Token失败')
      })
  }
}
</script>

<style lang="scss">
.blog-publish-wrapper {
  width: 100%;
  .el-card__body {
    padding: 5px 15px;
  }
  .first-floor-wrapper {
    a {
      font-size: 14px;
      font-weight: 500;
      line-height: 39px;
      color: rgb(64, 158, 255);
    }
  }
  .repost-blog-text {
    background-color: #f2f2f5;
    padding: 7px 10px;
    margin-bottom: 10px;
    a {
      font-size: 12px;
      font-weight: 400;
      color: #808080;
    }
  }
  .third-floor-wrapper {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    .third-floor-left-part {
      .el-button--text {
        font-size: 12px;
        color: rgb(51, 51, 51);
        font-weight: 400;
        margin: 0 10px 0 0;
      }
    }
    .third-floor-right-part {
      .el-dropdown {
        margin-right: 15px;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: rgb(51, 51, 51);
        font-size: 12px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
        margin-left: -3px;
      }
      .el-select {
        width: 100px;
        margin-right: 10px;
        input {
          text-align: right;
          border-color: white;
          line-height: 20px;
          height: 100%;
          font-size: 12px;
          color: rgb(51, 51, 51);
          font-weight: 400;
        }
        .el-input__icon {
          line-height: 20px;
        }
      }
    }
  }
}
.el-upload--picture-card {
  width: 80px !important;
  height: 80px !important;
  text-align: center !important;
  line-height: 80px !important;
  i {
    line-height: 80px !important;
  }
}
.el-popover {
  padding-bottom: 4px !important;
  .el-upload-list--picture-card {
    line-height: 1px !important;
    .el-upload-list__item {
      width: 80px !important;
      height: 80px !important;
    }
  }
  .el-upload--picture-card {
    margin-bottom: 8px !important;
  }
}

.el-popper[x-placement^="bottom"] .popper__arrow {
  left: 50% !important;
}
</style>
