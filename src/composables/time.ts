import { format, parseISO } from 'date-fns'

export function formatTime(time: string | undefined, fms = 'yyyy-mm-dd HH:mm') {
  if (!time)
    return ''
  return format(parseISO(time), fms)
}
