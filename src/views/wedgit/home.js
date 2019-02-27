import React, { Component } from 'react'

class Home extends Component {
	render () {
		return (
			<div className='Home'>
				<h1>WELCOME TO LOGO ORDER SYSTEM OF TOUNA&nbsp;&nbsp;<sub>--WJ</sub></h1>
				<style>
				  {
				    `
			     .Home h1{
  				      text-align: center;
                position: absolute;
                bottom: 500px;
                font-size: 20px;
                letter-spacing: 3px;
                width: 100%;
                line-height: 50px;
                font-weight: 400;
                -webkit-box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.0) 30%,rgba(250,250,250,0.5));
                box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.0) 30%,rgba(250,250,250,0.5));
                background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 169, 244, 1)), to(rgba(255, 189, 76, 1)));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
						 }
						 .ant-breadcrumb{
							 display:none
						 }
				    `
				  }
				</style>
			</div>
		)
	}
}

export default Home