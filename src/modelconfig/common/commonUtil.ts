import moment from 'moment';
import Cookie from 'js-cookie'
const TEMPLATE_STATUS = {
    Enable: 1,
    Disable: 0
};
const TEMPLATE_STATUS_DESC = {
    0: '禁用',
    1: '启用'
};

export const STATUS_CODE = {
    SUCCESS: 200
}

export const FileOperateEnum = {
    Add: 1,
    Remove: 0
};

export const FileType = {
    Xls: "templateXls",
    Doc: "templateDoc"
};

export const INIT_TEMPLATEVO = {
    templateId: '',
    templateName: '',
    templateCode: '',
    templateStatus: '',
    description: '',
    xls: [],
    doc: []
};

export class CommonUtil {
    static formatDate(timeString): string {
        return moment(timeString).format("YYYY-MM-DD");
    }

    static getOpposedStatus(status): number {
        switch(status) {
            case TEMPLATE_STATUS.Enable:
                return TEMPLATE_STATUS.Disable;
            case TEMPLATE_STATUS.Disable:
                return TEMPLATE_STATUS.Enable;
            default:
                return TEMPLATE_STATUS.Disable;
        }
    }

    static uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }

    static templateStatusDesc(status): string {
        return TEMPLATE_STATUS_DESC[status] ? TEMPLATE_STATUS_DESC[status]: TEMPLATE_STATUS_DESC[0];
    }

    static setTemplateStatus(record, templateList) {
        let newTemplates = [].concat(templateList);
        for(let key in newTemplates) {
            if(record.templateId === newTemplates[key].templateId) {
                newTemplates[key].templateStatus = CommonUtil.getOpposedStatus(record.templateStatus);
                newTemplates[key].templateStatusStr = CommonUtil.templateStatusDesc(record.templateStatus)
                break;
            }
        }
        return newTemplates;
    }

    static isActualEntity(obj) {
        return Object.keys(obj).length > 0;
    }

    static getFormData(param) {
        let formData = new FormData();
        param && Object.keys(param).forEach(key => {
            formData.append(key, param[key]);
        });
        return formData;
    }

    static getCurrUser() {
        return JSON.parse(Cookie.get("user"));
    }
    static getUserAccount() {
        return this.getCurrUser().loginAccount;
    }
}