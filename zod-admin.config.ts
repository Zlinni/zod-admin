import { defineRushConfig } from '@core/utils/defineRushConfig'
import { z } from 'zod'

export default defineRushConfig({
  routers: {},
  site: {
    title: 'zod-admin',
    logoName: 'Zod Admin',
    theme: {
      primaryColor: 'rgba(53, 35, 169, 1)',
    },
  },
  login: {
    default: {
      url: '/mock/admin/login',
      method: 'GET',
      schema: z.object({
        email: z.string().min(1).describe('账号').default('admin@google.com'),
        password: z
          .string()
          .min(1)
          .describe('密码')
          .default('admin@google.com'),
      }),
      tokenKey: 'token',
    },
  },
  user: {
    default: {
      url: '/mock/admin/user/info',
      method: 'GET',
      apiKeyAdapter: {
        nickName: 'nick_name',
        email: 'email',
      },
    },
  },
  request: {
    token: {
      prefix: '',
      mock: '',
    },
  },
  env: {
    git: 'your-git-address',
    storageKey: 'PR_RUSH_ADMIN_BASE_URL',
    option: [
      {
        i18n: {
          cn: '开发环境',
          en: 'DEV',
        },
        key: import.meta.env.VITE_APP_ADMIN_DEV,
      },
      {
        i18n: {
          cn: '海外开发环境',
          en: 'DEV_OVERSEA',
        },
        key: import.meta.env.VITE_APP_ADMIN_DEV_OVERSEA,
      },
      {
        i18n: {
          cn: '测试环境',
          en: 'TEST',
        },
        key: import.meta.env.VITE_APP_ADMIN_TEST,
      },
      {
        i18n: {
          cn: '海外测试环境',
          en: 'TEST_OVERSEA',
        },
        key: import.meta.env.VITE_APP_ADMIN_TEST_OVERSEA,
      },
      {
        i18n: {
          cn: '生产环境',
          en: 'PROD',
        },
        key: import.meta.env.VITE_APP_ADMIN_PROD,
      },
      {
        i18n: {
          cn: '海外生产环境',
          en: 'PROD_OVERSEA',
        },
        key: import.meta.env.VITE_APP_ADMIN_PROD_OVERSEA,
      },
      {
        i18n: {
          cn: '本地Mock环境',
          en: 'Mock',
        },
        key: import.meta.env.VITE_APP_ADMIN_MOCK,
      },
    ],
  },
})
