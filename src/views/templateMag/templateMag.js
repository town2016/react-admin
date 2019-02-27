import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Form, Spin} from 'antd';
import QueryCondition from './queryCondition';
import Title from './title';
import QueryResult from './queryResult';
import {queryTemplates, setTemplateStatus} from '../../store/templateMag/action';
import {INIT_PAGINATION} from "../../modelconfig/common/pagination.ts";
import '../../resource/css/index.less';
import './templateMag.less';

class TemplateMag extends Component {
  constructor(props){
    super(props);
    this.state = {
      condition:{
        templateName: '',
        templateStatus: '',
      },
      spinning: true,
    };
    this.conditionChange = this.conditionChange.bind(this);
    this.searchTemplate = this.searchTemplate.bind(this);
    this.resetCondition = this.resetCondition.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.spinningCall = this.spinningCall.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    this.searchTemplate();
  }
  
  conditionChange(type, value) {
    let {condition} = this.state;
    switch(type) {
      case 'name':
      condition.templateName = value;
      break;
      case 'status':
      condition.templateStatus = value;
      break;
      default:
      break;
    }
    this.setState({condition});
  }

  spinningCall = (spiningObj) => {
    this.setState(spiningObj);
  }
  
  searchTemplate = (params = {},
                    pagination = {pageNum: INIT_PAGINATION.pageNum,
                                  pageSize: INIT_PAGINATION.pageSize}) => {
    
    this.spinningCall({spinning: true});
    let tempParams = Object.assign({}, params, pagination);
    let postData = {data:tempParams, spinningCall: this.spinningCall};
    this.props.queryTemplates(postData);
  }

  resetCondition = () => {
    let {condition} = this.state;
    condition.templateName = condition.templateStatus = '';
    this.setState(condition);
  }

  paginationChange = (pagination) => {
    this.searchTemplate(this.state.condition, pagination);
  }

  statusChange = (record) => {
    this.props.setTemplateStatus(record, this.props.templates);
  }

  render () {
    return (
      <div className='templateMag'>
        <QueryCondition condition={this.state.condition}
          conditionChange={this.conditionChange}
          search={this.searchTemplate}
          reset={this.resetCondition}/>
       <Spin spinning={this.state.spinning}>
          <Title/>
          <QueryResult templates={this.props.templates}
          pagination={this.props.pagination}
          paginationChange={this.paginationChange}
          statusChange={this.statusChange}/>
       </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
   return {
     templates: state.templateMag.templates || [],
     pagination: state.templateMag.pagination
    };
}
export default connect(mapStateToProps, {queryTemplates, setTemplateStatus})(Form.create()(TemplateMag));
