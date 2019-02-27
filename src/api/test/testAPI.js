
export function getTemplates() {
    return global.fetch.get('/mock/get_templates', null, {mock:true});
}

export function getOrders() {
    return global.fetch.get('/mock/orders', null, {mock:true});
}

export function postOrder(param) {
    return global.fetch.post('/mock/orders', param, {mock:true});
}

export function delOrder(param) {
    return global.fetch.delete('/mock/orders/'+param.id, {mock:true});
}