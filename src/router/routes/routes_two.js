export default [
  {
    name: '订单管理',
    id: 'orderList',
    path: '/orderList',
    component: 'OrderList',
    icon: 'profile',
    keyPath: ['home','orderList']
  }, {
    name: '订单详情',
    id: 'orderDetail',
    path: '/orderDetail/:orderCode',
    component: 'OrderDetail',
    keyPath: ['home','orderList','orderDetail']
  }
]