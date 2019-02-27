import React, { Component } from 'react'
import Title  from '@/components/title/title'
import Iform from '@/components/iform/iform'
import * as BASE from 'api/order/baseInfo'
import 'less/order/order.less';
import { Icon, Spin, message } from 'antd'
import { withRouter } from 'react-router-dom'
@withRouter
class BaseInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isTop: false,
      baseInfo: {},
      spinning: false
    }
  }
  
  render () {
    return (
      <div className='BaseInfo'>
        <Spin spinning={this.state.spinning}>
          <Title title='业务信息'/>
          <Iform formModel={BASE.businessFormModel} formData={this.state.baseInfo.orderInfo || {}} slotBtns={(<span></span>)}/>
          <Title title='借款信息'/>
          <Iform formModel={BASE.loanFormModel} formData={this.state.baseInfo.orderInfo || {}} slotBtns={(<span></span>)}/>
          <Title title='个人信息'/>
          <Iform formModel={BASE.personalFormModel} formData={this.state.baseInfo.personalInfo || {}} slotBtns={(<span></span>)}/>
          <Title title='就业信息'/>
          <Iform formModel={BASE.jobFormData} formData={this.state.baseInfo.jobInfo || {}} slotBtns={(<span></span>)}/>
          <Title title='联系人信息'/>
          {!this.state.baseInfo.contactInfo ? null : (
            this.state.baseInfo.contactInfo.map(item => (
              <Iform key={item.contactId} formModel={BASE.contactsFormModel} formData={item} slotBtns={(<span></span>)}/>
            ))
          )}
          <Title title='车辆信息'/>
          <Iform formModel={BASE.carFormModel} formData={this.state.baseInfo.carInfo || {}} slotBtns={(<span></span>)}/>
          {this.state.isTop && <div className='to-top' onClick={this.goTop.bind(this)}><Icon type="to-top" /></div>}
        </Spin>
        <style>
          {`
            .to-top{
              position: fixed;
              bottom: 100px;
              right: 50px;
              font-size: 30px;
              padding: 10px;
              color: #00a9f4;
              background-color: #fff;
              box-shadow: 0 0 5px rgba(0,0,0,0.3);
              cursor:pointer;
            }
          `}
        </style>
      </div>
    )
  }
  
  componentWillMount () {
    this.setState({
      spinning: true
    })
    BASE.getOrerInfoDetail({orderNo: this.props.match.params.orderCode}).then(res =>{
      var baseInfo = res.data || {}
      this.mergeBaseInfo.bind(this, baseInfo)()
    }).catch(e => {
      message.error(e.message)
      this.setState({
        spinning: false
      })
    })
  }
  
  // 整合信息
  mergeBaseInfo (baseInfo) {
    delete baseInfo.customerBaseDTO.province
    delete baseInfo.customerBaseDTO.area
    delete baseInfo.customerBaseDTO.city
    var personalInfo = {...baseInfo.personalInfoDTO, ...baseInfo.customerBaseDTO, driverLicense: baseInfo.vehicleReviewInfoDTO ? baseInfo.vehicleReviewInfoDTO.driverLicense : '' } || {}
    var carInfo = {...baseInfo.vehicleInfoDTO, ...baseInfo.vehicleReviewInfoDTO} || {}
    var jobInfo = baseInfo.jobInfoDTOList ? {...baseInfo.jobInfoDTOList[0]} : {}
    var contactInfo = baseInfo.contactInfoDTOList || []
    var orderInfo = {...baseInfo.orderInfoDTO} || {}
    var loanInfo = {...baseInfo.orderInfoDTO} || {}
    this.setState({
      baseInfo: {
        personalInfo,
        carInfo,
        jobInfo,
        contactInfo,
        orderInfo,
        loanInfo
      }
    }, () => {
      this.setState({
        spinning: false
      })
    })
  }
  
  componentDidMount () {
    document.querySelector('.content-inner').onscroll =  () => {
      var srcTop = document.querySelector('.content-inner').scrollTop
      if (srcTop > 150) {
        if (!this.state.isTop) {
          this.setState({
            isTop: true
          })
        }
      } else {
        if (this.state.isTop) {
          this.setState({
            isTop: false
          })
        }
      }
    }
  }
  
  goTop () {
    document.querySelector('.content-inner').scrollTop = 0
  }
}

export default BaseInfo
