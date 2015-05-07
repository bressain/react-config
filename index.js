var React = require('react');

class Comp extends React.Component {
  constructor() {
    super(arguments);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({
      submitted: true,
      first: React.findDOMNode(this.refs.first.refs.lf).value,
      last: React.findDOMNode(this.refs.last.refs.lf).value,
      email: React.findDOMNode(this.refs.email.refs.lf).value
    });
  }

  handleLogOut (e) {
    e.preventDefault();
    this.setState({
      submitted: false,
      first: '',
      last: '',
      email: ''
    });
  }

  render() {
    if (this.state.submitted) {
      return (
        <div>
          <h1>Your Profile</h1>
          <p>First Name: {this.state.first}</p>
          <p>Last Name: {this.state.last}</p>
          <p>Email: {this.state.email}</p>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Register yo self</h1>
          <LabelField ref="first" name="first" label="First Name" />
          <LabelField ref="last" name="last" label="Last Name" />
          <LabelField ref="email" name="email" label="Email" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      );
    }
  }
}

class LabelField extends React.Component {
  render () {
    return (
      <div>
        <label for="{this.props.name}">{this.props.label}</label><br />
        <input ref="lf" type="text" /><br />
      </div>
    );
  }
}

React.render(<Comp />, document.getElementById('app'));

