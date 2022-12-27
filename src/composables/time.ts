import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatTime(time: string | undefined, fms = 'yyyy-MM-dd HH:mm') {
  if (!time)
    return ''
  return format(new Date(time), fms, { locale: zhCN })
}

export function formateToLocale(time: string) {
  return formatTime(time, 'yyyy 年 MM 月 dd 日 HH:mm')
}
