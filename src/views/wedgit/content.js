import React, { Component } from 'react'
import '../../asset/less/wedgit/content.less'
import { withRouter } from 'react-router-dom'
import Toper from './toper'
import CustomRouter from '../../router'
import BreadcrumbInfo from '@/components/breadcrumb/breadcrumb';

@withRouter
class Content extends Component {
	render () {
		return (
			<div className='Content flex-1 flex flex-v'>
				<Toper />
				<div className='mainContent'>
					<div className='content-inner'>
						<BreadcrumbInfo {...this.props}/>
						<CustomRouter />
					</div>
				</div>
			</div>
		)
	}
}

export default Content
