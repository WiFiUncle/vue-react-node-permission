const SUCCESS_CODE = 0
const MSG = '获取成功'
const FAIL_CODE = -1
const FAIL_MSG = '获取失败'
class ResultView {
  constructor (status = SUCCESS_CODE, msg = MSG, data = null, error = null) { // constructor是一个构造方法，用来接收参数
    this.status = status
    this.message = msg
    this.data = data
    this.error = error
    this.createTime = new Date()
  }
  resultSuccessView (data = null, msg = MSG) { // 成功/失败关注点不同，故参数个数及顺序做调整
    return new ResultView(SUCCESS_CODE, msg, data)
  }
  resultFailView (status = FAIL_CODE, msg = FAIL_MSG, error = null, data = null) {
    return new ResultView(status, msg, data, error)
  }
}
module.exports = ResultView
