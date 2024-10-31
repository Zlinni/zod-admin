import { toReactive } from '@vueuse/core'

interface UseSharedTablePaginationOptions {
  onFetch?(): void
}

export const useSharedTablePagination = ({
  onFetch,
}: UseSharedTablePaginationOptions = {}) => {
  const page = ref(1)
  const pageCount = ref(1)

  const onUpdatePage = (nextPage: number) => {
    page.value = nextPage
    onFetch?.()
  }

  const paginationProps = toReactive({ page, pageCount, onUpdatePage })

  const reset = () => {
    page.value = 1
    pageCount.value = 1
  }

  return {
    paginationProps,
    reset,
  }
}
