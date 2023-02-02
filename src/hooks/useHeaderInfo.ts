import { useMainStore } from '~/store'

interface HeaderInfo {
  id: string
  title: string
  type: string
  like?: number
}

export const useHeaderInfo = (data: HeaderInfo) => {
  const mainStore = useMainStore()
  const { id, type, title, like } = data
  mainStore.headerInfo.id = id
  mainStore.headerInfo.title = title
  mainStore.headerInfo.type = type
  mainStore.headerInfo.like = like

  return () => {
    mainStore.headerInfo.id = ''
    mainStore.headerInfo.title = ''
    mainStore.headerInfo.type = ''
    mainStore.headerInfo.like = undefined
  }
}
