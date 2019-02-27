import React, { Component } from 'react'
import Iform from '@/components/iform/iform' 
import { formModel, logins } from '@/api/login'
import { Button, Icon, Input, message } from 'antd'
import md5 from 'js-md5'
import { bg } from '@/api/images'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      iform: null,
      captcha: '',
      captchaSrc: '/apis/captcha/captchaImage'
    }
  }
  componentWillMount () {
    if (process.env.NODE_ENV === 'development') {
      this.setState({
        captchaSrc: '/captcha/captchaImage'
      })
    }
  }
  render () {
    localStorage.clear()
    const slotBtns = <span></span>
    formModel[0].attrs['prefix'] = <Icon type='user' style={{color: 'rgba(0,0,0,0.3)'}}/>
    formModel[1].attrs['prefix'] = <Icon type='lock' style={{color: 'rgba(0,0,0,0.3)'}}/>
    return (
      <div className='Login'>
        <div className='login-container'>
          <p className="minY">Lego admin system of Touna</p>
          <p className="minY" style={{marginTop: '30px'}}>User First and Embrace Change</p>
          <div className='login-box bounce'>
            <div className='title'>系统登录</div>
            <Iform formModel={formModel || []} formData={{}} slotBtns={slotBtns} onRef={this.onRef.bind(this)}></Iform>
            <div style={{marginBottom: '20px'}}>
              <Input size='large' style={{width: '60%', verticalAlign: 'middle'}} maxLength={4} onChange={this.changeHandler.bind(this)}></Input>
              <div style={{display: 'inline-block', width: '40%', textAlign: 'right'}} onClick={this.changeCaptcha.bind(this)}>
                <img src={this.state.captchaSrc} alt='captcha'/>
              </div>
            </div>
            <div className='login-btn'>
              <Button type='primary' size='large' onClick={this.login.bind(this)}>登录</Button>
            </div>
          </div>
        </div>
        <style lang='less'>
          {
            `
            .Login{
              width: 100%;
              height: 100%;
              overflow: hidden;
              background:url(${bg}) center no-repeat;
              position: realtive;
            }
            .login-container{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 5;
              background: linear-gradient(to bottom, rgba(123, 67, 151, 0.35), rgba(33, 150, 243, 0.55));
            }
            .minY{
              position: absolute;
              top: 75%;
              text-align: center;
              width: 100%;
              letter-spacing: 3px;
              font-size: 12px;
              opacity: 0.6;
              text-shadow: 2px 5px 3px rgba(123, 67, 151, 1);
            }
            .Login .login-box{
              width: 320px;
              padding: 20px 20px 30px 20px;
              margin: 280px auto;
              background-color: #fff;
              box-shadow: 0 0 5px rgba(0,0,0,0.3);
              border-radius: 4px;
            }
            @-webkit-keyframes bounceInDown {
              from,
              60%,
              75%,
              90%,
              to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              }
            
              0% {
                opacity: 0;
                -webkit-transform: translate3d(0, -3000px, 0);
                transform: translate3d(0, -3000px, 0);
              }
            
              60% {
                opacity: 1;
                -webkit-transform: translate3d(0, 25px, 0);
                transform: translate3d(0, 25px, 0);
              }
            
              75% {
                -webkit-transform: translate3d(0, -10px, 0);
                transform: translate3d(0, -10px, 0);
              }
            
              90% {
                -webkit-transform: translate3d(0, 5px, 0);
                transform: translate3d(0, 5px, 0);
              }
            
              to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
              }
            }
            
            @keyframes bounceInDown {
              from,
              60%,
              75%,
              90%,
              to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              }
            
              0% {
                opacity: 0;
                -webkit-transform: translate3d(0, -3000px, 0);
                transform: translate3d(0, -3000px, 0);
              }
            
              60% {
                opacity: 1;
                -webkit-transform: translate3d(0, 25px, 0);
                transform: translate3d(0, 25px, 0);
              }
            
              75% {
                -webkit-transform: translate3d(0, -10px, 0);
                transform: translate3d(0, -10px, 0);
              }
            
              90% {
                -webkit-transform: translate3d(0, 5px, 0);
                transform: translate3d(0, 5px, 0);
              }
            
              to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
              }
            }
            
            .bounce {
              -webkit-animation: bounceInDown 1s;
              animation: bounceInDown 1s;
              -webkit-transform-origin: center bottom;
              transform-origin: center bottom;
            }
            .login-box .iform .ant-form-item-control-wrapper{
              margin:0;
            }
            .login-btn button{
              width: 100%;
              background: linear-gradient(to bottom, rgba(123, 67, 151, 0.35), rgba(33, 150, 243, 0.55)); color: #fff;
              border: none;
            }
            .title{
              padding: 0 0 15px 0;
              margin: 0 0 20px 0;
              font-size: 14px;
              color: #17233d;
              text-align: left;
              font-weight: 700;
              font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
              border-bottom: 1px solid #e5e5e5;
              background: linear-gradient(to bottom, rgba(123, 67, 151, 0.35), rgba(33, 150, 243, 0.55));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .Login .ant-form-item-with-help{
              margin-bottom: 24px;
            }
            `
          }
        </style>
      </div>
    )
  }
  onRef (iform) {
    this.setState({
      iform
    })
  }
  changeHandler (e) {
    this.setState({
      captcha: e.target.value
    })
  }
  changeCaptcha () {
    this.setState({
      captchaSrc: this.state.captchaSrc + `?${new Date().getTime()}`
    })
  }
  login () {
    var valid = this.state.iform.validate()
    if (!this.state.captcha) {
      message.error('验证码不能为空')
      return
    }
    if (valid.status === 'success') {
      valid.values.loginPassword = md5(valid.values.loginPassword)
      var params = {...valid.values, captcha: this.state.captcha}
      var sign = '/apis/login'
      if (process.env.NODE_ENV === 'development') {
        sign = '/login'
      }
      logins(params, {sign}).then(res => {
        global.router.history.push('/')
      })
    }
  }
}
export default Login
