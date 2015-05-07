var React = require('react');

class Comp extends React.Component {
  constructor() {
    super(arguments);
    this.state = {};
    this.state.punctuation = '.';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      punctuation: React.findDOMNode(this.refs.thevalue).value
    });
  }

  renderMessage() {
    return this.props.message + this.state.punctuation;
  }

  render() {
    return (
      <div>
        <h1>{this.renderMessage()}</h1>
        <input ref="thevalue" type="text" defaultValue="." />
        <button onClick={this.handleClick}>Change Punctuation</button>
      </div>
    )
  }
}

var msg = "Hello, y'all";

React.render(<Comp message={msg} />, document.getElementById('app'));

