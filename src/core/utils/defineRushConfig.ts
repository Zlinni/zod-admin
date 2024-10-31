import type { z } from 'zod'
import { RGB } from './rgbUtil'

export interface RushMeta {
  /**
   * 路由名称
   */
  title?: string
  /**
   * 路由icon
   */
  icon?: string
  /**
   * 路由权重
   */
  weight?: number
}
export const defineRushConfig = ({
  site,
  ...args
}: {
  /**
   * 路由参数
   */
  routers: Record<string, RushMeta>
  /**
   * 网站相关
   */
  site: {
    /**
     * 网站名称
     */
    title?: string
    /**
     * logo名称
     */
    logoName?: string
    /**
     * 主题
     */
    theme?: {
      /**
       * 主题色 仅支持rgba
       */
      primaryColor?: string
    }
  }
  /**
   * 登录相关
   */
  login: {
    default: {
      /**
       * 登录URL
       */
      url: string
      /**
       * 请求方法
       */
      method: 'POST' | 'GET'
      /**
       * 表单schema
       */
      schema: z.ZodObject<any, any>
      /**
       * 接口返回的token名称
       */
      tokenKey: string
    }
    /**
     * 第三方登录
     */
    thirdPartyLogin?: any
  }
  /**
   * 用户相关
   */
  user: {
    default: {
      /**
       * 登录URL
       */
      url: string
      /**
       * 请求方法
       */
      method: 'POST' | 'GET'
      /**
       * 接口Key适配器
       */
      apiKeyAdapter: {
        /**
         * 用户头像
         */
        avatar?: string
        /**
         * 用户昵称
         */
        nickName?: string
        /**
         * 用户邮箱
         */
        email?: string
      }
    }
  }
  /**
   * 请求相关配置
   */
  request: {
    token?: {
      prefix?: string
      mock?: string
    }
  }
  env: {
    git?: string
    storageKey?: string
    option: {
      key: string
      i18n: {
        cn: string
        en: string
      }
    }[]
  }
}) => {
  const primaryColor =
    site.theme?.primaryColor ?
      RGB.values(site.theme.primaryColor)
    : [255, 134, 168]
  return {
    site: {
      ...site,
      title: site?.title ?? 'zod-admin',
      logoName: site?.logoName ?? 'Zod Admin',
      theme: {
        ...site.theme,
        primaryColor,
      },
    },
    ...args,
  }
}
