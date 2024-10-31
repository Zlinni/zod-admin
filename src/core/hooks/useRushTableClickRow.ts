import { useStorage } from '@vueuse/core'

export enum ClickRowType {
  '默认' = 'default',
  '打开详情' = 'detail',
  '打开编辑' = 'update',
}
type HTMLElementEvent<T extends HTMLElement> = Event & {
  currentTarget: T
}
export const useRushTableClickRow = () => {
  const clickRowType = useStorage('rushTableClickRow', ClickRowType.打开详情)
  const clickRow = (option: { event: Event }) =>
    clickRowType.value !== ClickRowType.默认 &&
    (option.event as HTMLElementEvent<HTMLElement>).currentTarget
      ?.querySelector(`.${clickRowType.value}`)
      ?.dispatchEvent(new Event('click'))
  return {
    clickRow,
    clickRowType,
  }
}
