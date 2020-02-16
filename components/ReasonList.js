import styled from 'styled-components'
import Link from 'next/link'
import UserCell from './UserCell'

const Reason = styled.div`
margin-bottom: 24px;
font-size: 13px;
line-height: 32px;
display: flex;
`

const ReasonTitle = styled.h3`
margin: 16px 0;
`

const UserCellContainer = styled.a`
display: block;
float: left;
margin-right: 12px;
`

export default ({ list = [], positive = false, withOutTitle = false, ...rest }) => {
  const reasons = list.filter(x => x.reason)
  if (!reasons.length) {
    return (<div {...rest} style={{ opacity: 0 }} />)
    // return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
  }
  const reasonList = reasons.map(x => (
    <Reason key={x.id} positive={positive}>
      <Link href='/users/[id]' as={`/users/${x.user.id}`} passHref>
        <UserCellContainer>
          <UserCell user={x.user} />
        </UserCellContainer>
      </Link>
      {x.reason}
    </Reason>
  ))
  const renderTitle = () => {
    if (withOutTitle) return null
    return (
      <ReasonTitle>{positive ? '优点' : '缺点'}</ReasonTitle>
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
