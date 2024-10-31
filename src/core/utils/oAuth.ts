export const getOAuth = () => {
  const appId = import.meta.env.VITE_APP_FEISHU_APP_ID
  const redirect_uri = encodeURIComponent(
    import.meta.env.VITE_APP_FEISHU_REDIRECT_URL
  )
  return {
    feishuUrl: `https://open.feishu.cn/open-apis/authen/v1/user_auth_page_beta?app_id=${appId}&redirect_uri=${redirect_uri}&state=login`,
  }
}
