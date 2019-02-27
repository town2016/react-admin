import React, { Component } from 'react'
let AsyncComponent = function (importComponent)  {
  return class mergeComponent extends Component {
    constructor (props) {
      super(props)
      this.state = {
        component: null
      }
    }
    
    render () {
      let Component = this.state.component
      return Component ? <Component {...this.props}/> : null
    }
    
    async componentDidMount () {
      let _importCom = await importComponent()
      let component = _importCom.default
      this.setState({
        component
      })
    }
    
  }
}

export default AsyncComponent
