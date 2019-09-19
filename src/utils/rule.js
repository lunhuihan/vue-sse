
import validate from 'utils/validate'
const phoneValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
    return false
  }
  if (!validate.isPhone(value)) {
    callback(new Error('请输入正确的手机号'))
    return false
  }
  callback()
}
const name = { required: true, message: '请输入用户姓名' }
const phone = { validator: phoneValidator }
const code = { required: true, message: '请输入6位验证码', len: 6 }

export default {
  name,
  phone,
  code,
  phoneValidator
}