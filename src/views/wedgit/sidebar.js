import React, { Component } from 'react'
import '../../asset/less/wedgit/sidebar.less'
import MenuCustome  from '../../components/menu/MenuCustom'
import { connect } from 'react-redux'
import { _menusCtr } from '../../store/menu.redux'
import { logo } from 'api/images'
import { HashRouter } from 'react-router-dom'
import { authTree, conditionInfoList } from 'api/layout'
import { storages } from 'utils/common'
import { menuMapList } from '@/router/routes'
const router = new HashRouter()
let menuMap = {}
@connect(null, {
	_menusCtr
})
class Sidebar extends Component {
	constructor (props) {
		super(props)
		this.state = {
			menuList: [],
			menuMap: {}
		}
	}
	componentWillMount () {
		this._getAuthTree()
	}
	render () {
		return (
			<div className='Sidebar' id='Sidebar'>
				<h1 className='sysytemName' onClick={this.goHome.bind(this)}>
					<div className='name-item'>
					  <img src={logo} height='30' alt='logo'/>
					  <span>Lego Order</span>
					</div>
				</h1>
				<div className='menu-wrapper'>
					<MenuCustome/>
				</div>
			</div>
		)
	}
	goHome () {
	  router.history.push('/')
	}
	// 拉取权限树
  _getAuthTree () {
    authTree().then(res => {
      storages.set('menus', JSON.stringify(res.data))
      let menus = []
      this._makeMenu.bind(this, res.data[0].children, menus)()
      this.props._menusCtr(menus)
      var menuMap = storages.get('menuMap') ? JSON.parse(storages.get('menuMap')) : {}
      if (menuMap['/orderList']) {
        this._getConditionInfoList()
      }
    })
  }
  // 整理菜单数据
  _makeMenu (list, menus = []) {
    list.map(item => {
      if (item.resource) {
        if (!item.resourceWebUrl) {
          if (item.show) {
            var group = {
              label: item.resourceName,
              id: String(item.resourceId),
              childs: []
            }
            menus.push(group)
            this._makeMenu(item.children, group.childs)
          }
        } else {
          let menuId = String(item.resourceWebUrl.split('/')[1])
          var menu = {
            label: item.resourceName,
            name: item.resourceWebUrl.split('/')[1],
            path: item.resourceWebUrl,
            id: menuId,
            show: item.show
          }
          menuMapList[menuId] &&( menu.icon = menuMapList[menuId])
          menuMap[menu.path] = {}
          let list = item.children || []
          this._makeMenuMap(menuMap[menu.path], list)
          menus.push(menu)
        }
      }
      return this
    })
    storages.set('menuMap', JSON.stringify(menuMap))
  }
  _makeMenuMap (obj, list) {
    list.map(item => {
      return obj[item.resourceWebCode] = true
    })
  }
  // 拉取字典
  _getConditionInfoList () {
    conditionInfoList().then(res => {
      storages.set('dist', JSON.stringify(res.data))
    }).catch(e => {
     //  message.error('字典接口查询失败')
    })
  }
	
}

export default Sidebar