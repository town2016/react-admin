import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { storages } from 'utils/common'
const auth = JSON.parse(storages.get('menuMap'))

@withRouter
class AuthComp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      component: null
    }
  }
  render () {
    var match = this.props.match
    var path = match.path
    if (Object.keys(match.params).length > 0) {
      path = path.split('/:')[0]
    }
    var curAuth = auth[path] || {}
    return curAuth[this.props.auth] ? (this.props.render) : null
  }
}


export default AuthComp
