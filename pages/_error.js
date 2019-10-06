import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Page from '../layouts/Page'

const statusCodes = {
  400: '抱歉，这是个错误的请求',
  404: '糟糕，这个页面可能被外星人带走了',
  401: '暂无权限',
  500: '服务器内部错误',
  501: '服务器不支持实现此请求所需的功能'
}

export default class Error extends React.Component {
  static displayName = 'ErrorPage'

  static getInitialProps ({ res, err, query }) {
    if (query.err) {
      res = null
    }
    err = err || query.err
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    const title = statusCodes[statusCode] || '发生意外的错误'

    return (
      <Page header={null}>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <title>
            {statusCode} - {title}
          </title>
        </Head>
        <div style={styles.error}>
          <div>
            <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
            {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
            <div style={styles.desc}>
              <h2 style={styles.h2}>{title}.</h2>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

if (process.env.NODE_ENV !== 'production') {
  Error.propTypes = {
    statusCode: PropTypes.number
  }
}

const styles = {
  error: {
    color: '#000',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: 620,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },

  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
}
