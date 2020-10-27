export default function textSelect (element) {
  const start = 0
  const end = element.value.length
  if (element.createTextRange) {
    // IE浏览器
    var range = o.createTextRange()
    range.moveStart('character', -end)
    range.moveEnd('character', -end)
    range.moveStart('character', start)
    range.moveEnd('character', end)
    range.select()
  } else {
    element.setSelectionRange(start, end)
    element.focus()
  }
}
