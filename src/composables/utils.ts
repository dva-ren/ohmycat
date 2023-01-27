export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function resizeImgUrl(url: string, w?: number, h?: number) {
  return url + (url.includes('?') ? '&' : '?' + `x-oss-process=image/resize${w ? (`,w_${w}`) : ''}${h ? (`,h_${w}`) : ''}`)
}
