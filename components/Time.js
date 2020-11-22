import day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

day.extend(relativeTime)
day.locale('zh-cn')

const Time = ({ time, format, tag = true, ...rest }) => {
  let str = day(time).fromNow()
  if (format || day(Date.now()).subtract(new Date(time)).unix() / 60 / 60 / 24 > 3) {
    str = day(time).format(format || 'YYYY-MM-DD HH:mm')
  }
  if (tag) {
    return (
      <time dateTime={time} {...rest}>{str}</time>
    )
  }
  return str
}

export default Time
