export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function resizeImgUrl(url: string, w?: number, h?: number) {
  try {
    const u = new URL(url)
    u.searchParams.set('x-oss-process', `image/resize${w ? (`,w_${w}`) : ''}${h ? (`,h_${w}`) : ''}`)
    return u.toString()
  }
  catch (e) {
    console.error('resizeImgUrl=>', e)
    return url
  }
}
