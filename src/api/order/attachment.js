export const AnnexCategory = {
  '40': '身份证正面',
  '70': '身份证反面',
  '22': '行驶证',
  '31': '驾驶证',
  '39': '车辆登记证',
  '38': '交通强制保险'
}
// /loanentry/order/getAnnexInfoList 附件列表
export function getAnnexInfoList (params) {
  return global.fetch.get('/loanentry/order/orderAnnexInfos', params)
}
// /loanentry/order/downloadAnnexInfo 下载附件
export function downloadAnnexInfo (params) {
  let preHost =  window.location.origin
  let url = preHost + '/apis/loanentry/loanentry/order/downloadAnnexInfo?annexInfoIds=' + params.annexInfoIds
  window.open(url)
}
