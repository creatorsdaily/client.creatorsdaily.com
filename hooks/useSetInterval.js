import { useEffect, useRef } from 'react'

const useSetInterval = (callback, delay) => {
  if (!(callback instanceof Function)) {
    throw new Error('callback 参数必须是函数！')
  }
  if (!(delay === null || typeof delay === 'number')) {
    throw new Error('delay 必须是 null 或者数字！')
  }
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return
    }
    let id = null
    const tick = () => {
      const returnValue = savedCallback.current()
      if (returnValue) {
        if (returnValue instanceof Function) {
          returnValue()
        } else {
          throw new Error('返回值必须是函数！')
        }
        clearTimeout(id)
        return
      }
      id = setTimeout(tick, delay)
    }
    id = setTimeout(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
export default useSetInterval
