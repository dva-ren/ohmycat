import { useMainStore } from '~/store'

interface HeaderInfo {
  id: string
  title: string
  type: string
  like?: number
}
const mainStore = useMainStore()

export const useHeaderInfo = (data: HeaderInfo) => {
  const { id, type, title, like } = data
  mainStore.headerInfo.id = id
  mainStore.headerInfo.title = title
  mainStore.headerInfo.type = type
  mainStore.headerInfo.like = like

  return () => {
    console.log('remove')
    mainStore.headerInfo.id = ''
    mainStore.headerInfo.title = ''
    mainStore.headerInfo.type = ''
    mainStore.headerInfo.like = undefined
  }
}
