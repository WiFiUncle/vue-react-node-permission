import { Message, MessageBox } from 'element-ui'

/**
 * @param msg
 * @param type
 */
const showStatusMsg = function (msg = '请指明操作！', type = 'error') {
  Message({
    message: msg,
    type: type
  })
}
/**
 * 普通消息
 */
const showMsg = function (msg = '提示消息') {
  Message(msg)
}
const showWarnMsg = function (msg = '警告消息') {
  showStatusMsg(msg, 'warn')
}
/***
 * 操作成功
 * @param msg
 * @param type
 */
const showSuccessMsg = function (msg = '操作成功', type = 'success') {
  showStatusMsg(msg, type)
}
/**
 * 操作失败
 */
const showFailMsg = function (msg = '操作失败', type = 'error') {
  showStatusMsg(msg, type)
}
/***
 * 请求后台数据失败
 * @param msg
 * @param error
 */
const reqFailMsg = function (msg = '操作失败！', error) {
  if (error) {
    msg = error && error.msg ? error.msg : msg
    showFailMsg(msg)
  }
}

export default {
  showMsg,
  showWarnMsg,
  showStatusMsg,
  showSuccessMsg,
  showFailMsg,
  reqFailMsg,
  Log (logInfo, flag) {
    console.log(logInfo)
  },
  /**
   * 确认框
   * @param options
   * @returns {Promise}
   */
  Confirm (options = {}) {
    options.tips = options.tips || '此操作将永久删除, 是否继续?'
    options.title = options.title || '提示'
    options.confirmBtn = options.confirmBtn || '确定'
    options.cancelBtn = options.cancelBtn || '取消'
    options.type = options.type || 'warning'
    return new Promise((resolve, reject) => {
      MessageBox.confirm(options.tips, options.title, {
        confirmButtonText: options.confirmBtn,
        cancelButtonText: options.cancelBtn,
        type: options.type
      }).then((rsp) => {
        resolve(rsp)
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消'
        })
      })
    })
  }
}
