// /**
//  * Created By WiFi ON 2018/9/12 14:44
//  */
export const menus = [
  {
    'id': '8a80169a65cb8de70165cc47831e0000',
    'leaf': true,
    'code': 'm_sys_user',
    'name': '用户列表',
    'icon': 'el-icon-setting',
    'link': '/view/user',
    'type': 1,
    'role': ['ADMIN']

  }, {
    'id': '8a80169a660e3e6901660e82a7720000',
    'leaf': true,
    'code': 'm_user_role',
    'name': '角色管理',
    'icon': 'el-icon-goods',
    'link': '/view/role',
    'type': 1
  }, {
    'id': '8a80169a660e3e6901660e82a7720000',
    'leaf': true,
    'code': 'm_user_school',
    'name': '场景管理',
    'icon': 'el-icon-goods',
    'link': '/view/school',
    'type': 1,
    'role': ['ADMIN']

  }
]
window.menus = menus
