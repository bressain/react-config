import autobind from 'autobind-decorator'
import React from 'react'
import profileStore from './profile-store'
import profileActions from './profile-actions'

var styles = {
  form: {
    float: 'left',
    width: '300px'
  },
  sidebar: {
    overflow: 'auto'
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
    profileActions.getRegisteredProfiles()
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
      submitted: profileStore.getSubmitted(),
      registeredProfiles: profileStore.getRegisteredProfiles()
    }
  }

  renderProfile () {
    return profileStore.getSubmitted() ? <ProfileInfo /> : <RegisterForm />
  }

  render () {
    return (
      <div>
        {this.renderProfile()}
        <RegisteredProfiles />
      </div>
    )
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
      <div style={styles.form}>
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
      <div style={styles.form}>
        <h1>Your Profile</h1>
        <p>First Name: {profile.first}</p>
        <p>Last Name: {profile.last}</p>
        <p>Email: {profile.email}</p>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}

@autobind
class RegisteredProfiles extends React.Component {
  constructor() {
    super(arguments)
  }

  renderRegisteredProfiles () {
    var profiles = profileStore.getRegisteredProfiles()
    return profiles.map((x, i) => {
      return <li key={i}>{x.first + ' ' + x.last + ' ' + x.email}</li>
    })
  }

  render () {
    return (
    <div style={styles.sidebar}>
      <h1>Registered Profiles</h1>
      <ul>
        {this.renderRegisteredProfiles()}
      </ul>
    </div>
    )
  }
}

React.render(<App />, document.getElementById('app'))
