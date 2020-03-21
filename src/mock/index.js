import Mock from 'mockjs'

Mock.setup({
  timeout: '500-600'
})

// Mock.mock("http://localhost:8088/login", 'post', {
//   code: 200,
//   message: 'success',
//   data: {
//     uuid: '13133211',
//     token: 'dewa43r4f34w4',
//     nickname: 'TNMoOn'
//   }
// })

// Mock.mock("http://localhost:8088/register", 'post', {
//   code: 200,
//   message: 'success',
// })

// Mock.mock("http://localhost:8088/postBlog", 'post', {
//   code: 200,
//   message: 'success',
// })

Mock.mock('http://localhost:8088/like', 'post', {
  code: 200,
  message: 'success'
})

Mock.mock('http://localhost:8088/comment', 'post', {
  code: 200,
  message: 'success'
})

// Mock.mock(RegExp("http://localhost:8088/getTimelineBlog.*"), "get", {
//   code: 200,
//   message: 'success',
//   data: [
//     {
//       id: "123456",
//       type: 2, // 2代表图文
//       user: {
//         id: "234567",
//         iconURL: "",
//         nickname: "人民日报",
//         postTime: 1581607885000,
//         sourceTerminal: "Frank viewAndroid",
//       },
//       content: {
//         text: "【#红十字会总会赴武汉工作组#：坚决彻底整改】中国红十字会党组书记、常务副会长梁惠玲率领总会工作组于２月１日晚奔赴武汉，调查处置舆情反映有关问题，依法规范捐赠款物接受使用和信息公开工作。对疫情防控工作进行再调度、再部署、再动员，要求深刻汲取捐赠款物管理失职失责的惨痛教训，迅速开展自查自纠，采取切实管用措施，坚决彻底整改到位。",
//         pictureURL: [
//           ""
//         ]
//       },
//       interact: {
//         repostCount: 1231,
//         commentCount: 212,
//         likeCount: 3242
//       }
//     },
//     {
//       id: "123457",
//       type: 2, // 2代表图文
//       user: {
//         iconURL: "",
//         nickname: "人民日报",
//         postTime: 1581607885000,
//         sourceTerminal: "Frank viewAndroid",
//       },
//       content: {
//         text: "【#红十字会总会赴武汉工作组#：坚决彻底整改】中国红十字会党组书记、常务副会长梁惠玲率领总会工作组于２月１日晚奔赴武汉，调查处置舆情反映有关问题，依法规范捐赠款物接受使用和信息公开工作。对疫情防控工作进行再调度、再部署、再动员，要求深刻汲取捐赠款物管理失职失责的惨痛教训，迅速开展自查自纠，采取切实管用措施，坚决彻底整改到位。",
//         pictureURL: [
//           ""
//         ]
//       },
//       interact: {
//         repostCount: 1231,
//         commentCount: 212,
//         likeCount: 3242
//       }
//     },
//     {
//       id: "123458",
//       type: 2, // 2代表图文
//       user: {
//         iconURL: "",
//         nickname: "人民日报",
//         postTime: 1581607885000,
//         sourceTerminal: "Frank viewAndroid",
//       },
//       content: {
//         text: "【#红十字会总会赴武汉工作组#：坚决彻底整改】中国红十字会党组书记、常务副会长梁惠玲率领总会工作组于２月１日晚奔赴武汉，调查处置舆情反映有关问题，依法规范捐赠款物接受使用和信息公开工作。对疫情防控工作进行再调度、再部署、再动员，要求深刻汲取捐赠款物管理失职失责的惨痛教训，迅速开展自查自纠，采取切实管用措施，坚决彻底整改到位。",
//         pictureURL: [
//           ""
//         ]
//       },
//       interact: {
//         repostCount: 1231,
//         commentCount: 212,
//         likeCount: 3242
//       }
//     }
//   ]
// })
