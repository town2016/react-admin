import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookie from 'js-cookie'
import { storages } from '@/utils/common'
import { message } from 'antd'
@withRouter
class PrivateRoute extends Component {
  state = {
    menus: storages.get('menuMap') ? JSON.parse(storages.get('menuMap')) : {}
  }
	render () {
    var path = this.props.match.url
    var noAuthPages = ['/home', '/login', '/']
	  if (!this.state.menus[path] && noAuthPages.indexOf(path) < 0) {
	    message.warning('您没有该页面的访问权限，请联系管理员')
	    return null
	  }
		let auth = Cookie.get('user') // localStorage.getItem('user')
		let component = auth ? <Route {...this.props}/> : <Redirect to='/login' />
		return component
	}
}

export default PrivateRoute
