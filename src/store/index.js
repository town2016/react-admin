import { combineReducers } from 'redux'
import { menu } from './menu.redux'
import {template}  from './templateMag/reducer'
import { preview } from './preview.redux'
export default combineReducers({menu, templateMag: template, preview})
