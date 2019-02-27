import React, {Component} from 'react';
import menuList from '@/router/routes';
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';

class BreadcrumbInfo extends Component {
    constructor(props) {
        super(props);
        this.getBreadcrumbPath = this.getBreadcrumbPath.bind(this);
        this.buildBreadcrumb = this.buildBreadcrumb.bind(this);
    }

    getCurrentRoute(pathName) {
        for(let menu of menuList) {
            if(pathName === menu.id) {
                return menu;
            }
        }
        return null;
    }

    getBreadcrumbPath(pathName) {
        let currentRoute = this.getCurrentRoute(pathName),
            breadcrumbPath = [];
        currentRoute && currentRoute.keyPath.map(path => {
            breadcrumbPath.push(this.getCurrentRoute(path));
        });
        return breadcrumbPath;
    }

    buildBreadcrumb(params) {
       let breadcrumbPaths = this.getBreadcrumbPath(params.pathName);
       return(<Breadcrumb separator='>'>
            {breadcrumbPaths.map((item, index, arr) => (
                index === (arr.length-1) ? <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item> :
                <Breadcrumb.Item key={item.id}><Link to={item.path}>{item.name}</Link></Breadcrumb.Item>
            ))}
        </Breadcrumb>)
    }
    
    render(){
        return(this.buildBreadcrumb(this.props.match.params));
    };
}

export default BreadcrumbInfo;
