import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Iform from '../../components/iform/iform'
import { formModel, tableModel, orderList } from 'api/order/orderList'
import { Table, Pagination, Spin, message } from 'antd'
import 'less/order/order.less'
import { deleteEmptyAttr, storages } from 'utils/common'
import { conditionInfoList } from 'api/layout'
import moment from 'moment'
// 表格设置

class OrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryForm: null,
      tableData: [],
      pagination: { current: 1, total: 0, pageSize: 10 },
      tableProps: {
        bordered: true,
        scroll: {x: 1800},
        pagination: false
      },
      spinning: false,
      pageSpinning: false,
      querys: {},
      iform: null
    }
  }
  
  // 拉取订单列表
  _orderList () {
    var startDealTime = this.state.querys.applyDate ? this.state.querys.applyDate[0] : ''
    var endDealTime = this.state.querys.applyDate ? this.state.querys.applyDate[1] : ''
    endDealTime = moment(new Date(endDealTime)).format('YYYY-MM-DD')
    endDealTime = new Date(endDealTime)
    endDealTime = new Date(new Date(endDealTime).getTime() + 24 * 60 * 60 * 1000 - 1)
    var params = {
      pageNum: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      startDealTime: startDealTime,
      endDealTime: endDealTime,
      ...this.state.querys
    }
    delete params.applyDate
    deleteEmptyAttr(params)
    this.setState({
      spinning: true
    })
    orderList(params).then(res => {
      var pagination = this.state.pagination
      pagination.total = res.data.total
      this.setState({
        tableData: res.data.list,
        pagination: pagination
      })
      this.setState({
        spinning: false
      })
    }).catch(e => {
      this.setState({
        spinning: false
      })
    })
  }
  
  componentWillMount () {}
  
	render () {
	  const orderCode = {
	    title: '订单编号',
	    dataIndex: 'orderNo',
	    key: 0,
	    width: 200,
	    render (text, record, index) {
	      return <Link to={`/orderDetail/${text}`}>{text}</Link>
	    }
	  }
	  var columns = [orderCode, ...tableModel]
	  const content = (
      <div className='OrderList'>
        <Iform formModel={formModel || []} formData={{}} $submit={this._query.bind(this)} onRef={this.onRef.bind(this)}/><br/>
        <div>
          <Spin spinning={this.state.spinning}>
            <Table
            columns={columns}
            dataSource={this.state.tableData}
            {...this.state.tableProps}
            size='middle'
            rowKey={record => record.id} 
            />
            <br/>
            <div align='right'>
              <Pagination
                defaultCurrent={this.state.pagination.pageNum}
                defaultPageSize = {this.state.pagination.pageSize}
                total={this.state.pagination.total}
                onChange={this._paginationChange.bind(this)}/>
            </div>
          </Spin>
        </div>
      </div>
    )
		return this.state.pageSpinning ? <Spin spinning={this.state.pageSpinning} className='loading'/>  : content
	}
	// 条件查询
	_query (values) {
	  this.setState({
	    querys: values
	  }, () => {
	    this._orderList()
	  })
	}
	// 获取子组件对象
	onRef (iform) {
	  this.setState({
	    iform
	  }, () => {
	    this.state.iform.validate()
	  })
	}
	// 分页查询
	_paginationChange (page, size) {
	  var pagination = this.state.pagination
    pagination.current = page
    pagination.pageSize = size
	  this.setState({
	    pagination: pagination
	  }, function () {
	    this._orderList()
	  })
	}
	
}

export default OrderList
