const TOKEN_NAME = 'RUSH_ADMIN_TOKEN'
export const tokenHandler = {
  get() {
    return localStorage.getItem(TOKEN_NAME)
  },
  set(token: string) {
    localStorage.setItem(TOKEN_NAME, token)
  },
  remove() {
    localStorage.removeItem(TOKEN_NAME)
  },
}
