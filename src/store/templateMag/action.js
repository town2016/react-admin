import * as actionType from './actionType';
import {TemplateVO} from '../../modelconfig/templateMag/templateVO.ts';
import {Pagination} from '../../modelconfig/common/pagination.ts';
import {CommonUtil, STATUS_CODE, INIT_TEMPLATEVO} from '../../modelconfig/common/commonUtil.ts';
import SERVER_URL from '../../modelconfig/common/serverURL';
import {message} from 'antd';
export const queryTemplates = (params) => {
    return async dispatch => {
        try {
            await global.fetch.get(SERVER_URL.queryTemplates, params.data)
                .then((response)=> {
                    if(response.code === STATUS_CODE.SUCCESS) {
                        params.spinningCall({spinning: false});
                        let templateVOList = TemplateVO.fromJSON(response.data.list);
                        let pagination = Pagination.fromJSON(response.data);
                        dispatch({
                            type: actionType.queryTemplates,
                            data: {
                                templateVOList,
                                pagination
                            }
                        })
                    } else {
                        this.printMessage(response);
                    }
                }, (err)=> {
                    console.error(err);
                });
        } catch(err) {
            throw err;
        }
    }
}

export const printMessage = (response) => {
    console.log(response.message || response.exception);
}

export const loadTemplate = (params) => {
    return async dispatch => {
        try {
            await global.fetch.get(SERVER_URL.loadTemplate, params)
                .then((response)=> {
                    if(response.code === STATUS_CODE.SUCCESS) {
                        let templateVO = new TemplateVO(response.data);
                        dispatch({
                            type: actionType.loadTemplate,
                            data: templateVO
                        })
                    } else {
                        this.printMessage(response);
                    }
                }, (err)=> {
                    console.error(err);
                });
        } catch(err) {
            throw err;
        }
    }
}

export const saveTemplate = (params, fileParam) => {
    return async dispatch => {
        try {
            let postData = CommonUtil.getFormData({...params.data, ...fileParam, 
                    updateUser: CommonUtil.getUserAccount()});
            await global.fetch.post(SERVER_URL.saveTemplate, postData)
                .then((response)=> {
                    params.callback({spinning: false});
                    if(response.code === STATUS_CODE.SUCCESS) {
                        message.success('保存成功');
                    }else {
                        this.printMessage(response);
                    }
                }, (err)=> {
                    console.error(err);
                });
        } catch(err) {
            throw err;
        }
    }
}

export const checkExist = (params) => {
    return async dispatch => {
        try {
            let checkUrl = global.fetch.appendUrl(SERVER_URL.checkExist, 
                    {templateIdentifierCode: params.templateIdentifierCode});
            await global.fetch.get(checkUrl)
                .then((response)=> {
                    if(response.code === STATUS_CODE.SUCCESS) {
                        if(response.data === true) {
                            params.callback('模板编码已经存在');
                        } else {
                            params.callback();
                        }
                    }else {
                        this.printMessage(response);
                    }
                }, (err)=> {
                    console.error(err);
                });
        } catch(err) {
            throw err;
        }
    }
}

export const setTemplateStatus = (record, templateList) => {
    return async dispatch => {
        try {
            let params = CommonUtil.getFormData({
                templateId: record.templateId,
                templateStatus: CommonUtil.getOpposedStatus(record.templateStatus),
                uuid: CommonUtil.uuid()
              })
            await global.fetch.post(SERVER_URL.setTemplateStatus, params)
                .then((response)=> {
                    if(response.code === STATUS_CODE.SUCCESS) {
                        message.success("状态更新成功.");
                        dispatch({
                            type: actionType.setTemplateStatus,
                            data: CommonUtil.setTemplateStatus(record, templateList)
                        })
                    } else {
                        this.printMessage(response);
                    }
                }, (err)=> {
                    console.error(err);
                });
        } catch(err) {
            throw err;
        }
    }
}

export const clearTemplateVO = () => {
    return async dispatch => {
        try {
            await dispatch({
                type: actionType.clearTemplateVO,
                data: INIT_TEMPLATEVO
            })
        } catch(err) {
            throw err;
        }
    }
}