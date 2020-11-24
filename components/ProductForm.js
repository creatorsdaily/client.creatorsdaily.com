import { Button, Checkbox, Form, Input, Radio } from 'antd'
import noop from 'lodash/noop'
import formError from '../libs/form-error'
import TopicSelect from './TopicSelect'
import Editor from './Editor.dynamic'
import MediaUploader from './MediaUploader'
import ProductMedias from './ProductMedias'
import { Inputs } from './ProductLinks'

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

const ProductForm = ({
  form, topics,
  showButton = false, step = 'all',
  renderFooter = noop,
  initialValues = {},
  ...rest
}) => {
  const { getFieldValue, setFieldsValue } = form
  const handleCreate = ({ id }) => {
    const topics = getFieldValue('topics') || []
    setFieldsValue({
      topics: [...topics, id]
    })
  }
  const handleIconError = error => {
    formError(form, error, 'icon')
  }
  const handleQRCodeError = error => {
    formError(form, error, 'miniProgramQRCode')
  }
  const renderQRCode = () => {
    const isMiniProgram = getFieldValue('isMiniProgram')
    return (
      <Item
        name='miniProgramQRCode'
        label='小程序码'
        colon={false}
        style={{ display: isMiniProgram ? 'block' : 'none' }}
      >
        <MediaUploader onError={handleQRCodeError} />
      </Item>
    )
  }
  const renderStep1 = () => {
    if (step !== 1 && step !== 'all') return null
    return (
      <>
        <Item
          name='links'
          label='链接地址'
          colon={false}
          extra='建议填写 AppStore / GooglePlay 链接，支持自动填充'
          rules={[{
            transform (v) {
              return v.filter(x => !!x)
            },
            async validator (rule, value) {
              if (!Array.isArray(value)) {
                throw new Error('链接地址必须为数组')
              } else if (value.length && value.some(x => !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(x))) {
                throw new Error('地址格式不正确！')
              }
            }
          }]}
        >
          <Inputs placeholder='产品的访问链接' />
        </Item>
        <Item
          name='name'
          label='名称'
          colon={false}
          rules={[{
            required: true,
            async validator (rule, value) {
              if (!value) {
                throw new Error('产品名称不能为空')
              } else if (strlen(value) > 30) {
                throw new Error('产品名称太长')
              }
            }
          }]}
        >
          <Input placeholder='输入要推荐的产品名称' />
        </Item>
        <Item
          name='isMiniProgram'
          label='是否有微信小程序？'
          colon={false}
        >
          <Radio.Group>
            <Radio value>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Item>
        {renderQRCode()}
      </>
    )
  }
  const renderStep2 = () => {
    if (step !== 2 && step !== 'all') return null
    return (
      <>
        <Item
          name='icon'
          label='图标'
          colon={false}
        >
          <MediaUploader onError={handleIconError} />
        </Item>
        <Item
          name='description'
          label='简介'
          colon={false}
        >
          <Input placeholder='一句话介绍' />
        </Item>
        <Item
          name='topics'
          label='话题'
          colon={false}
          rules={[{
            type: 'array',
            max: 5,
            message: '每个产品最多添加 5 个话题！'
          }]}
        >
          <TopicSelect onCreate={handleCreate} />
        </Item>
      </>
    )
  }
  const renderStep3 = () => {
    if (step !== 3 && step !== 'all') return null
    return (
      <>
        <Item
          name='medias'
          label='产品图片'
          colon={false}
        >
          <ProductMedias height={160} />
        </Item>
        <Item
          name='content'
          label='产品详情'
          colon={false}
        >
          <Editor placeholder='详细介绍' />
        </Item>
        {step === 3 && (
          <Item name='isCreator' valuePropName='checked' label='创造者' colon={false}>
            <Checkbox>我是这个产品的创造者</Checkbox>
          </Item>
        )}
      </>
    )
  }
  return (
    <Form
      {...rest}
      form={form}
      initialValues={{
        isMiniProgram: false,
        isCreator: false,
        ...initialValues
      }}
      hideRequiredMark
      layout='vertical'
    >
      {renderStep1()}
      {renderStep2()}
      {renderStep3()}
      {renderFooter()}
      {showButton && (
        <Item>
          <Button type='primary' block htmlType='submit'>确定</Button>
        </Item>
      )}
    </Form>
  )
}
export default ProductForm
