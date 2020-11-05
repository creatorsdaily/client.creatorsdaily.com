import React from 'react'
import Head from 'next/head'
import Page from '../layouts/Page'

export default function Custom404 () {
  const title = '糟糕，这个页面可能被外星人带走了'
  return (
    <Page header={null}>
      <Head>
        <title>
          404 - {title}
        </title>
      </Head>
      <div style={styles.error}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
          <h1 style={styles.h1}>404</h1>
          <div style={styles.desc}>
            <h2 style={styles.h2}>{title}。</h2>
          </div>
        </div>
      </div>
    </Page>
  )
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
    lineHeight: '55px',
    height: '55px',
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
