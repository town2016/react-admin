import React, {PureComponent} from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import './preview.less'
import { _curPreviewCtr } from '@/store/preview.redux'
@connect(
  state => state,
  { _curPreviewCtr }
)
class Preview extends PureComponent {
  state = {
    rotate: 0,
    zoom: 1
  }
  render () {
    let curFile = this.props.preview.curPreview || {}
    let curIndex = this.props.preview.curIndex || 0
    let len = this.props.preview.previewList.length
    return (
      <div className='PreView'>
        <div className='operation' style={{marginTop: 0, marginBottom: '10px'}}>
          <Button onClick={this.zoomIn.bind(this)}><Icon type="plus-circle" /></Button>
          <Button onClick={this.zoomOut.bind(this)}><Icon type="minus-circle" /></Button>
          <Button onClick={this.rotate.bind(this)}><Icon type="reload" /></Button>
          <Button onClick={this.previous.bind(this)} disabled={curIndex === 0}><Icon type="left" /></Button>
          <Button onClick={this.next.bind(this)} disabled={curIndex === len - 1}><Icon type="right" /></Button>
        </div>
        <div className='imgBox' ref='box' style={{transform:`rotateZ(${this.state.rotate}deg)`}}>
          <img src={`${curFile.domain + curFile.url}`} ref='img' alt='img'/>
        </div>
        <div className='operation'>
          <Button onClick={this.zoomIn.bind(this)}><Icon type="plus-circle" /></Button>
          <Button onClick={this.zoomOut.bind(this)}><Icon type="minus-circle" /></Button>
          <Button onClick={this.rotate.bind(this)}><Icon type="reload" /></Button>
          <Button onClick={this.previous.bind(this)} disabled={curIndex === 0}><Icon type="left" /></Button>
          <Button onClick={this.next.bind(this)} disabled={curIndex === len - 1}><Icon type="right" /></Button>
        </div>
      </div>
    )
  }
  
  zoomIn () {
    if (this.refs.box.offsetWidth * (this.state.zoom + 0.2) >= 900) {
      return
    }
    this.refs.box.style.width = this.refs.box.offsetWidth * (this.state.zoom + 0.2) + 'px'
    this.refs.box.style.height = this.refs.box.offsetHeight * (this.state.zoom + 0.2) + 'px'
  }
  zoomOut () {
    if (this.refs.box.offsetWidth * (this.state.zoom + 0.2) <= 300) {
      return
    }
    this.refs.box.style.width = this.refs.box.offsetWidth * (this.state.zoom - 0.2) + 'px'
    this.refs.box.style.height = this.refs.box.offsetHeight * (this.state.zoom - 0.2) + 'px'
  }
  rotate () {
    this.setState({
      rotate: this.state.rotate + 90
    }, () => {
      this.resize.bind(this)()
    }) 
  }
  resize () {
    let imgH = this.refs.img.offsetHeight
    let imgW = this.refs.img.offsetWidth
    if ((this.state.rotate / 90) % 2 === 0) {
      this.refs.box.style.height = imgH + 'px'
      // this.refs.box.style.width = imgW + 'px'
    } else {
      this.refs.box.style.height = imgW + 'px'
      // this.refs.box.style.width = imgH + 'px'
    }
  }
  next () {
    let curIndex = this.props.preview.curIndex || 0
    this.props._curPreviewCtr({
      curFile: this.props.preview.previewList[curIndex + 1],
      index: curIndex + 1
    })
    this.setState({
      rotate: 0,
      zoom: 1
    }, () => {
      this.resize()
    })
  }
  
  previous () {
    let curIndex = this.props.preview.curIndex || 0
    this.props._curPreviewCtr({
      curFile: this.props.preview.previewList[curIndex - 1],
      index: curIndex - 1
    })
    this.setState({
      rotate: 0,
      zoom: 1
    }, () => {
      this.resize()
    })
  }
}

export default Preview
