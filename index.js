import assign from 'lodash/object/assign'
import clone from 'lodash/lang/clone'
import autobind from 'autobind-decorator'
import React from 'react'
import EventEmitter from 'events'

var ProfileStore = assign({}, EventEmitter.prototype, {
  getProfile () {
    return clone(this.profile)
  },
  setProfile (profile) {
    this.profile = profile
    this.emit('change')
  },
  isProfileSet () {
    return !!this.profile
  },
  listen (listener) {
    this.addListener('change', listener)
  },
  unlisten (listener) {
    this.removeListener('change', listener)
  }
})

@autobind
class App extends React.Component {
  constructor () {
    super(arguments)
    this.state = this.getStateFromStore()
  }

  componentDidMount () {
    ProfileStore.listen(this.onStoreChange)
  }

  componentWillUnmount () {
    ProfileStore.unlisten(this.onStoreChange)
  }

  onStoreChange () {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore () {
    return {
      profile: ProfileStore.getProfile()
    }
  }

  updateProfile (profile) {
    profile.submitted = !this.state.submitted
    ProfileStore.setProfile(profile)
  }

  render () {
    if (this.state.profile && this.state.profile.submitted) {
      return (
        <ProfileInfo profile={this.state.profile} handleLogOut={this.updateProfile} />
      )
    } else {
      return <RegisterForm handleSubmit={this.updateProfile} />
    }
  }
}

@autobind
class RegisterForm extends React.Component {
  constructor () {
    super(arguments)
  }

  handleSubmit (e) {
    e.preventDefault()

    let first = React.findDOMNode(this.refs.first).value
    let last = React.findDOMNode(this.refs.last).value
    let email = React.findDOMNode(this.refs.email).value

    this.props.handleSubmit({first, last, email})
  }

  render () {
    return (
      <div>
        <h1>Register yo self</h1>
        <label for="first">First Name</label><br />
        <input ref="first" type="text" /><br />
        <label for="last">Last Name</label><br />
        <input ref="last" type="text" /><br />
        <label for="email">Email</label><br />
        <input ref="email" type="text" /><br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

@autobind
class ProfileInfo extends React.Component {
  constructor () {
    super(arguments)
  }

  handleLogOut (e) {
    e.preventDefault()
    this.props.handleLogOut({})
  }

  render () {
    return (
      <div>
        <h1>Your Profile</h1>
        <p>First Name: {this.props.profile.first}</p>
        <p>Last Name: {this.props.profile.last}</p>
        <p>Email: {this.props.profile.email}</p>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}

React.render(<App />, document.getElementById('app'))
