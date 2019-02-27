import moment from 'moment'
import { storages, getDateStr, messy } from 'utils/common'
let dist = storages.get('dist') ? JSON.parse(storages.get('dist')):{}
const resourceTypes = Object.keys(dist.loanSourcesMap || {}).map(item => {
  return {label: dist.loanSourcesMap[item], value: item}
})
const orderStatus = Object.keys(dist.loanOrderStatusEnumMap || {}).map(item => {
  return {label: dist.loanOrderStatusEnumMap[item], value: item}
})
export let repayWayMap = {}
dist.repayDistDTO && dist.repayDistDTO.map(item => {
    repayWayMap[item.datacode] = item.datavalue
    return this
})

const productDTOList = dist.productDTOList || []

const onlyNumAndCode = (rule, value, callback) => {
  var reg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(value) || !value) {
    callback()
  } else {
    callback('身份证号输入不正确')
  }
}

export const formModel = [
  {
    elem: 'radioGroup',
    label: '来源渠道',
    prop: 'loanSources',
    _v: 'value',
    _k: 'label',
    col: 24,
    initialValue: '',
    attrs: {
      buttonStyle: 'solid'
    },
    options: [{label: '全部', value: ''}, ...resourceTypes]
  }, {
    elem: 'radioGroup',
    label: '借款产品',
    prop: 'loanProduct',
    _v: 'datacode',
    _k: 'datavalue',
    initialValue: '',
    col: 24,
    attrs: {
      buttonStyle: 'solid'
    },
    options: [{datacode: '', datavalue: '全部'}, ...productDTOList]
  }, {
    elem: 'radioGroup',
    label: '订单状态',
    prop: 'orderStatus',
    _v: 'value',
    _k: 'label',
    col: 24,
    initialValue: '',
    attrs: {
      buttonStyle: 'solid'
    },
    options: [{label: '全部', value: ''}, ...orderStatus]
  }, {
    elem: 'input',
    label: '订单编号',
    prop: 'orderNo',
    attrs: {
      placeholder: '请输入订单号'
    }
  }, {
    elem: 'input',
    label: '姓名',
    prop: 'customerName',
    attrs: {
      placeholder: '请输入客户姓名'
    }
  }, {
    elem: 'input',
    label: '身份证号',
    prop: 'certNo',
    rules: [
      {
        validator: onlyNumAndCode
      }
    ],
    attrs: {
      placeholder: '请输入身份证号'
    }
  }, {
    elem: 'input',
    label: '手机号',
    prop: 'mobile',
    attrs: {
      placeholder: '请输入手机号'
    }
  }, {
    elem: 'select',
    prop: 'repayWay',
    label: '还款方式',
    _v: 'datacode',
    _k: 'datavalue',
    initialValue: '',
    options: [{datacode: '', datavalue: '全部'}, ...dist.repayDistDTO || []]
  }, {
    elem: 'select',
    prop: 'siteNo',
    label: '所属服务商',
    _v: 'siteCode',
    _k: 'siteName',
    initialValue: '',
    attrs: {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (value, opt) => {
        return opt.props.children.indexOf(value) >= 0 
      }
    },
    options: dist.siteDTOList ? [{siteName: '全部', siteCode: ''}, ...dist.siteDTOList] : [{siteName: '全部', siteCode: ''}]
  }, {
    elem: 'input',
    prop: 'entryAgentName',
    label: '进件人',
    attrs: {
      placeholder: '请输入进件人'
    }
  }, {
    elem: 'dateRange',
    prop: 'applyDate',
    label: '申请日期',
    col: 8,
    initialValue: [moment(getDateStr(-30), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')],
    attrs: {
      placeholder: ['开始日期', '结束日期']
    }
  }
]

export const tableModel = [
  {
    title: '姓名',
    dataIndex: 'customerName',
    width: 100
  }, {
    title: '身份证号',
    dataIndex: 'certNo',
    width: 120,
    render (text, record, index) {
      return text ? messy(text, 'idNumber') : ''
    }
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    width: 100,
    render (text, record, index) {
      return text ? messy(text, 'phone') : ''
    }
  }, {
    title: '申请额度（元）',
    dataIndex: 'applyAmount',
    width: 120
  }, {
    title: '借款期限',
    dataIndex: 'loanTime',
    width: 120
  }, {
    title: '还款方式',
    dataIndex: 'repayWay',
    width: 120,
    render (text, record, index) {
      return text ? repayWayMap[text] : ''
    }
  }, {
    title: '借款产品',
    dataIndex: 'loanProductName',
    width: 150
  }, {
    title: '来源渠道',
    dataIndex: 'loanSources',
    width: 150
  }, {
    title: '进件人',
    dataIndex: 'entryAgentName',
    width: 100
  }, {
    title: '所属服务商',
    dataIndex: 'siteName',
    width: 120
  }, {
    title: '进件日期',
    dataIndex: 'applyDate',
    width: 150,
    render (val, record, index) {
      return val ? moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }, {
    title: '订单状态',
    dataIndex: 'orderStatusName',
    width: 100
  }
]

// /loanentry/order/list订单列表
export function orderList (params) {
  return global.fetch.post('/loanentry/order/viewlist', params)
}
