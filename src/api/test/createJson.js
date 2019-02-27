import Mock from 'mockjs';
let Random = Mock.Random;
export function createOrder() {
    return {
        title: Random.cword(10,20),
        customerCode: Random.integer(12),
        customerName: Random.cword(12, 15),
        updateTime: Random.date('yyyy-MM-dd')
    }
}