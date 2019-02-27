import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import reducers from './store/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // 处理异步action
import './utils/server.js'
import { LocaleProvider } from 'antd' // 日期汉化
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
	</Provider>, 
	document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
