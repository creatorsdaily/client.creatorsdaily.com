import { Button, Form, Input } from 'antd'
import noop from 'lodash/noop'
import TopicSelect from './TopicSelect'

const { Item } = Form

const strlen = (str) => {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

const QuestionForm = ({
  form, topics, loading,
  showButton = false, step = 'all',
  renderFooter = noop,
  ...rest
}) => {
  const { getFieldValue, setFieldsValue } = form
  const handleCreate = ({ id }) => {
    const topics = getFieldValue('topics') || []
    setFieldsValue({
      topics: [...topics, id]
    })
  }
  return (
    <Form
      {...rest}
      form={form}
      hideRequiredMark
      layout='vertical'
    >
      <Item
        name='name'
        label='请提问'
        colon={false}
        rules={[{
          required: true,
          async validator (rule, value) {
            if (!value) {
              throw new Error('问题不能为空')
            } else if (strlen(value) > 60) {
              throw new Error('问题不能太长')
            }
          }
        }]}
      >
        <Input placeholder='最好的 ... 是什么？' size='large' />
      </Item>
      <Item
        name='topics'
        label='选择话题'
        colon={false}
        rules={[{
          type: 'array',
          max: 5,
          message: '每个问题最多添加 5 个话题！'
        }]}
      >
        <TopicSelect onCreate={handleCreate} />
      </Item>
      <Item>
        <Button loading={loading} type='primary' block htmlType='submit'>确定</Button>
      </Item>
    </Form>
  )
}
export default QuestionForm
