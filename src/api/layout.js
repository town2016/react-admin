// 字典
export function conditionInfoList () {
  return global.fetch.get('/loanentry/order/conditionInfoList')
}
// 拉取权限树
export function authTree () {
  var sign = ''
  if (process.env.NODE_ENV === 'development') {
    sign = '/sys'
  } else {
    sign = '/apis/sys'
  }
  return global.fetch.get('/resource/resourceTreeForLoginUser/1', [], {sign})
}