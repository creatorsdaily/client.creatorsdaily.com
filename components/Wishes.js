import { Button, List, Tag, Tooltip } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import Link from 'next/link'
import useCreateWishModal from '../hooks/useCreateWishModal'
import { GET_PRODUCT } from '../queries'
import Box from './Box'
import Avatar from './Avatar'
import Time from './Time'
import WishLike from './WishLike'

const StyledBox = styled(Box)`
padding: 16px 16px 4px;
`

const Header = styled.div`
display: flex;
align-items: flex-end;
border-bottom: 1px solid #F0F0F0;
padding-bottom: 16px;
// margin-bottom: 16px;
margin-bottom: 4px;
justify-content: space-between;
align-items: center;
`

const WishCell = styled.div`
display: flex;
align-items: center;
flex: 1;
`

const WishTitle = styled.div`
margin-top: 2px;
display: flex;
h3 {
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
  flex: 1;
  overflow: hidden;
  font-weight: bold;
  font-size: 14px;
}
`

const WishTip = styled.div`
font-size: 12px;
`

const WishAvatar = styled.div`
padding: 2px;
border: 1px solid #F0F0F0;
border-radius: 4px;
`

const WishContent = styled.div`
display: flex;
margin: 0 8px;
flex-direction: column;
flex: 1;
`

const WishMeta = styled.div`
height: 18px;
line-height: 18px;
font-size: 12px;
display: flex;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
> div {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
  flex: 1;
  overflow: hidden;
  display: flex;
}
.ant-tag {
  line-height: 16px;
}
`

const WishUsername = styled.div`
font-size: 12px;
font-weight: bold;
`

const WishSpan = styled.span`
padding: 0 8px;
`

export const wishTypes = {
  BUG: '缺陷',
  FEATURE: '功能'
}

export const wishTypeColors = {
  BUG: '#f50',
  FEATURE: '#2db7f5'
}

export default ({
  productId,
  product
}) => {
  const {
    wishes
  } = product
  const [modal, show] = useCreateWishModal(productId, {
    refetchQueries: () => [{
      query: GET_PRODUCT,
      variables: { id: productId }
    }]
  })
  const wishesList = get(wishes, 'data', [])
  return (
    <StyledBox>
      <Header>
        <WishTip>每一条「新愿」都可能影响产品的发展</WishTip>
        <Button type='primary' icon='plus' onClick={show}>新愿</Button>
      </Header>
      <List
        split={false}
        dataSource={wishesList}
        locale={{
          emptyText: '还没有「新愿」哦，快来提交'
        }}
        renderItem={item => (
          <List.Item key={item.id}>
            <WishCell>
              <WishAvatar>
                <Avatar user={item.user} size={38} />
              </WishAvatar>
              <WishContent>
                <WishMeta>
                  <div>
                    <Tag color={wishTypeColors[item.type]}>
                      {wishTypes[item.type]}
                    </Tag>
                    <WishUsername>{item.user.nickname}</WishUsername>
                    <WishSpan>在</WishSpan>
                    <Time time={item.createdAt} />
                    <WishSpan>提交</WishSpan>
                  </div>
                </WishMeta>
                <Link href='/[id]/wishes/[wishId]' as={`/${productId}/wishes/${item.id}`}>
                  <a>
                    <WishTitle>
                      <h3>{item.title}</h3>
                    </WishTitle>
                  </a>
                </Link>
              </WishContent>
              <Tooltip title='支持这个「新愿」' placement='left'>
                <div>
                  <WishLike id={item.id} isLike={item.isLike} likeCount={item.likeCount} />
                </div>
              </Tooltip>
            </WishCell>
          </List.Item>
        )}
      />
      {modal}
    </StyledBox>
  )
}
