import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import './templateMag';
import AuthComp from '@/components/authComponent/auth'
class Title extends Component{
  render() {
    return (
      <div className="table-title" style={{height:60, width:"100%"}}>
        <div className="fl ml mt"><span>模板列表</span></div>
        <div className="fr mr mt">
          <AuthComp auth='add' render={<Link to='/templateEdit'><Icon type="plus" /><span>新增</span></Link>}></AuthComp>
        </div>
      </div>
    )
  }
}

export default Title;
