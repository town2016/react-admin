import React, { Component } from 'react'
import { Tabs } from 'antd'
import BaseInfo from 'views/order/baseInfo'
import Attachment from 'views/order/attachment'
import Progress from 'views/order/progress'
import 'less/order/order.less';
const TabPane = Tabs.TabPane
class OrderDetail extends Component {
  render () {
    return (
      <div className='OrderDetail'>
        <Tabs defaultActiveKey='baseInfo' style={{width: '100%'}}>
          <TabPane tab="基本信息" key='baseInfo'>
            <BaseInfo />
          </TabPane>
          <TabPane tab="附件" key='attachment'>
            <Attachment />
          </TabPane>
          <TabPane tab="进度" key='progress'>
            <Progress />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default OrderDetail
