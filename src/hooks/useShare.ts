export interface ShareData {
  title: string
  text?: string
  url: string
}

export const useShare = (shareData: ShareData) => {
  if ('share' in navigator)
    navigator.share(shareData)
}
