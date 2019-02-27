import React, {Component} from 'react'
import {Form, Input, Select, Row, Col, Button, Radio, Checkbox, DatePicker  } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './iform.less'
/* const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 8 },
    lg: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 16 },
    lg: { span: 18 }
  }
} */


class Iform extends Component {
  
  constructor (props) {
    super(props)
    this.state = {}
  }

	render () {
	  const { getFieldDecorator } = this.props.form
		return (
			<Form
			  className='iform'
			  ref = 'iform'
				layout='horizontal'>
				<Row>
					{this.props.formModel.map((item, index) => (
						<Col xl={item.col ? item.col : 6} md={item.col ? item.col : 8} sm={item.col ? item.col : 12} xs={item.col ? item.col : 24} key={item.prop}>
							<Form.Item
								style={{width: '100%'}}
								label={item.label}>
							  { getFieldDecorator(item.prop, {
							    rules: item.rules || [],
							    initialValue: item.initialValue
							  })(
							    this.createEleme(item)
							  )}
							</Form.Item>
						</Col>
					))}
					<Col xxl={4} xl={6} md={8} sm={12} xs={24}  style={{padding: '0 10px',boxSizing: 'brder-box'}}>
					  {this.props.slotBtns ? this.props.slotBtns : (
					      <div className='iform-btns'>
					        <Button type="primary" onClick={this.validate.bind(this)}>查询</Button>
                  <Button type="default" onClick={this._resetForm.bind(this)}>重置</Button>
					      </div>
					    )
					  }
					</Col>
				</Row>
			</Form>
		)
	}
	// input handlerChange
	_handlerChange(prop, event) {
	  this.setState({
	    [prop]: event.target ? event.target.value : event
	  })
	}
	// select onChange
	_selectHandlerChange (prop, value) {
	  this.setState({
	    [prop]: value
	  })
	}
	// 暴露当前form实例
	componentDidMount () {
	  if (this.props.onRef) {
	    this.props.onRef(this)
	  }
	}
	// 表单验证
	validate (event) {
	  var res = {}
	  this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.$submit && this.props.$submit(values)
        res = {
          status: 'success',
          values: values
        }
      } else {
        res = {
          status: 'fail'
        }
      }
    })
	  return res
	}
	// 重置表单
	_resetForm () {
	  this.props.form.resetFields()
	}
  
	createEleme (obj) {
		switch (obj.elem) {
			case 'input':
				return (<Input name={obj.prop} {...obj.attrs} onChange={this._handlerChange.bind(this, obj.prop)}/>)
			case 'select':
				return <Select name={obj.prop} style={{width: '100%'}}  allowClear onChange={this._selectHandlerChange.bind(this, obj.prop)} {...obj.attrs}>
								{obj.options.map(item => 
									(
										<Select.Option  key={item[obj._v]} value={item[obj._v]} >
											{item[obj._k]}
										</Select.Option >
									)
								)}
							 </Select>
			case 'radio':
  			return <Radio.Group   {...obj.attrs} onChange={this._handlerChange.bind(this, obj.prop)}>
  			          {obj.options.map(item => 
                    (
                      <Radio   key={item[obj._v]} value={item[obj._v]} >
                        {item[obj._k]}
                      </Radio>
                    )
                  )}
  			       </Radio.Group >
  		case 'radioGroup':
        return <Radio.Group   {...obj.attrs} onChange={this._handlerChange.bind(this, obj.prop)}>
                  {obj.options.map(item => 
                    (
                      <Radio.Button    key={item[obj._v]} value={item[obj._v]} >
                        {item[obj._k]}
                      </Radio.Button>
                    )
                  )}
               </Radio.Group >
      case 'checkbox':
        return <Checkbox.Group {...obj.attrs} onChange={this._handlerChange.bind(this, obj.prop)}>
                  {obj.options.map(item => 
                    (
                      <Checkbox    key={item[obj._v]} value={item[obj._v]} >
                        {item[obj._k]}
                      </Checkbox>
                    )
                  )}
               </Checkbox.Group >
      case 'date': 
        return <DatePicker locale={locale} {...obj.attrs} style={{width: '100%'}} onChange={this._handlerChange.bind(this, obj.prop)}/>
      case 'dateRange':
        return <DatePicker.RangePicker locale={locale} {...obj.attrs} style={{width: '100%'}} onChange={this._handlerChange.bind(this, obj.prop)}/>
			default:
				return <div>{obj.format ?  obj.format(this.props.formData, obj.prop) : this.props.formData[obj.prop]}</div>
		}
	}

}



export default Form.create()(Iform)
