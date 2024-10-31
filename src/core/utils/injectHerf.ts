export const injectHerf = (url: string, target = '_blank') => {
  const link: HTMLAnchorElement = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  // 新页面打开
  link.target = target
  // 触发点击
  document.body.appendChild(link)
  link.click()
  // 移除
  document.body.removeChild(link)
}
