// // 路由守卫
// import { tokenHandler } from '@core/apis/tokenHandler'
// import router from '@core/router'
// import { injectHerf } from '@core/utils/injectHerf'
// import { getOAuth } from '@core/utils/oAuth'

// // 设置无需鉴权的路径
// const allowEnterPath: string[] = ['/login/feishu', '/404', '/login/middleware']
// router.beforeEach(async (to, from, next) => {
//   const token = tokenHandler.get()
//   if (!token) {
//     const allowRoute: boolean = allowEnterPath.some((path) => to.path === path)
//     if (!allowRoute) {
//       const { feishuUrl } = getOAuth()
//       injectHerf(feishuUrl, '_self')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
