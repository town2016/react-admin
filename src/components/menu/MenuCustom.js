import  React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
let SubMenu = Menu.SubMenu
@withRouter
@connect(
	state => state.menu
)
class MenuCustome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openKeys: [],
      selectedKeys: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: []
    }
  }
	render () {
		let html = this.props.menuList.map(menu => {
			if (menu.children) {
				return this.subMenuChild(menu)
			} else {
				return menu.show ? <Menu.Item key={menu.id} title={menu.label}>{menu.icon ? <Icon type={menu.icon}/> : null}<Link to={menu.path}>{menu.label}</Link></Menu.Item> : null
			}
		})
		return (
		  <div>
  			<Menu
  			  defaultSelectedKeys={['orderList']}
  			  openKeys = {this.state.openKeys}
  			  selectedKeys = {this.state.selectedKeys}
  			  onOpenChange = {this._openChangeHandler.bind(this)}
  			  onSelect = {this._selecedHandler.bind(this)}
  				mode="inline">
  				{html}
  			</Menu>
  			<style>
          {
            `
              .ant-menu-item{
                position: relative;
                padding-left: 30px !important;
              }
              .ant-menu-item i{
                position: absolute;
                top: 50%;
                left: 8px;
                margin-top: -7px;
              }
            ` 
          }
        </style>
      </div>
		)
	}
	// 菜单被点击
	_selecedHandler ({ item, key, selectedKeys }) {
	  this.setState({
	    selectedKeys
	  })
	}
	// 菜单组被打开
	_openChangeHandler (openKeys) {
	  this.setState({
      openKeys
    })
	}
  // 渲染子级菜单
	subMenuChild (obj) {
		let htmls = <div></div>
		let childrens = obj.children
		if (childrens && childrens.length > 0) {
			htmls = childrens.map(item => {
				return this.subMenuChild(item)
			})
			return <SubMenu title = {obj.label} key={obj.id}>{htmls}</SubMenu>
		} else {
			return obj.show ? <Menu.Item key={obj.id} title={obj.label}>{obj.icon ? <Icon type={obj.icon}/> : null}<Link to={obj.path}>{obj.label}</Link></Menu.Item> : null
		}
	} 
}

export default MenuCustome