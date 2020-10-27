import { useEffect, useRef, useState } from 'react'

const useTimer = (callback) => {
  if (!(callback instanceof Function)) {
    throw new Error('callback 参数必须是函数！')
  }
  const [count, setCount] = useState(0)
  const savedCallback = useRef()
  const savedCounter = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    savedCounter.current = { count, setCount }
  }, [])

  return () => {
    const timer = setInterval(() => {
      setCount(count => {
        const returnValue = savedCallback.current(count + 1)
        if (returnValue) {
          if (returnValue instanceof Function) {
            returnValue()
          } else {
            throw new Error('返回值必须是函数！')
          }
          return clearInterval(timer)
        }
        return count + 1
      })
    }, 1000)
    return timer
  }
}
export default useTimer
