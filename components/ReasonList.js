import styled from 'styled-components'
import { Divider } from 'antd'
import Meta from './Meta'

const Reason = styled.div`
margin-bottom: 24px;
font-size: 13px;
line-height: 24px;
&:last-child {
  margin-bottom: 0;
}
`

const ReasonBody = styled.div`
margin-left: 44px;
`

export default ({ list = [], positive = false, withOutTitle = false, ...rest }) => {
  const reasons = list.filter(x => x.reason)
  if (!reasons.length) {
    return (<div {...rest} style={{ opacity: 0 }} />)
    // return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
  }
  const reasonList = reasons.map(x => (
    <Reason key={x.id} positive={positive}>
      <Meta createdAt={x.createdAt} user={x.user} />
      <ReasonBody>{x.reason}</ReasonBody>
    </Reason>
  ))
  const renderTitle = () => {
    if (withOutTitle) return null
    return (
      <Divider orientation='left'>{positive ? '优点' : '缺点'}</Divider>
    )
  }
  return (
    <div {...rest}>
      {renderTitle()}
      {reasonList}
    </div>
  )
  // return reasons.map(x => (
  //   <Comment
  //     key={x.id}
  //     actions={actions}
  //     author={(
  //       <Link href='/users/[id]' as={`/users/${x.user.id}`}>
  //         <a>{x.user.username}</a>
  //       </Link>
  //     )}
  //     avatar={(
  //       <Avatar size="small" />
  //     )}
  //     content={(
  //       <p>{x.reason}</p>
  //     )}
  //   / >
  // ))
}
