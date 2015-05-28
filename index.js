import React from 'react'


class SelfRegistration extends React.Component {
  constructor() {
    super(arguments)
    this.state = {}
    this.updateProfile = this.updateProfile.bind(this)
  }

  updateProfile (first, last, email) {
    this.setState({
      submitted: !this.state.submitted,
      first,
      last,
      email
    })
  }

  render() {
    if (this.state.submitted) {
      return (
        <ProfileInfo
          first={this.state.first}
          last={this.state.last}
          email={this.state.email}
          handleLogOut={this.updateProfile} />
      )
    } else {
      return <RegisterForm handleSubmit={this.updateProfile} />
    }
  }
}

class RegisterForm extends React.Component {
  constructor() {
    super(arguments)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    let first = React.findDOMNode(this.refs.first).value
    let last = React.findDOMNode(this.refs.last).value
    let email = React.findDOMNode(this.refs.email).value

    this.props.handleSubmit(first, last, email)
  }

  render() {
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

class ProfileInfo extends React.Component {
  constructor() {
    super(arguments)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut (e) {
    e.preventDefault()
    this.props.handleLogOut('', '', '')
  }

  render() {
    return (
      <div>
        <h1>Your Profile</h1>
        <p>First Name: {this.props.first}</p>
        <p>Last Name: {this.props.last}</p>
        <p>Email: {this.props.email}</p>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}

React.render(<SelfRegistration />, document.getElementById('app'))
