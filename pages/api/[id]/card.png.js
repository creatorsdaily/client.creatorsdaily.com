import axios from 'axios'

export default async (req, res) => {
  const { id } = req.query
  const { data } = await axios({
    url: `https://puppeteer.creatorsdaily.com/?url=${process.env.NEXT_PUBLIC_INDEX}/api/${id}/card.svg`,
    responseType: 'stream'
  })
  data.pipe(res)
}
