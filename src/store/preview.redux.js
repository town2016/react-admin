import {SETPREVIEWLIST, SETCURPREVIEW}  from './modules'
const _initState = { 
  curPreview: {},
  previewList: [],
  curIndex: 0
}
export function preview (state = _initState, action) {
  switch(action.type) {
    case SETPREVIEWLIST:
      return {...state, previewList: action.data}
    case SETCURPREVIEW:
      return {...state, curPreview: action.data.curFile, curIndex: action.data.index}
    default:
      return state
  }
}
// 预览列表
export function  _previewListCtr (previewList = []) {
  return {type: SETPREVIEWLIST, data: previewList}
}
// 当前预览
export function _curPreviewCtr (curPreview = {curFile: {}, index: 0}) {
  return {type: SETCURPREVIEW, data: curPreview}
}
