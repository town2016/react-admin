import React, { Component } from 'react'
import '../../asset/less/wedgit/layout.less'
import Sidebar from './sidebar'
import Content from './content'
import { Spin } from 'antd'
import { storages } from 'utils/common'
import * as LAYOUT from 'api/layout'
class Layout extends Component {
  state = {
    loading: false
  }
	render () {
	  var content = (
	    <div className='flex flex-1'>
	      <Sidebar/>
        <Content/>
	    </div>
	  )
		return (
			<div className='Layout'>
			  {this.state.loading ? <Spin size='large' className='loading' /> : content}
			</div>
		)
	}
}

export default Layout