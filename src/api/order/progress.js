import moment from 'moment'
export const tableModel = [
  {
    title: '开始时间',
    dataIndex: 'startTime',
    render (val, record, index) {
      return val ? moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }, {
    title: '结束时间',
    dataIndex: 'endTime',
    render (val, record, index) {
      return val ? moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }, {
    title: '状态',
    dataIndex: 'finishStatus',
    render (val, record, index) {
      return val === 1 ? '已完成' : val === 0 ? '进行中' : ''
    }
  }
]

// /loanentry/order/getProcessListByOrderNo 根据订单号查询订单进度列表
export function getProcessListByOrderNo(params) {
  return fetch.post('/loanentry/order/getProcessListByOrderNo', params)
}
