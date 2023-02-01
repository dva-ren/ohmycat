export interface Catelog {
  id: string
  type: string
  text: string
  top: number
}

export const useCatalog = () => {
  const anchor = ref<Catelog[]>([])
  const active = ref('')
  nextTick(() => {
    const article = document.querySelector('.markdown-body')!
    const titleDoms = article.querySelectorAll('h1,h2,h3,h4')
    titleDoms.forEach((item, idx) => {
      const h = item.nodeName.substring(0, 2).toLowerCase()
      const id = `${h}-${idx}`
      item.id = id
      anchor.value.push({
        id: `#${id}`,
        type: `catalog-${h}`,
        text: item.textContent || '',
        top: item.offsetTop,
      })
    })
    const addEvent = useThrottleFn(() => {
      const top = document.documentElement.scrollTop
      for (let i = 0; i < anchor.value.length; i++) {
        if (top > anchor.value[i].top)
          active.value = anchor.value[i].id
      }
    }, 100)
    if (anchor.value.length)
      document.body.onscroll = addEvent
  })

  return { anchor, active }
}
