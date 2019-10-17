
import User from '@/views/user'
export default [{
  path: '/user',
  name: 'user',
  component: User,
  // eslint-disable-next-line standard/object-curly-even-spacing
  meta: { requireAuth: true, title: '用户管理'}
}]
