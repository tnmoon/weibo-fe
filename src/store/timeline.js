import { getTimelineBlog } from '@/api/blog'
import BlogDetail from '@/components/blog-detail/model/blog/BlogDetail'

export default {
  namespaced: true,
  state: {
    blogDetailArray: []
  },
  actions: {
    async increase ({ state }) {
      const lastBlogDetailData = state.blogDetailArray[state.blogDetailArray.length - 1]

      const newBlogDetailDataArray = await getTimelineBlog({
        lastBlogTimestamp: lastBlogDetailData ? lastBlogDetailData.blogPostTime : new Date().getTime(),
        lastBlogId: lastBlogDetailData ? lastBlogDetailData.blogId : 0
      })

      newBlogDetailDataArray.forEach(element => {
        const newBlogDetail = new BlogDetail({
          ...element,
          userIconUrl: element.userProfilePictureUrl,
          commentCount: element.firstCommentCount + element.secondCommentCount,
          blogPictureUrlArray: element.blogPictureUrlList
        })
        if (element.sourceBlogDetail) {
          newBlogDetail.setSourceBlogDetail(
            new BlogDetail({
              ...element.sourceBlogDetail,
              userIconUrl: element.sourceBlogDetail.userProfilePictureUrl,
              commentCount: element.sourceBlogDetail.firstCommentCount + element.sourceBlogDetail.secondCommentCount,
              blogPictureUrlArray: element.sourceBlogDetail.blogPictureUrlList
            })
          )
        }
        state.blogDetailArray.push(newBlogDetail)
      })

      return newBlogDetailDataArray.length
    },

    async refresh ({ state, dispatch }) {
      state.blogDetailArray = []
      dispatch('increase')
    }
  },
  mutations: {
    unshift (state, blogDetail) {
      state.blogDetailArray.unshift(blogDetail)
    }
  }
}
