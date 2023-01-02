import { format, formatRelative, getDate, getDayOfYear, getDaysInMonth, getDaysInYear, startOfDay } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const formatRelativeLocale = {
  lastWeek: '一周前',
  yesterday: '昨天',
  today: '今天',
  tomorrow: '明天',
  nextWeek: '下一周',
  other: 'dd.MM.yyyy',
}
const locale = {
  ...zhCN,
  // formatRelative: token => formatRelativeLocale[token],
}
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

export function relativeTime(time: string) {
  return formatRelative(new Date(time), new Date(), { locale })
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
