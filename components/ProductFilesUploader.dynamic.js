import noop from 'lodash/noop'
import IPFS from 'ipfs'
import useAddProductFiles from '../hooks/useAddProductFiles'
import Uploader from './Uploader'

const node = new IPFS()

export default ({ questionId, id, height = 260, autoSave = false, onUpload = noop }) => {
  const save = useAddProductFiles(id, {
    questionId
  })
  const handleUpload = async (value, type) => {
    if (type === 'urls') {
      save(value, type)
    } else if (type === 'files') {
      const list = await node.add(value)
      if (!autoSave) {
        return onUpload(list)
      }
      save(list, 'keys')
    }
  }
  return (
    <Uploader allowUrl={autoSave} onUpload={handleUpload} height={height} />
  )
}
