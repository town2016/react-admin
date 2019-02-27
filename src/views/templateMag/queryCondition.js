import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {Form, Row, Col, Input, Button, Select} from 'antd';
// import './templateMsg.less';
const Option = Select.Option;

const TEMPLATE_STATU = {
  'All': '',
  'Enable': 1,
  'Disable': 0
}

class QueryCondition extends Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.search({
        templateName: this.props.condition.templateName,
        templateStatus: this.props.condition.templateStatus
    });
  }

  handleReset = () => {
    this.props.reset();
  }

  handleConditionChange = (type, value) => {
    let tempValue = (type === 'name' ? value.target.value : value);
    this.props.conditionChange(type, tempValue);
  }

  render () {
    const colsLayout = {
      xs: {span: 24},
      sm: {span: 8}
    };
    const statusLayout = {
      xs: {span: 24},
      sm: {span: 7}
    };
    const btnLayout = {
      xs: {span: 24},
      sm: {span: 8, push: 1}
    };
    return (
        <div className='condition'>
          <Form className='templateMag-form' onSubmit={this.handleSearch}>
           <Row>
             <Col {...colsLayout}>
              <Form.Item label='模板名称:' >
                <Input placeholder="进件模板名称" value={this.props.condition.templateName}
                  onChange={(event) => this.handleConditionChange('name', event)}/>
              </Form.Item>
            </Col>
            <Col {...statusLayout}>
              <Form.Item label='状态:' >
                <Select value={this.props.condition.templateStatus} defaultValue={this.props.condition.templateStatus}
                onChange={(event) => this.handleConditionChange('status', event)}>
                  <Option value={TEMPLATE_STATU.All}>全部</Option>
                  <Option value={TEMPLATE_STATU.Enable}>启用</Option>
                  <Option value={TEMPLATE_STATU.Disable}>禁用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...btnLayout}>
              <Form.Item >
                <Button type="primary" icon="search" htmlType="submit" onClick={this.handleSearch} >查询</Button>
                <Button style={{marginLeft: '4%'}} onClick={this.handleReset}>重置</Button>
              </Form.Item>
            </Col>
            </Row>
          </Form>
        </div>
    )
  }
}

export default Form.create()(QueryCondition);
