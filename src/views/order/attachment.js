import React, { Component } from 'react'
import 'less/order/order.less';
import { Checkbox, Icon, Button, message, Spin, Modal } from 'antd'
import { getAnnexInfoList, downloadAnnexInfo, AnnexCategory } from 'api/order/attachment'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Preview from '@/components/filePreview/preview'
import { connect } from 'react-redux'
import { _previewListCtr, _curPreviewCtr} from '@/store/preview.redux'
import AuthCopm from '@/components/authComponent/auth'

@withRouter
@connect(
  state => state,
  { _previewListCtr, _curPreviewCtr}
)
class Attachment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadList: [],
      checkedList: {},
      attachList: [],
      spinning: false,
      visible: false,
      isCheckAll: false
    }
  }
  componentDidMount () {
    var params = {
      applyNo: this.props.match.params.orderCode
    }
    this.setState({
      spinning: true
    })
    getAnnexInfoList(params).then(res => {
      this.setState({
        attachList: res.data || [],
        spinning: false
      }, () => {
        this.props._previewListCtr(this.state.attachList)
      })
    }).catch(e => {
      message.error(e.message)
      this.setState({
        spinning: false
      })
    })
  }
  render () {
    const downLoad = (
      <Button disabled={this.state.downloadList.length === 0} onClick={this._downLoad.bind(this)}>
        <Icon type="download"/>下载附件
      </Button>
    )
    return (
      <div className='Attachment'>
        <div className='flex flex-pack-right flex-align-center'>
          <Checkbox onChange={this.checkAllHandler.bind(this)} checked={this.state.isCheckAll}>全选</Checkbox>
          <AuthCopm auth='downLoad' render={downLoad}></AuthCopm>
        </div>
        <Spin spinning={this.state.spinning}>
          <ul className='clearfix' onClick={this._previewHandler.bind(this)}>
            {
              this.state.attachList.map((item, index) => (
                <li className='item' key={item.annexId}>
                  <div className='imgBox'>
                    <div className='imgBox-inner'>
                      <img src={item.domain + item.url} data-index={index} alt='img'/>
                    </div>
                  </div>
                  <p className='checkBox'>
                    <Checkbox checked={this.state.checkedList[item.annexId]} onChange={this._changeHandler.bind(this)} value={item.annexId}>{item.topic}</Checkbox>
                    <span>{moment(new Date(item.uploadTime)).format('YYYY-MM-DD')}</span>
                  </p>
                  <p className='category'>{AnnexCategory[item.annexType]}</p>
                </li>
              ))
            }
          </ul>
        </Spin>
        <Modal
          style={{'maxWidth': '950px', 'minWidth': '320px'}}
          title='附件预览'
          visible={this.state.visible}
          onCancel={this._handleCancel.bind(this)}
          destroyOnClose={true}
          width='auto'
          footer={null}>
          <Preview />
        </Modal>
      </div>
    )
  }
  // 全选
  checkAllHandler (e) {
    let val = e.target.checked
    let checkedList = {}
    if (val) {
      this.state.attachList.map(item => {
        checkedList[item.annexId] = true
        return this
      })
      this.setState({
        isCheckAll: true
      })
    } else {
      checkedList = {}
      this.setState({
        isCheckAll: false
      })
    }
    this._handlerChange.bind(this, checkedList)()
  }
  // 勾选 or 取消
  _changeHandler (event) {
    var checkedList = this.state.checkedList
    if (!checkedList[event.target.value]) {
      checkedList[event.target.value] = true
      this._handlerChange.bind(this, checkedList)()
    } else {
      delete checkedList[event.target.value]
      this._handlerChange.bind(this, checkedList)()
    }
  }
  // 设置选中
  _handlerChange (checkedList) {
    let isCheckAll = Object.keys(checkedList).length === this.state.attachList.length
    this.setState({
      checkedList: checkedList,
      downloadList: Object.keys(checkedList),
      isCheckAll: isCheckAll
    })
  }
  // 下载
  _downLoad () {
    var params = {
      annexInfoIds: this.state.downloadList.join(',')
    }
    downloadAnnexInfo(params)
  }
  // 打开图片预览
  _previewHandler (e) {
    if (e.target.tagName !== 'IMG') {
      return
    }
    var index = e.target.dataset.index
    this.props._curPreviewCtr({
      curFile: this.state.attachList[index],
      index: index * 1
    })
    this.setState({
      visible: true
    })
  }
  _handleCancel () {
    this.setState({
      visible: false
    })
    this.props._curPreviewCtr({
      curFile: {},
      index: 0
    })
  }
}

export default Attachment
