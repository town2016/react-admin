import BASE_URL from '../../envconfig/envconfig';
const SERVER_URL = {
    queryTemplates: BASE_URL.proxyURL + 'template/get_template_list',
    loadTemplate: BASE_URL.proxyURL + 'template/get_template',
    getTemplateFile: BASE_URL.absoluteURL + 'template/get_template_file',
    saveTemplate: BASE_URL.proxyURL + 'template/save_template',
    checkExist: BASE_URL.proxyURL + 'template/identifierCode_is_exist',
    setTemplateStatus: BASE_URL.proxyURL + 'template/set_template_status'
};
export default SERVER_URL;