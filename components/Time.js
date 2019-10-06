import day from 'dayjs'

export default ({ time }) => {
  if (day(Date.now()).subtract(new Date(time)).unix() / 60 / 60 / 24 > 3) {
    return day(time).format('YYYY-MM-DD HH:mm')
  }
  return day(time).fromNow()
}
