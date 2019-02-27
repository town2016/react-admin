import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadTemplate} from '../../store/templateMag/action';
import {Form, Row, Col, Button} from 'antd';
import SERVER_URL from '../../modelconfig/common/serverURL';
import "./templateMag.less";
import "../../resource/css/index.less";
class TemplateDetail extends Component {
    constructor(props){
        super(props);
        this.templateId = 0;
        this.downloadURL = '';
    }

    componentDidMount() {
        this.templateId = this.props.match.params.templateId;
        this.props.loadTemplate({templateId:this.templateId});
        this.downloadURL = SERVER_URL.getTemplateFile + "?templateId=" + this.templateId;
    }

    render(){
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
        return (
            <div className="templateDetail">
                <Row>
                    <Col span={22} pull={0}>
                    <Form >
                        <Form.Item label="模板名称" {...formItemLayout}>
                            <span>{this.props.templateVO.templateName}</span>
                        </Form.Item>
                        <Form.Item label="模板标识" {...formItemLayout}>
                            <span>{this.props.templateVO.templateCode}</span>
                        </Form.Item>
                        <Form.Item label="状态" {...formItemLayout}>
                            <span>{this.props.templateVO.templateStatusStr}</span>
                        </Form.Item>
                        <Form.Item label="文件" {...formItemLayout}>
                            <a href={this.downloadURL + "&type=1"}>下载模板</a>
                            <a href={this.downloadURL + "&type=2"} style={{marginLeft:15}}>下载文档</a>
                        </Form.Item>
                        <Form.Item label="说明" {...formItemLayout}>
                            <span>{this.props.templateVO.description}</span>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col span={2}>
                        <Link to={'/templateEdit/' + this.props.templateVO.templateId}>
                            <Button type="primary">编辑</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps =(state) => {
    return {
        templateVO: state.templateMag.templateVO
    };
}
export default connect(mapStateToProps, {loadTemplate})(TemplateDetail);
