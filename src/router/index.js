import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from './components';
import menuList from './routes';
import Home from '../views/wedgit/home'
import PrivateRoute from '@/components/privateRoute/privateRoute'
class CRouter extends Component {
    render() {
      const routes = []
        var createRoute = (list) => {
          list.map( r => {
              const route = r => {
                  const Component = AllComponents[r.component]
                  return (
                      <PrivateRoute
                          key={r.path || r.id}
                          exact
                          path={r.path || r.id}
                          render={props => {
                              return (<Component {...props} />)
                          }}
                      />
                  )
              }
              if (r.component) {
                routes.push(route(r))
              } else {
                createRoute(r.subs)
              }
              return this
          })
        }
        routes.unshift(<Route exact key='default' path='/home' component={Home}/>)
        createRoute(menuList)
        return (
          <Switch>
            {routes}
            <Redirect key='redirect' to='/home' />
          </Switch>
        )
    }
}
export default CRouter
