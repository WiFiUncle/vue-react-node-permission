/**
 * Created By WiFi ON 2019/03/15 08:12
 * 基本配置文件
 */
const DEBUG = 0
const SERVER_URL = [
  'http://localhost:8082',
  'http://localhost:3000'
][DEBUG]

export const BASE_CONFIG = {
  SERVER_URL,
  PROJECT_NAME: '权限控制demo'
}
