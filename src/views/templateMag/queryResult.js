import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table, Pagination} from 'antd';
// import './templateMsg.less';
import AuthComp from '@/components/authComponent/auth'
class QueryResult extends Component {
  constructor(props){
    super(props);
    this.paginationChange = this.paginationChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }

  columns = [
    {
      title: '模板名称',
      dataIndex: 'templateName',
      width: '20%',
      render: (text, record)=> {
        const detail = <Link to={`templateDetail/${record.templateId}`}>{text}</Link>
        return <AuthComp auth='view' render={detail}></AuthComp>
      }
    },
    {
      title: '模版标识',
      dataIndex: 'templateCode',
      width: '20%'
    },
    {
      title: '状态',
      dataIndex: 'templateStatusStr',
      width: '10%'
    },
    {
      title: '更新时间',
      dataIndex: 'modifiedTime',
      width: '15%'
    },
    {
      title: '更新人',
      dataIndex: 'modifiedOperator',
      width: '15%'
    },
    {
      title: '操作',
      dataIndex: '',
      width: '20%',
      render: (record) => {
        const status = (<a href="javascript:void(0)" onClick={() =>{this.statusChange(record)}}>
              {record.templateStatus === 0 ? '启用' : '禁用' }
            </a>)
        const edit = <Link to={"/templateEdit/"+record.templateId}>编辑</Link>
        return (<div>
            <AuthComp render={edit} auth='edit'></AuthComp>&nbsp;&nbsp;
            <AuthComp render={status} auth='status'></AuthComp>
          </div>)
      }
    },
  ];

  statusChange(record) {
    this.props.statusChange(record);
  }

  paginationChange(page, pageSize) {
    this.props.paginationChange({
      pageNum: page,
      pageSize: pageSize
    });
  }

  render () {
    return (
      <div className='result'>
        <Table columns={this.columns} dataSource={this.props.templates || []} bordered 
          size="middle" pagination={false}/>
        <Pagination style={{marginTop: 10, marinRight:'100%'}}
          current={this.props.pagination.current || 0} pageSize={this.props.pagination.pageSize || 10}
          total={this.props.pagination.total}
          onChange={this.paginationChange}/>
      </div>
    )
  }
}

export default QueryResult;
