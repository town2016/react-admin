import React, {Component} from 'react';
import {getOrders, postOrder, delOrder} from '@/api/test/testAPI';
import {Table, Button, Icon, message} from 'antd';
import {createOrder} from '@/api/test/createJson';
import './index.less';
class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.query = this.query.bind(this);
        this.delRecord = this.delRecord.bind(this);
    }
    componentDidMount() {
        this.query();
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: '16%'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '16%'
        },
        {
            title: '客户编码',
            dataIndex: 'customerCode',
            key: 'customerCode',
            width: '16%'
        },
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '16%'
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: '16%'
        },
        {
            title: '操作',
            width: 'auto',
            render: (record) => {
                return (<a href="javascript:void(0)" onClick={()=>{this.delRecord(record)}}>删除</a>)
            }
        }
    ];

    query() {
        getOrders().then(response => {
            let orders = response;
            this.setState({orders});
        });
    }

    addSingleData(e) {
        let param = createOrder();
        postOrder(param).then(response => {
            let orders = [response, ...this.state.orders];
            this.setState({orders});
            message.success('操作成功');
        })
    }

    delRecord(record) {
        delOrder({id:record.id}).then(response =>{
            let orders = [...this.state.orders];
            for(let i =0, len =orders.length;i < len; i++) {
                if(record.id === orders[i].id) {
                    orders.splice(i, 1);
                    break;
                }
            }
            this.setState({orders});
            message.success('操作成功');
        })
    }

    render() {
        return(<div>
            <div style={{height:30}} className="mock"> 前端mock数据测试，json-server + mockjs</div>
            <div className="operation-zone">
                <Button onClick={(e)=>{this.addSingleData(e)}}><Icon type="plus"/></Button>
            </div>
            <Table rowKey="id" dataSource={this.state.orders} columns={this.columns} 
            size="middle" bordered/>
            <style>
                {`
                .mock{
                    margin: 20px 0;
                    font-size: 18px;
                    font-weight: 900;
                }
                `}
            </style>
        </div>
        );
    }
}
export default TestPage;