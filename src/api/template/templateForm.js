export const templateFields = [
    {
        elemType: 'input',
        label: '模板名称',
        prop: 'templateName',
        attrs: {
            placeholder: '请输入模板名称'
        },
        rules: [
            {
                required: true,
                whitespace: true,
                message: '请输入模板名称'
            },
            {
                type: 'string',
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9-_]+$/ig,
                message: '模板名称仅支持汉子，字母，数字，符号 - _'
            },{
                max: 30,
                message: '最多不超过30个字符'
            }]
    },
    {
        elemType: 'input',
        label: '模板标识',
        prop: 'templateCode',
        attrs: {
            placeholder: '请输入模板标识'
        },
        rules: [{required: true,
                whitespace: true,
                message: '请输入模板标识'
                },
                {
                    type: 'string',
                    pattern: /^[a-zA-Z0-9-_]+$/ig,
                    message: '模板标识仅支持字母，数字，符号 - _'
                },
                {
                    max: 30,
                    message: '最多不超过30个字符'
                }
            ]
    },
    {
        elemType: 'radio',
        label: '状态',
        prop: 'templateStatus',
        rules: [{required: true, message: '请选择状态'}]
    },
    {
        elemType: 'upload',
        label: '上传模板',
        prop: 'templateXls',
        info: {
            accept: '.xlsx',
            fileType: 'templateXls'
        },
        attrs: {
        },
        rules: [{required: true, message: '请上传模板文件'}]
    },
    {
        elemType: 'upload',
        label: '上传文档',
        prop: 'templateDoc',
        info: {
            accept: '.doc;.docx',
            fileType: 'templateDoc'
        },
        attrs: {
        },
        rules: [{required: true, message: '请上传文档文件'}]
    },
    {
        elemType: 'textarea',
        label: '说明',
        prop: 'description',
        attrs: {
            placeholder: '请输入描述，最多不超过200个字符'
        },
        rules: [{
            max: 200,
            message: '最多不超过200个字符'
        }]
    }
];
