const SUCCESS_CODE = 0
const MSG = '操作成功'
const FAIL_CODE = -1
const FAIL_MSG = '操作失败'
class ResultView {
  constructor (status = SUCCESS_CODE, msg = MSG, data = null, error = null) { // constructor是一个构造方法，用来接收参数
    this.status = status
    this.message = msg
    this.data = data
    this.error = error
    this.createTime = new Date()
  }
}
class ResultSuccessView extends ResultView {
  constructor (data = null, msg = MSG) { // 成功/失败关注点不同，故参数个数及顺序做调整
    super()
    this.message = msg
    this.data = data
  }
}
class ResultFailView extends ResultView {
  constructor (status = FAIL_CODE, msg = FAIL_MSG, error = null, data = null) {
    super()
    this.status = status
    this.message = msg
    this.error = error
  }
}

module.exports = {
  ResultView,
  ResultSuccessView,
  ResultFailView
}
