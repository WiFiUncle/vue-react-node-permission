const SUCCESS_CODE = 0;
const MSG = "获取成功"
module.exports = {
  getResult: () => {
    return JSON.parse(JSON.stringify({
      status: SUCCESS_CODE,
      message: MSG,
      data: null,
      createTime: new Date(),
    }))
  }
}
