import React, { Component } from 'react'
class Title extends Component {
  render () {
    let dashed = [], i = 100
    while (i ) {
      dashed.push(<span key={i}></span>)
      i--
    }
    return (
      <div className='Title'>
        <div className='titleName'>{this.props.title}</div>
        {dashed}
        <style>
          {` .Title{
                width: 100%;
                overflow: hidden;
                height: 50px;
                padding:0 10px;
                box-sizing: border-box;
                line-height: 50px;
                position: relative;
              }
              .titleName{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                padding: 0 10px;
                line-height: 50px;
                background-color: #fff;
                color: #1890ff;
                font-size: 14px;
              }
              .Title span{
                width: 10px;
                height: 1px;
                background-color: #dedede;
                display: inline-block;
                margin-right: 10px;
              }`
          }
        </style>
      </div>
    )
  }
}

export default Title 
