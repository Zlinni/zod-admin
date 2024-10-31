import { useMediaQuery, whenever } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useDrawerOpen = defineStore('useDrawerOpen', () => {
  const open = ref(false)
  const isLargeScreen = useMediaQuery('(min-width: 1440px)')

  whenever(isLargeScreen, () => (open.value = false))
  return {
    open,
  }
})
