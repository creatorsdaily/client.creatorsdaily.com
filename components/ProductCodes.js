import { Button, List, Modal, Popconfirm, Result, Tooltip } from 'antd'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { GiftOutlined } from '@ant-design/icons'
import useCreateCodeModal from '../hooks/useCreateCodeModal'
import { userFragment } from '../queries'
import ProductDetail from '../queries/ProductDetail.gql'
import graphqlError from '../libs/graphql-error'
import message from '../libs/message.dynamic'
import Box from './Box'
import Time from './Time'
import UserCell from './UserCell'

const StyledBox = styled(Box)`
padding: 16px 16px 4px;
margin-bottom: 24px;
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

const CodeCell = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex: 1;
`

const CodeTip = styled.div`
font-size: 12px;
`

const CodeContent = styled.div`
font-weight: bold;
font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
flex: 1;
width: 0;
margin-right: 12px;
${({ received }) => received ? 'color: #AAA; text-decoration: line-through;' : ''}
div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
`

const CodeTitle = styled.div`
font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`

const CodeButton = styled.div`
width: 140px;
`

const RECEIVE_CODE = gql`
mutation($productId: String!, $id: String) {
  receiveCode(productId: $productId, id: $id) {
    id
    code
    redeemer {
      ${userFragment}
    }
  }
}
`

const ProductCodes = ({
  productId,
  product
}) => {
  const {
    codes = []
  } = product
  const [modal, show] = useCreateCodeModal(productId, {
    refetchQueries: () => [{
      query: ProductDetail,
      variables: { id: productId }
    }]
  })

  const [receive, { loading }] = useMutation(RECEIVE_CODE, {
    onCompleted: ({ receiveCode }) => {
      Modal.info({
        okText: '关闭',
        className: 'preview-modal',
        maskClosable: true,
        autoFocusButton: null,
        width: 500,
        icon: null,
        content: (
          <Result
            status='success'
            title={(<CodeTitle>{receiveCode.code}</CodeTitle>)}
            subTitle='恭喜你，兑换码领取成功，每个用户仅可领取一次，请珍惜使用。'
          />
        )
      })
    },
    onError: error => {
      const err = graphqlError(error)[0]
      message.error(err.message)
    }
  })
  const redeemCount = codes.filter(x => !x.redeemer)
  const tip = codes.length ? `创造者提供了 ${codes.length} 个兑换码，还有 ${redeemCount.length} 个未领取` : '创造者还没有提供兑换码'
  const confirm = id => {
    receive({
      variables: {
        productId,
        id
      }
    })
  }
  const renderButton = item => {
    if (item.redeemer) {
      return (
        <Tooltip title={`领取于${Time({ time: item.redeemedAt })}`} placement='left'>
          <UserCell user={item.redeemer} />
        </Tooltip>
      )
    }
    return (
      <Popconfirm
        title='每个用户仅可领取一次，确认领取？'
        onConfirm={() => confirm(item.id)}
        placement='left'
      >
        <Button icon={<GiftOutlined />} block>领取</Button>
      </Popconfirm>
    )
  }
  return (
    <StyledBox>
      <Header>
        <CodeTip>{tip}</CodeTip>
        <Button type='primary' icon={<PlusOutlined />} onClick={show}>兑换码</Button>
      </Header>
      <List
        loading={loading}
        split={false}
        dataSource={codes}
        locale={{
          emptyText: '产品还没有兑换码，为你的忠实用户发布一些吧'
        }}
        renderItem={item => (
          <List.Item key={item.id}>
            <CodeCell>
              <CodeContent received={!!item.redeemer}>
                <div>{item.code}</div>
              </CodeContent>
              <CodeButton>
                {renderButton(item)}
              </CodeButton>
            </CodeCell>
          </List.Item>
        )}
      />
      {modal}
    </StyledBox>
  )
}
export default ProductCodes
