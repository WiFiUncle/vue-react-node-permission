
import User from '@/views/user'
import Menu from '@/views/menu'
import Role from '@/views/role'
export default [{
  path: 'user',
  name: 'user',
  component: User,
  // eslint-disable-next-line standard/object-curly-even-spacing
  meta: { requireAuth: true, title: '用户管理'}
},{
  path: 'menu',
  name: 'menu',
  component: Menu,
  meta: { requireAuth: true, title: '菜单管理'}
},{
    path: 'role',
    name: 'role',
    component: Role,
    // eslint-disable-next-line standard/object-curly-even-spacing
    meta: { requireAuth: true, title: '角色管理'}
}
]
