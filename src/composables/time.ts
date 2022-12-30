import { format, getDate, getDayOfYear, getDaysInMonth, getDaysInYear, startOfDay } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatTime(time: string | undefined, fms = 'yyyy-MM-dd HH:mm') {
  try {
    if (!time)
      return ''
    return format(new Date(time), fms, { locale: zhCN })
  }
  catch {
    console.error('时间格式化失败=>', time)
    return undefined
  }
}

export function formateToLocale(time: string) {
  return formatTime(time, 'yyyy 年 MM 月 dd 日 HH:mm')
}
export function formateToLocaleHasWeek(time: string) {
  return formatTime(time, 'yyyy 年 MM 月 d 日 cccc')
}

export function getOutOfDate(time: Date) {
  return (time.getTime() - startOfDay(time).getTime()) / (24 * 60 * 60 * 10)
}
export function getOutOfYear(date: Date) {
  return getDayOfYear(date) / getDaysInYear(date) * 100
}
export function getOutOfMouth(date: Date) {
  return getDate(date) / getDaysInMonth(date) * 100
}
export const useUnionNumber = (function () {
  let idx = 1
  return () => {
    return idx++
  }
})()
