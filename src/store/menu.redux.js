import { SETMENUS,  SETCURMENU} from './modules'
const _initState = {
	menuList: [],
	curMenu: {}
}
export function  menu (state = _initState, action)  {
	switch (action.type) {
		case SETMENUS:
			return {...state, menuList: action.data}
		case SETCURMENU:
			return {...state, curMenu: action.data}
		default: 
			return state
	}
}

export function _menusCtr (menus = []) {
	return {type: SETMENUS, data: menus}
}

export function _curMenuCtr (curMenu = []) {
	return {type: SETCURMENU, data: curMenu}
}