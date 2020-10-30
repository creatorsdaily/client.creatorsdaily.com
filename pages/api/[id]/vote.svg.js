import get from 'lodash/get'
import { gql } from '@apollo/client'
import initApollo from '../../../libs/init-apollo'
import { blue } from '../../../libs/colors'

export const GET_PRODUCT = gql`
query($id: String!) {
  product(id: $id) {
    id
    name
    likeCount
  }
}
`

export default async (req, res) => {
  const apollo = initApollo()
  res.setHeader('Content-Type', 'image/svg+xml')
  res.statusCode = 200
  const { id, theme = 'light' } = req.query
  const radius = Number(req.query.radius) || 10
  const data = await apollo.query({
    query: GET_PRODUCT,
    variables: {
      id
    }
  })
  const product = get(data, 'data.product')
  if (!product) return res.statusCode(404).end()
  const color = theme === 'dark' ? '#FFFFFF' : blue
  const titleColor = theme === 'dark' ? '#FFFFFF' : '#505050'
  const tipColor = theme === 'dark' ? '#FFFFFF' : '#707070'
  const backgroundColor = theme === 'dark' ? '#24273f' : '#F5F5F5'
  const strokeColor = theme === 'dark' ? '#000000' : '#FFFFFF'
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="250px" height="54px" viewBox="0 0 250 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>创造者日报</title>
    <desc>点击为产品投票！</desc>
    <linearGradient x1="17.7452741%" y1="84.4896185%" x2="76.898702%" y2="22.7107947%" id="linearGradient-1">
        <stop stop-color="#E95952" offset="0%"></stop>
        <stop stop-color="#EC735E" offset="9%"></stop>
        <stop stop-color="#F08C6A" offset="21%"></stop>
        <stop stop-color="#F29F72" offset="33%"></stop>
        <stop stop-color="#F4A977" offset="45%"></stop>
        <stop stop-color="#F4AD79" offset="59%"></stop>
        <stop stop-color="#F1B38A" offset="78%"></stop>
        <stop stop-color="#EDBDA3" offset="100%"></stop>
    </linearGradient>
    <linearGradient x1="99.9988381%" y1="49.9987193%" x2="2.99996514%" y2="49.9987193%" id="linearGradient-2">
        <stop stop-color="#DE7B76" offset="0%"></stop>
        <stop stop-color="#E36A64" offset="31%"></stop>
        <stop stop-color="#E85D57" offset="66%"></stop>
        <stop stop-color="#E95952" offset="100%"></stop>
    </linearGradient>
    <linearGradient x1="2.98985685e-14%" y1="49.9959344%" x2="100.001045%" y2="49.9959344%" id="linearGradient-3">
        <stop stop-color="#E95952" offset="0%"></stop>
        <stop stop-color="#EB6859" offset="9%"></stop>
        <stop stop-color="#F0906A" offset="34%"></stop>
        <stop stop-color="#F19A6F" offset="41%"></stop>
        <stop stop-color="#F3A876" offset="56%"></stop>
        <stop stop-color="#F4AD79" offset="69%"></stop>
        <stop stop-color="#F1B38A" offset="83%"></stop>
        <stop stop-color="#EDBDA3" offset="100%"></stop>
    </linearGradient>
    <linearGradient x1="3.24211406e-14%" y1="50.0034177%" x2="99.9990961%" y2="50.0034177%" id="linearGradient-4">
        <stop stop-color="#E95952" offset="0%"></stop>
        <stop stop-color="#ED7A5F" offset="53%"></stop>
        <stop stop-color="#EE8263" offset="58%"></stop>
        <stop stop-color="#F19A6F" offset="73%"></stop>
        <stop stop-color="#F3A876" offset="88%"></stop>
        <stop stop-color="#F4AD79" offset="100%"></stop>
    </linearGradient>
    <g id="Page-6" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard">
            <g id="featured">
                <rect stroke="${strokeColor}" fill="${backgroundColor}" fill-rule="nonzero" x="0.5" y="0.5" width="249" height="53" rx="${radius}"></rect>
                <g id="Group" transform="translate(53.000000, 11.000000)" fill="${tipColor}" font-family="PingFangSC, PingFang SC" font-size="10" font-weight="500">
                    <text id="vote">
                        <tspan x="0" y="10">为「${product.name.length > 10 ? `${product.name.slice(0, 9)}...` : product.name}」投票</tspan>
                    </text>
                </g>
                <g id="Group" transform="translate(52.000000, 22.000000)" fill="${titleColor}" font-family="PingFangSC, PingFang SC" font-size="16" font-weight="500">
                  <text id="创造者日报">
                    <tspan x="0" y="19">创造者日报</tspan>
                  </text>
                </g>
                <g id="Group" transform="translate(210.000000, 13.000000)" fill="${color}">
                    <g>
                        <polygon id="Shape" fill-rule="nonzero" points="17.0024997 10 6 10 11.5012498 0"></polygon>
                        <text id="like-count" font-family="Helvetica-Bold, Helvetica" font-size="13" font-weight="bold">
                          <tspan x="${[0, 7.9, 4.8, 1][product.likeCount.toString().length]}" y="27">${Math.min(product.likeCount, 999)}</tspan>
                        </text>
                    </g>
                </g>
                <g id="原图标" transform="translate(11.000000, 12.000000)">
                    <g id="图形组">
                        <path d="M26.4556659,19.7735214 C25.5738069,18.8960597 24.3793721,18.4050464 23.1353457,18.4085901 C21.8913193,18.4121337 20.6997012,18.9099439 19.8228555,19.7924153 C18.6796302,20.9490822 17.1196426,21.5979634 15.4933521,21.5932844 C12.127088,21.5932844 9.38852144,18.8543679 9.38852144,15.4874041 C9.38852144,12.1204402 12.127088,9.3815237 15.4933521,9.3815237 C17.1135137,9.37711062 18.6681057,10.0210461 19.8106095,11.1697968 C20.2355467,11.5955013 20.738678,11.9351595 21.2923815,12.1701242 C21.1578397,11.7026146 20.991848,11.2447348 20.7955418,10.7996163 C19.1111851,6.9858465 15.2974153,4.32670429 10.862246,4.32670429 C5.38476298,4.32670429 0.855474041,8.38539503 0.115112867,13.6595937 C0.0505233402,14.2147105 0.0154852023,14.772868 0.0101467269,15.3317043 C0.0101467269,15.3621445 0.0101467269,15.3925847 0.0122460497,15.4230248 C0.0122460497,15.3925847 0.0122460497,15.3621445 0.0101467269,15.3317043 C0.0101467269,15.3834876 0.00804740406,15.4366704 0.00804740406,15.4870542 C0.00804740406,19.6237698 1.61752822,23.5131151 4.54363431,26.4385214 C7.46974041,29.3639278 11.3573363,30.9748081 15.4933521,30.9748081 C19.6167644,30.978717 23.5706385,29.3341039 26.4749097,26.4070316 C28.3010202,24.5697729 28.2924054,21.6001543 26.4556659,19.7735214 Z" id="Shape" fill="url(#linearGradient-1)" fill-rule="nonzero"></path>
                        <path d="M10.862246,4.32705418 C15.2974153,4.32705418 19.1111851,6.98619639 20.7955418,10.7999661 C20.991848,11.2450847 21.1578397,11.7029645 21.2923815,12.170474 C23.3594121,13.0487782 25.7589702,12.3386392 27.015086,10.4768641 C28.2712019,8.61508894 28.0313528,6.12417569 26.44307,4.53628668 C23.5183634,1.60948081 19.6286682,0 15.4933521,0 C11.3580361,0 7.46834086,1.60948081 4.54363431,4.53628668 C2.05418736,7.02608352 0.51748307,10.214605 0.115112867,13.6599436 C0.855474041,8.38574492 5.38476298,4.32705418 10.862246,4.32705418 Z" id="Shape" fill="url(#linearGradient-2)" fill-rule="nonzero"></path>
                        <path d="M26.4556659,19.7735214 C26.3891874,19.7073928 26.3209594,19.6444131 26.2516817,19.5831828 C24.3910064,17.9404075 21.572392,18.0324489 19.8228555,19.7931151 C18.6796302,20.949782 17.1196426,21.5986632 15.4933521,21.5939842 C12.127088,21.5939842 9.38852144,18.8550677 9.38852144,15.4881038 C9.38852144,12.139684 12.0973476,9.41266366 15.4384199,9.38292325 L15.4121783,9.38292325 C9.4168623,9.38292325 4.55658014,14.216614 4.55658014,20.1793905 C4.55658014,25.9815688 9.1586456,30.7137923 14.9303837,30.9646614 C15.1039278,30.9709594 15.2778217,30.9745749 15.4520655,30.9755079 L15.4933521,30.9755079 C19.6168655,30.9792317 23.570754,29.3343607 26.4749097,26.4070316 C28.3010202,24.5697729 28.2924054,21.6001543 26.4556659,19.7735214 Z" id="Shape" fill="url(#linearGradient-3)" fill-rule="nonzero"></path>
                        <path d="M19.8228555,19.7924153 C18.6796302,20.9490822 17.1196426,21.5979634 15.4933521,21.5932844 C12.3832054,21.5932844 9.80873589,19.2549887 9.43505643,16.2435102 C9.81748307,21.892088 14.5196163,26.3552483 20.2651129,26.3552483 C23.0934263,26.3588096 25.8106863,25.254699 27.834921,23.2793905 C27.9111058,21.3477043 26.7938538,19.5672989 25.02131,18.7957392 C23.2487662,18.0241795 21.1843819,18.4196701 19.8225056,19.7917156 L19.8228555,19.7924153 Z" id="Shape" fill="url(#linearGradient-4)" fill-rule="nonzero"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`)
}
