import React, { Component } from 'react';
import './app.less'
import {HashRouter, Switch, Route}  from 'react-router-dom'
import Layout from './views/wedgit/layout'
import Login from './login'
class App extends Component {

  render() {
    
    return (
    	<HashRouter>
      		<div className="App" ref='app'>
  		    	<Switch>
  		    	 <Route exact path='/login' component={Login}/>
  		    	 <Route exact  path='/' component={Layout}/>
  		    	 <Route  path='/:pathName' component={Layout}/>
  		    	</Switch>
  		    </div>
    	</HashRouter>
    )
  }
}

export default App;
