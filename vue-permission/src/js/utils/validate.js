/**
 * Created By wifi_uncle on 2019/12/25
 */
import commonPattern from './commonPattern'
export default {
  telephone: (rule, value, callback) => {
    if (value && !commonPattern.telephone.test(value)) {
      callback(new Error('请输入正确的手机号!'))
    } else {
      callback()
    }
  },
  email: (rule, value, callback) => {
    if (value && !commonPattern.email.test(value)) {
      callback(new Error('请输入正确的邮箱!'))
    } else {
      callback()
    }
  }
}
