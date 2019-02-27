export const formModel = [
  {
    elem: 'input',
    label: '',
    prop: 'loginAccount',
    col: 24,
    rules: [{required: true, message: '请输入用户名'}],
    attrs: {
      placeholder: '请输入用户名',
      size: 'large'
    }
  }, {
    elem: 'input',
    label: '',
    col: 24,
    prop: 'loginPassword',
    rules: [{required: true, message: '请输入密码'}],
    attrs: {
      placeholder: '请输入密码',
      type: 'password',
      size: 'large'
    }
  }
]

// 登录
export function logins (params, config) {
  return global.fetch.post('', params, config)
}
// 登出
export function logout (params, config) {
  return global.fetch.get('', params, config)
}
