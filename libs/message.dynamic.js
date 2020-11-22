const message = async (func, ...args) => {
  const { default: message } = await import('antd/lib/message')
  return message[func](args)
}

message.error = (...args) => message('error', ...args)
message.success = (...args) => message('success', ...args)

export default message
