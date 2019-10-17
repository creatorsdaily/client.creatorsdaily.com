import day from 'dayjs'

export default ({ time, format }) => {
  if (format || day(Date.now()).subtract(new Date(time)).unix() / 60 / 60 / 24 > 3) {
    return day(time).format(format || 'YYYY-MM-DD HH:mm')
  }
  return day(time).fromNow()
}
