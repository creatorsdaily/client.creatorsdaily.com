import QRCode from 'qrcode'

export default async (req, res) => {
  const { id } = req.query
  QRCode.toFileStream(res, `${process.env.NEXT_PUBLIC_INDEX}/${id}?from=qrcode`, {
    margin: 0,
    width: 128
  })
}
