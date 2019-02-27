import React, {Component} from 'react';
import {Form, Input, Radio, Button} from 'antd';
import {templateFields} from '../../api/template/templateForm';
import FileUpload from '../../components/upload/fileUpload';
import {CommonUtil, FileOperateEnum} from '../../modelconfig/common/commonUtil.ts';
const RadioGroup = Radio.Group;
const {TextArea} = Input;

class TemplateForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            templateId: '',
            templateName: '',
            templateCode: '',
            templateStatus: '',
            description: '',
            templateXls: {},
            templateDoc: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.fileListChange = this.fileListChange.bind(this);
        this.validateTemplateCode = this.validateTemplateCode.bind(this);
        this.buildRules = this.buildRules.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.templateVO !== nextProps.templateVO) {
            let templateVO = nextProps.templateVO;
            this.setState({
                templateId: templateVO.templateId,
                templateName: templateVO.templateName,
                templateCode: templateVO.templateCode,
                templateStatus: templateVO.templateStatus,
                description: templateVO.description,
            });
        }
    }

    handleChange(e, type) {
        let tempState = {...this.state};
        tempState[type] = e.target.value;
        this.setState(tempState);
    }

    getFieldValue(operType, fileType, params) {
        let fieldValue = {};
        switch(operType) {
            case FileOperateEnum.Add:
                fieldValue[fileType] = {
                    value: params[fileType]
                }
                break;
            case FileOperateEnum.Remove:
                fieldValue[fileType] = null;
                break;
            default:
            break; 
        }
        return fieldValue;
    }

    fileListChange(operType, fileType, params) {
        this.props.form.setFieldsValue(this.getFieldValue(operType, fileType, params));
        this.setState(params);
    }

    getPostParam(state, isEditPage) {
        let params = {
            templateName: state.templateName,
            templateIdentifierCode: state.templateCode,
            templateStatus: state.templateStatus,
            description: state.description,
            uuid: CommonUtil.uuid()
        };
        if(isEditPage) {
            params.templateId = state.templateId;
        }
        return params;
    }

    buildUploadFileData(fileParam) {
        let params = {};
        Object.keys(fileParam).forEach(key=> {
            if(fileParam[key]) {
                params[key] = fileParam[key].originFileObj;
            }
        });
        return params;
    }

    buildRules =(field, isEditPage) => {
        let rules = [];
        switch(field.prop) {
            case 'templateCode':
                rules = isEditPage? []:field.rules.concat({validator: this.validateTemplateCode});
                break;
            case 'templateXls':
                rules = isEditPage ? []:field.rules;
                break;
            case 'templateDoc':
                rules = isEditPage ? []:field.rules;
                break;
            default:
                rules = field.rules;
                break;
        }
        return rules;
    }

    validateTemplateCode = (rule, value, callback) => {
        this.props.checkExist(
            {templateIdentifierCode: value,
             callback: callback
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields({force: true}, (err, values)=>{
            if(!err) {
                this.props.formSubmit(
                    this.getPostParam(this.state, this.props.isEditPage),
                    this.buildUploadFileData({
                       "excel-data": this.state.templateXls,
                       "doc-data": this.state.templateDoc
                   })
               );
            }
        });
    }

    createElement(field) {
        switch(field.elemType) {
            case 'input':
                return (<Input placeholder={field.attrs.placeholder}
                    disabled={field.prop==='templateCode' && this.props.isEditPage}
                    onChange={(e) => {this.handleChange(e, field.prop)}}/>);
            case 'radio':
                return (<RadioGroup onChange={(e)=>{this.handleChange(e, field.prop)}}>
                        <Radio value={1}>启用</Radio>
                        <Radio value={0}>禁用</Radio>
                    </RadioGroup>);
            case 'upload':
                return (<FileUpload uploadInfo={field.info} fileListChange={this.fileListChange}
                        templateVO={this.props.templateVO} />);
            case 'textarea':
                return (<TextArea rows={4} onChange={(e)=>this.handleChange(e, field.prop)}/>);
            default:
                return (null);
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs: {span: 24},
                sm: {span: 2}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 22}
            }
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: {span: 24, offset:0},
                sm: {span: 2, offset:1}
            }
        };

        return (
            <Form onSubmit={(e) => {this.handleSubmit(e)}} >
                {templateFields.map(field => (
                    <Form.Item label={field.label} key={field.prop} {...formItemLayout}>
                    {getFieldDecorator(field.prop, {
                            validateFirst: true,
                            rules: this.buildRules(field,this.props.isEditPage),
                            initialValue: this.props.templateVO[field.prop]
                    })(this.createElement(field))}
                    </Form.Item>
                ))}
                <Form.Item {...buttonItemLayout} >
                    <Button type="primary" htmlType="submit">
                     {this.props.isEditPage ? '确认修改':'确认新增'}
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Form.create()(TemplateForm);


