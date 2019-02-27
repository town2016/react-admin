import {CommonUtil} from "../common/commonUtil.ts";

export class TemplateVO {
    key: number;
    templateId: number;
    templateName: string;
    templateCode: string;
    templateStatus: number;
    templateStatusStr: string;
    templateXlsFileName: string;
    templateDocFileName: string;
    modifiedTime: string;
    modifiedOperator: string;
    description: string;
    templateIdentifierCodeExist: boolean;
    constructor(data){
        this.key = this.templateId = data.templateId;
        this.templateName = data.templateName;
        this.templateCode = data.templateIdentifierCode;
        this.templateStatus = data.templateStatus;
        this.templateStatusStr = CommonUtil.templateStatusDesc(data.templateStatus);
        this.templateXlsFileName = data.templateRuleOriginalFileName;
        this.templateDocFileName = data.templateExplainOriginalFileName;
        this.modifiedTime = CommonUtil.formatDate(data.updateTime);
        this.modifiedOperator = data.updateUser;
        this.description = data.description;
        this.templateIdentifierCodeExist = false; //初始化不存在编码冲突
    }

    static fromJSON(datas): Array<TemplateVO>  {
        let templates: Array<TemplateVO> = new Array<TemplateVO>();
        datas && datas.map((item)=>{
            templates.push(new TemplateVO(item));
        })
        return templates;
    }
}
