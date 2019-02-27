import React, { Component } from 'react'

class Global extends Component {
  constructor (props) {
    super(props)
    this.state = {
      a: 1
    }
    this._alrt = this._alrt
  }
  _alrt() {
    console.log(23423)
  }
  render () {
    return null
  }
}

export default Global