import { useEffect, useState } from 'react'
import axios from 'axios'
import useViewer from '../hooks/useViewer'

export default ({ ...rest }) => {
  const [url, setUrl] = useState()
  const { viewer } = useViewer()
  if (!viewer || !viewer.token) return null
  useEffect(() => {
    axios.get(`${process.env.API}/auth/wxaticket`, {
      headers: {
        authorization: `Bearer ${viewer.token}`
      },
      responseType: 'blob'
    }).then(({ data }) => {
      setUrl(URL.createObjectURL(data))
    })
  }, [])
  return (
    <img src={url} {...rest} />
  )
}
