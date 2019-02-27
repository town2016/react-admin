import asyncComponent from '../../asyncComponent'
const OrderList = asyncComponent(() => import('../../views/order/orderList'))
const OrderDetail = asyncComponent(() => import('../../views/order/orderDetail'))
export default {
  OrderList,
  OrderDetail
}
