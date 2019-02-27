import routes_two from './routes/routes_two'
import routes_one from './routes/routes_one'
const menuList = [
  ...routes_two,
  ...routes_one,
  {
    name: '首页',
    id: 'home',
    path: '/home',
    component: 'Home',
    keyPath: ['home']
  }
]

export default menuList

export let menuMapList = {}
menuList.map(item => {
  if (item.icon) {
    menuMapList[item.id] = item.icon
  }
})

