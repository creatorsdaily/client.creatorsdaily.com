import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import withApollo from '../../libs/with-apollo'
import WeChat from '../../layouts/WeChat'
import ProductList from '../../queries/ProductList.gql'

const fontFamily = '-apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif'

const styles = {
  container: {
    fontFamily,
    color: 'rgb(58, 65, 69)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '1.75em',
    textAlign: 'left',
    caretColor: 'rgb(58, 65, 69)',
    whiteSpace: 'normal',
    textSizeAdjust: 'auto'
  },
  title: {
    breakInside: 'avoid',
    color: 'rgb(54, 54, 54)',
    lineHeight: '40px',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '24px',
    textAlign: 'center',
    letterSpacing: '0px',
    paddingTop: 22,
    fontFamily
  },
  titleText: {
    fontWeight: 'bold',
    borderBottomWidth: 14,
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(0, 132, 254, 0.5)',
    paddingLeft: 5,
    paddingRight: 5,
    display: 'inline-block',
    lineHeight: '4px',
    color: 'rgb(52, 53, 54)'
  },
  product: {
  },
  productName: {
    breakInside: 'avoid',
    color: 'rgb(54, 54, 54)',
    lineHeight: 1.5,
    fontSize: '18px',
    paddingTop: 30,
    marginBottom: 12,
    fontFamily
  },
  productDescription: {
    marginBottom: 12
  },
  icon: {
    width: 80,
    height: 80
  },
  card: {
    width: '100%'
  }
}

export default withApollo(() => {
  const { data, loading } = useQuery(ProductList, {
    variables: {
      size: 10,
      startTime: 1606231131902,
      endTime: 1606315511896
    }
  })
  const list = get(data, 'getProducts.data', [])
  console.log(list, loading)
  return (
    <WeChat>
      <div style={styles.container}>
        <h2 style={styles.title}>
          <span style={styles.titleText}>
            今日产品
          </span>
        </h2>
        {list.map(x => (
          <section style={styles.product} key={x.id}>
            <h3 style={styles.productName}>{x.name}</h3>
            <div style={styles.productDescription}>{x.description}</div>
            <embed style={styles.card} src={`/api/${x.id}/card.svg`} />
          </section>
        ))}
      </div>
    </WeChat>
  )
})
