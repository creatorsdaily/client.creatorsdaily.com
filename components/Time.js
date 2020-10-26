import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

day.extend(relativeTime)
day.locale('zh-cn')

const Time = ({ time, format }) => {
  if (format || day(Date.now()).subtract(new Date(time)).unix() / 60 / 60 / 24 > 3) {
    return day(time).format(format || 'YYYY-MM-DD HH:mm')
  }
  return day(time).fromNow()
}

export default Time
