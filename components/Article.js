import styled from 'styled-components'

export default styled.div`
color: rgba(0, 0, 0, 0.75);
font-size: 16px;
line-height: 1.6;

p img {
  max-width: 68%;
  max-height: 500px;
  display: block;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

pre, code {
  font-size: 14px;
  font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
  margin: auto 0;
}

code {
  white-space: pre-wrap;
  border-radius: 2px;
  display: inline;
}

pre {
  font-size: 15px;
  line-height: 1.4em;
  display: block !important;
}

pre code {
  white-space: pre;
  overflow: auto;
  border-radius: 3px;
  padding: 1px 1px;
  display: block !important;
}

strong, b{
  color: #FF992A;
}

em, i {
  color: #606060;
}

hr {
  border-top: 1px solid #DE7B76;
  margin: 1.5em 0;
}

p {
  margin: 1.2em 0;
}

table, pre, dl, blockquote, q, ul, ol {
  margin: 10px 0;
}

ul, ol {
  padding-left: 15px;
}

li {
  margin: 10px;
}

li p {
  margin: 10px 0 !important;
}

ul ul, ul ol, ol ul, ol ol {
  margin: 0;
  padding-left: 10px;
}

ul {
  list-style-type: circle;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 1em;
  font-weight: bold;
  font-style: italic;
}

dl dd {
  margin: 0 0 10px;
  padding: 0 10px;
}

blockquote, q {
  border-left: 3px solid #DE7B76;
  padding: 0 10px;
  color: #606060;
  quotes: none;
  margin: 20px 0;
  padding: 1px 0 1px 10px;
  background: rgba(158, 158, 158, 0.1);
  p {
    margin: 10px;
  }
}

blockquote::before, blockquote::after, q::before, q::after {
  content: none;
}

h1, h2, h3, h4, h5, h6 {
  padding: 0;
  font-style: bold !important;
  color: rgba(0, 0, 0, 0.9);
  margin: 1.5em 0;
  padding: 0.5em 0 !important;
}

h1 {
  font-size: 24px !important;
  text-align: center;
}

h2 {
  font-size: 20px !important;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
  border-left: 5px solid #DE7B76;
  padding: 0 0.5em !important;
}


table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  font: inherit;
  border: 0;
  margin: 0 auto;
}

tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #CCC;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

table tr th, table tr td {
  font-size: 16px;
  border: 1px solid #CCC;
  margin: 0;
  padding: 5px 10px;
}

table tr th {
  font-weight: bold;
  color: #eee;
  border: 1px solid #DE7B76;
  background-color: #DE7B76;
}
`
