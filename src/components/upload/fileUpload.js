import React, {Component} from 'react';
import {Upload, Button, Icon, message} from 'antd';
import SERVER_URL from '../../modelconfig/common/serverURL';
import {FileOperateEnum, FileType} from '../../modelconfig/common/commonUtil.ts';
import '../../resource/css/index.less';
const FILENAME_LENGTH = 64;
class FileUpload extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.state = {
            templateVO: {},
            fileList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        let templateVO = nextProps.templateVO;
        if(this.props.templateVO !== templateVO) {
            this.setState({
                templateVO: {...templateVO}
            });
        }
    }

    checkFileType(fileType, file) {
        let dotIndex = file["name"].lastIndexOf('.');
        if (dotIndex > -1 ) {
            let fileTail = file["name"].substring(dotIndex + 1);
            switch(fileType) {
                case FileType.Xls:
                    return /^xlsx$/.test(fileTail);
                case FileType.Doc:
                    return /^(doc|docx)$/.test(fileTail);
                default:
                    return false;
            }
        }
        return false;
    }

    checkFileNameLength(file) {
        if(file && file["name"].length > FILENAME_LENGTH) {
            message.warning("文件长度最多只能为"+FILENAME_LENGTH+"个字符");
            return false;
        }
        return true;
    }

    showWarnMessage(fileType) {
        switch(fileType) {
            case FileType.Xls:
                message.warning("模板文件扩展名只能为.xlsx");
                break;
            case FileType.Doc:
                message.warning("文档文件扩展名只能为.doc,.docx");
                break;
            default:
                break;
        }
    }

    handleChange = (info) => {
        if(info.fileList.length > 1) {
            message.warning("只允许上传一份文件");
        }
        if(this.checkFileNameLength(info.file) && this.checkFileType(this.props.uploadInfo.fileType, info.file)) {
            let lastedFileList = (info.fileList || []).slice(0, 1);
            this.setState({fileList: lastedFileList});
            let params = {}, fileType = this.props.uploadInfo.fileType;
            params[fileType] = lastedFileList[0];
            this.fileNameChange(info.file["name"], fileType);
            this.props.fileListChange(FileOperateEnum.Add, fileType, params);
        } else {
            this.showWarnMessage(this.props.uploadInfo.fileType);
        }
    }

    fileNameChange(fileName, fileType) {
        let templateVO = this.state.templateVO;
        switch(fileType){
            case 'templateXls':
                templateVO.templateXlsFileName = fileName;
            break;
            case 'templateDoc':
            templateVO.templateDocFileName = fileName;
            break;
            default:
            break;
        }
        this.setState(templateVO);
    }

    handleRemove = (file)=> {
        this.setState(state => {
            const index = this.state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            let fileParam = {}, fileType = this.props.uploadInfo.fileType;
            fileParam[fileType] = null;
            this.fileNameChange("", fileType);
            this.props.fileListChange(FileOperateEnum.Remove, fileType, fileParam);
            return {
                fileList: newFileList,
            };
        });
    }

    beforeUpload = (file) => {
        return false;
    }

    uProps = {
        name:'file',
        accept: this.props.uploadInfo.accept,
        multiple: false,
        action: SERVER_URL.saveTemplate,
        beforeUpload: this.beforeUpload,
        onRemove: this.handleRemove,
        onChange: this.handleChange
    };

    render() {
        const templateVO  = this.state.templateVO;
        return (<div className="fileUpload">
            <input id="fileUploadText" type="text" className="fileUpload-input-text" readOnly
                value={(this.props.uploadInfo.fileType === 'templateXls' ? 
                templateVO.templateXlsFileName : templateVO.templateDocFileName) || ''} />
            <Upload {...this.uProps} fileList={this.state.fileList}>
                <Button>
                    <Icon type="upload"/>上传
                </Button>
            </Upload>
            <style>
            {`
            .fileUpload-input-text {
                width: 164px;
                height: 32px;
                border-radius: 4px;
                border: 1px solid #e3e3e3;
                margin-right:10px;
            }
            `}
        </style>
        </div>);
    }
}
export default FileUpload;