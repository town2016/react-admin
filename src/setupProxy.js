const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(proxy(['/login', '/sys', '/loanentry', '/logout', '/captcha'], { target: 'http://10.0.4.65:8081/' }))
  app.use(proxy('/mock', { target: 'http://127.0.0.1:3000/' }));
}
