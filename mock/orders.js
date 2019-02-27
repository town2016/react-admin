let Mock = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
    let data = {
        orders: []
    };
    for(let i = 0; i < 10; i++) {
        data.orders.push({
            id: i + 1,
            title: Random.cword(10,20),
            customerCode: Random.integer(12),
            customerName: Random.cword(12, 15),
            updateTime: Random.date('yyyy-MM-dd')
        });
    }
    return data;
}