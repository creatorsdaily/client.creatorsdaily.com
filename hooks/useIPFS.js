import { createContext, useContext, useRef } from 'react'

const Context = createContext()

export const IPFSProvider = ({ children, ...rest }) => {
  const ref = useRef()
  if (process.browser && !ref.current) {
    const IPFS = require('ipfs')
    const node = new IPFS()
    ref.current = node
  }
  return (
    <Context.Provider value={ref.current}>
      {children}
    </Context.Provider>
  )
}

export default () => {
  const node = useContext(Context)
  return files => node.add(files)
}
