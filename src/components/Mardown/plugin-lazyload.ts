import type { BytemdPlugin } from 'bytemd'
import { resizeImgUrl } from '~/composables'
// function addObserver(el: HTMLElement) {
//   const ob = new IntersectionObserver((elements) => {
//     elements.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const img = entry.target as HTMLImageElement
//         console.log(img)
//         // if (!img.dataset.src)
//         //   return
//         img.src = img.dataset.loading || img.dataset.src
//         img.setAttribute('lazy', 'loading')
//         img.onload = () => {
//           img.setAttribute('lazy', 'loaded')
//           ob.unobserve(img)
//         }
//       }
//     })
//   })
//   ob.observe(el)
// }

/**
 * @typedef Options
 *   Configuration (required).
 * @property {string} extname
 *   File extension to use (must start with `.`).
 */

/** @type {import('unified').Plugin<[Options]>} */
export function lazyload() {
  return function dfs(tree: any) {
    const nodes = tree.children
    if (!nodes)
      return
    nodes.forEach((node) => {
      if (node.tagName === 'img') {
        node.properties['data-src'] = resizeImgUrl(node.properties.src, 720)
        node.properties['data-loading'] = resizeImgUrl(node.properties.src, 48)
        node.properties.src = ''
      }
      dfs(node)
    })
  }
}

export default function imageLazyload(): BytemdPlugin {
  return {
    rehype: processor => processor.use(lazyload),
  }
}
