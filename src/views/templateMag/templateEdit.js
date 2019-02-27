import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadTemplate, saveTemplate, checkExist, setTemplateStatus, clearTemplateVO} from '../../store/templateMag/action';
import FormField from '../../components/iform/templateForm';
import {Link} from 'react-router-dom';
import {Spin, Row, Col, Button} from 'antd';
import "./templateMag.less";
import "../../resource/css/index.less";

class TemplateEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.checkExist = this.checkExist.bind(this);
        this.spinningCallBack = this.spinningCallBack.bind(this);
        this.timer = null;
    }

    componentDidMount() {
        let templateId = this.props.match.params.templateId;
        if(templateId) {
            this.props.loadTemplate({templateId:this.props.match.params.templateId});
        } else {
            this.props.clearTemplateVO();
        }
    }

    checkExist(params) {
        this.props.checkExist(params);
    }

    goTo(url) {
        this.props.history.replace(url);
    }

    spinningCallBack =(state) => {
        this.setState(state);
        // TODO 
        // 可以考虑弹出提示 5s后自动跳转到列表页
        // if(this.timer) {
        //     window.clearTimeout(this.timer);
        // }
        // this.timer = setTimeout(this.goTo.bind(this, '/templateMag'), 5000)
    }

    formSubmit(params, fileParam) {
        this.setState({spinning: true});
        this.props.saveTemplate({
            data: params,
            callback: this.spinningCallBack
        }, fileParam);
    }

    render(){
        return (
            <div className="templateEdit">
                <Spin spinning={this.state.spinning}>
                <Row>
                    <Col xs={24} sm={22} >
                        <FormField templateVO={this.props.templateVO}
                        checkExist={this.checkExist}
                        isEditPage={this.props.match.params.templateId ? true:false}
                        formSubmit={this.formSubmit}/>
                    </Col>
                    <Col xs={24} sm={2} >
                        <Link to="/templateMag"><Button type="primary">返回</Button></Link>
                    </Col>
                </Row>
                </Spin>
            </div>
        )
    }
}

const mapStateToProps =(state) => {
    return {
        templateVO: state.templateMag.templateVO
    };
}

export default connect(mapStateToProps,{loadTemplate, saveTemplate, checkExist, 
        setTemplateStatus, clearTemplateVO})(TemplateEdit);
