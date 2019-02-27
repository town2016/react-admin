import React, { Component } from 'react'
import '../../asset/less/wedgit/toper.less'
import { Icon, Dropdown, Menu } from 'antd'
import Cookie from 'js-cookie'
import { logout } from 'api/login'
class Toper extends Component {
	render () {
	  let user = Cookie.get('user')
	  user = user ? JSON.parse(user) : {}
	  const empname = user.empname ? user.empname : user.user ? user.user.empname : ''
		const menu = (
		  <Menu>
		    <Menu.Item key='2' onClick={this.logout.bind(this)}>
		     	退出
		    </Menu.Item>
		  </Menu>
		)
		return (
			<div className='Toper' ref='toper'>
				<div className='left'>
					<Icon type="menu-fold" className='menuIcon' onClick={this._closer.bind(this)}/>
				</div>
				<div className='right'>
				  <span className='loginer'>登录账号: {empname}</span>
					<Dropdown overlay={menu} placement="bottomCenter">
						<Icon type="small-dash" className='appIcon'/>
				  </Dropdown>
				</div>
			</div>
		)
	}
	
	// 退出
	logout () {
	  var sign = '/apis/logout'
	  if (process.env.NODE_ENV === 'development') {
	    sign = '/logout'
	  }
	  logout(null, {sign}).then(res => {
	    localStorage.clear()
	    if (res.data) {
	      window.location.href = res.data
	    } else {
	      global.router.history.push('/login')
	    }
	  })
	}
	
	_closer () {
	  let cls = this.refs.toper.classList
	  let sideBarCls = document.querySelector('#Sidebar').classList
	  if (cls.contains('closer')) {
	    cls.remove('closer')
	    sideBarCls.remove('closer')
	  } else {
	    cls.add('closer')
	    sideBarCls.add('closer')
	  }
	}
	
}

export default Toper