export default class SonBlogDetailArray {
  constructor (mainBlogDetail) {
    this.data = []
    this.mainBlogDetail = mainBlogDetail
  }

  async increase () {

  }

  clear () {
    this.data = []
  }

  unshift (sonBlogDetail) {
    sonBlogDetail.sonBlogDetailArray = this
    this.data.unshift(sonBlogDetail)
  }

  push (sonBlogDetail) {
    sonBlogDetail.sonBlogDetailArray = this
    this.data.push(sonBlogDetail)
  }
}
