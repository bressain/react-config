import autobind from 'autobind-decorator'
import React from 'react'
import appDispatcher from './app-dispatcher'
import profileStore from './profile-store'
import axios from 'axios'

var apiHelpers = {
  createProfile (profile) {
    function serialize (rawProfile) {
      return {
        data: {firstName: rawProfile.first, lastName: rawProfile.last, email: rawProfile.email, type: 'users'}
      }
    }

    function deserialize (apiProfile) {
      return {first: apiProfile.data.firstName, last: apiProfile.data.lastName, email: apiProfile.data.email}
    }

    axios({
      method: 'post',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      data: serialize(profile)
    }).then(res => {
      console.log('res.data', res.data)
      var newProfile = deserialize(res.data)
      profileActions.createProfileSuccess(newProfile)
    })
  }
}

var profileActions = {
  createProfile (profile) {
    apiHelpers.createProfile(profile)
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE',
      profile
    })
  },
  createProfileSuccess (profile) {
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE_SUCCESS',
      profile
    })
  },
  resetProfile () {
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE_SUCCESS',
      profile: {}
    })
  }
}

@autobind
class App extends React.Component {
  constructor () {
    super(arguments)
    this.state = this.getStateFromStore()
  }

  componentWillMount () {
    profileStore.listen(this.onStoreChange)
  }

  componentWillUnmount () {
    profileStore.unlisten(this.onStoreChange)
  }

  onStoreChange () {
    this.setState(this.getStateFromStore())
  }

  getStateFromStore () {
    return {
      profile: profileStore.getProfile(),
      submitted: profileStore.getSubmitted()
    }
  }

  render () {
    return profileStore.getSubmitted() ? <ProfileInfo /> : <RegisterForm />
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

    profileActions.createProfile({first, last, email})
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
    profileActions.resetProfile()
  }

  render () {
    var profile = profileStore.getProfile()
    return (
      <div>
        <h1>Your Profile</h1>
        <p>First Name: {profile.first}</p>
        <p>Last Name: {profile.last}</p>
        <p>Email: {profile.email}</p>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}

React.render(<App />, document.getElementById('app'))
