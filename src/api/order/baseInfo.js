import moment from 'moment'
import { messy } from 'utils/common'
import { repayWayMap } from './orderList'
const loanModel = {
  '1': '普通模式',
  '0': '共借模式',
  '2': '企业模式'
}
const loanType = {
  '1': '新增借款',
  '2': '续贷',
  '3': '结清再贷',
  '4': '再贷'
}
const marryStatus = {
  '1': '已婚7年以上',
  '2': '已婚',
  '3': '未婚',
  '4': '离婚或丧偶',
  '5': '丧偶',
  '6': '其他'
}
const currentResidentialType = {
  '1': '自购',
  '2': '家族拥有',
  '3': '朋友拥有',
  '4': '宿舍',
  '5': '租用',
  '6': '自建房'
}
const educationMap = {
  'EDUCATION_BACHELOR_ABOVE': '研究生及以上',
  'EDUCATION_BACHELOR': '本科',
  'EDUCATION_COLLEGE': '大专',
  'EDUCATION_COLLEGE_BELOW': '高中及高中以下'
}
export const businessFormModel = [
  {
    elem: 'div',
    label: '申请编号',
    prop: 'orderNo'
  }, {
    elem: 'div',
    label: '申请日期',
    prop: 'applyDate',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '借款类型',
    prop: 'loanType',
    format (formData, sign) {
      return loanType[formData[sign]]
    }
  }, {
    elem: 'div',
    label: '直销坐席',
    prop: 'directSeller'
  }, {
    elem: 'div',
    label: '服务商',
    prop: 'siteName'
  }, {
    elem: 'div',
    label: '所属组织',
    prop: 'orgName'
  }, {
    elem: 'div',
    label: '客户经理',
    prop: 'customerManager'
  }, {
    elem: 'div',
    label: '服务商总经理',
    prop: 'branchManager'
  }, {
    elem: 'div',
    label: '团队经理',
    prop: 'teamManager'
  }, {
    elem: 'div',
    label: '区域总监',
    prop: 'areaManager'
  }, {
    elem: 'div',
    label: '进件渠道',
    prop: 'loanSources'
  }, {
    elem: 'div',
    label: '来源渠道',
    prop: 'consumerSources'
  }, {
    elem: 'div',
    label: '到店确认时间',
    prop: 'adStoreDate',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '进件模板',
    prop: 'verifyMouldCode'
  }, {
    elem: 'div',
    label: '进件人',
    prop: 'entryAgentName'
  }, {
    elem: 'div',
    label: '进件模式',
    prop: 'entryMode'
  }
]

export const loanFormModel = [
  {
    elem: 'div',
    label: '借款产品',
    prop: 'loanProduct'
  }, {
    elem: 'div',
    label: '借款模式',
    prop: 'loanModel',
    format (formData, sign) {
      return loanModel[formData[sign]]
    }
  }, {
    elem: 'div',
    label: '还款方式',
    prop: 'repayWay',
    format (formData, sign) {
      return repayWayMap[formData[sign]]
    }
  }, {
    elem: 'div',
    label: '借款方式',
    prop: 'loanWay'
  }, {
    elem: 'div',
    label: 'RE费率',
    prop: 'rate',
    format (formData, sign) {
      return formData[sign] ? formData[sign].toFixed(6) + '%' : ''
    }
  }, {
    elem: 'div',
    label: '申请金额',
    prop: 'applyAmount',
    format (formData, sign) {
      return formData[sign] ? formData[sign] + '元' : ''
    }
  }, {
    elem: 'div',
    label: '利率',
    prop: 'baseRate',
    format (formData, sign) {
      return formData[sign] ? formData[sign].toFixed(6) + '%' : ''
    }
  }, {
    elem: 'div',
    label: '借款期限',
    prop: 'loanTime',
    format (formData, sign) {
      return formData[sign] ? formData[sign] + '期' : ''
    }
  }, {
    elem: 'div',
    label: '借款用途',
    prop: 'loanPurpose'
  }
]

export const personalFormModel = [
  {
    elem: 'div',
    label: '姓名',
    prop: 'customerName'
  }, {
    elem: 'div',
    label: '身份证号',
    prop: 'certNo',
    format (formData, sign) {
      return messy(formData[sign], 'idNumber')
    }
  }, {
    elem: 'div',
    label: '手机号',
    prop: 'mobile',
    format (formData, sign) {
      return messy(formData[sign], 'phone')
    }
  }, {
    elem: 'div',
    label: '性别',
    prop: 'sex'
  }, {
    elem: 'div',
    label: '出生日期',
    prop: 'birthday',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '年龄',
    prop: 'age'
  }, {
    elem: 'div',
    label: '学历',
    prop: 'education',
    format (formData, sign) {
      return formData[sign] ? educationMap[formData[sign]] : ''
    }
  }, {
    elem: 'div',
    label: '有无驾驶证',
    prop: 'driverLicense',
    format (formData, prop) {
      return formData[prop] ? '有' : '无'
    }
  }, {
    elem: 'div',
    label: '婚姻状况',
    prop: 'maritalStatus',
    format (formData, sign) {
      return marryStatus[formData[sign]]
    }
  }, {
    elem: 'div',
    label: '子女情况',
    prop: 'childI'
  }, {
    elem: 'div',
    label: '子女个数',
    prop: 'childNumType'
  }, {
    elem: 'div',
    label: '个人负债情况',
    prop: 'personalLiabilities'
  }, {
    elem: 'div',
    label: '月还款能力',
    prop: 'hknl'
  }, {
    elem: 'div',
    label: '住宅类型',
    prop: 'currentResidentialType',
    format (formData, sign) {
      return currentResidentialType[formData[sign]]
    }
  }, {
    elem: 'div',
    label: '与谁居住',
    prop: 'liveWithWhom'
  }, {
    elem: 'div',
    label: '现住址居住年限',
    prop: 'currentAddrResideYears',
    format (formData, sign) {
      return formData[sign] ? formData[sign] + '年' : ''
    }
  }, {
    elem: 'div',
    label: '现家庭住址',
    prop: 'currentHomeAddress',
    col: 12,
    format (formData, sign) {
      return `${formData.province || ''}${formData.city || ''}${formData.area || ''}${formData[sign] || ''}`
    }
  }, {
    elem: 'div',
    label: '身份证地址',
    prop: 'birthAddress',
    col: 12
  }, {
    elem: 'div',
    label: '身份证有效期起',
    prop: 'certStartDate',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '身份证有效期止',
    prop: 'certEndDate',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }
]

export const jobFormData = [
  {
    elem: 'div',
    label: '公司名称',
    prop: 'companyName'
  }, {
    elem: 'div',
    label: '公司电话',
    prop: 'telephoneNumber'
  }, {
    elem: 'div',
    label: '公司地址',
    prop: 'companyDetailAddress',
    col: 12,
    format (formData, sign) {
      return `${formData.provinceName || ''}${formData.cityName || ''}${formData.areaName || ''}${formData[sign] || ''}`
    }
  }, {
    elem: 'div',
    label: '岗位职级',
    prop: 'jobPosition'
  }, {
    elem: 'div',
    label: '月均收入',
    prop: 'monthlyIncome'
  }, {
    elem: 'div',
    label: '客户行业分类',
    prop: 'customerIndustryCategory'
  }, {
    elem: 'div',
    label: '主营业务',
    prop: 'mainBusiness'
  }
]

export const contactsFormModel = [
  {
    elem: 'div',
    label: '姓名',
    prop: 'contactName'
  }, {
    elem: 'div',
    label: '手机号',
    prop: 'mobile'
  }, {
    elem: 'div',
    label: '关系类别',
    prop: 'relationship'
  }, {
    elem: 'div',
    label: '工作单位',
    prop: 'company'
  }, {
    elem: 'div',
    label: '是否知晓借款',
    prop: 'knowedLoan',
    format (formData, prop) {
      return formData[prop] ? '是' : '否'
    }
  }, {
    elem: 'div',
    label: '是否同意电核联系人',
    prop: 'telephoneReviewWill',
    format (formData, prop) {
      return formData[prop] === 0 ? '不同意' : formData[prop] === 1 ? '同意' : ''
    }
  }, {
    elem: 'div',
    label: '住宅地址',
    prop: 'residentialAddress',
    col: 12
  }
]

export const carFormModel = [
  {
    elem: 'div',
    label: '车牌号码',
    prop: 'vehicleNumber'
  }, {
    elem: 'div',
    label: '品牌型号',
    prop: 'brandModel'
  }, {
    elem: 'div',
    label: '识别代码',
    prop: 'vinNumber'
  }, {
    elem: 'div',
    label: '发动机号',
    prop: 'engineNumber'
  }, {
    elem: 'div',
    label: '车辆型号',
    prop: 'vehicleModel'
  }, {
    elem: 'div',
    label: '注册日期',
    prop: 'drivingLicenseRegisteredTime',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '发证日期',
    prop: 'drivingLicGetDate',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '行驶里程',
    prop: 'drivenDistance'
  }, {
    elem: 'div',
    label: '上牌城市',
    prop: 'vehiclePlateCityRelation'
  }, {
    elem: 'div',
    label: '车辆获得方式',
    prop: 'vehicleObtainWay'
  }, {
    elem: 'div',
    label: '抵押次数',
    prop: 'vehicleMortgageTimes',
    format (formData, sign) {
      return formData[sign] ? formData[sign] + '次' : ''
    }
  }, {
    elem: 'div',
    label: '抵押对象',
    prop: 'lastMortgageNature'
  }, {
    elem: 'div', 
    label: '解押时间',
    prop: 'lastDetentionTime',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }, {
    elem: 'div',
    label: '登记证是否补办',
    prop: 'reissued',
    format (formData, prop) {
      return formData[prop] ? '是' : '否'
    }
  }, {
    elem: 'div',
    label: '登记证补办时间',
    prop: 'reissueTime',
    format (formData, prop) {
      return formData[prop] ? moment(new Date(formData[prop])).format('YYYY-MM-DD') : ''
    }
  }
]

// 获取订单详情 /loanentry/order/getOrerInfoDetail
export function getOrerInfoDetail (params, config) {
  return fetch.post('/loanentry/order/getOrerInfoDetail', params, config)
}
