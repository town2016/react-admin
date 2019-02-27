import React, { Component } from 'react'
import { Table, Spin, message } from 'antd'
import { tableModel } from 'api/order/progress'
import { getProcessListByOrderNo } from 'api/order/progress'
import { withRouter } from 'react-router-dom'
@withRouter
class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableModel: [],
      tableData: [],
      tableProps: {
        pagination: false,
        bordered: true
      },
      spinning: false
    }
  }
  componentWillMount () {
    this.setState({
      tableModel: [
        {
          title: '流程名称',
          dataIndex: 'processName',
          render (val, record, index) {
            return record.exitStatus === 1 ? <span>{val} <font color='red'>(退)</font></span> : val
          }
        },
        ...tableModel,
        {
          title: '操作',
          render () {
            return '' // <a href='javascript:void();'>详情</a>
          }
        }
      ]
    })
    this._getProcessListByOrderNo.bind(this)()
  }
  // 拉取进度列表
  _getProcessListByOrderNo () {
    var params = {
      orderNo: this.props.match.params.orderCode
    }
    this.setState({
      spinning: true
    })
    getProcessListByOrderNo(params).then(res => {
      res.data = res.data ? res.data : {}
      this.setState({
        tableData: res.data.list || [],
        spinning: false
      })
    }).catch(e => {
      message.error(e.message)
      this.setState({
        spinning: false
      })
    })
  }
  
  render () {
    return (
      <div className='Progress'>
        <Spin spinning={this.state.spinning}>
          <Table columns={this.state.tableModel} dataSource={this.state.tableData} rowKey={record => record.id} {...this.state.tableProps}  size='middle'>
          </Table>
        </Spin>
      </div>
    )
  }
}

export default Progress
