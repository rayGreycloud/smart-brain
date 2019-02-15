import React, { Component } from 'react';

class Rank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries !== this.props.entries) {
      this.generateEmoji(this.props.entries);
    }
  }

  generateEmoji = entries => {
    fetch(`https://n6izhqti99.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {this.props.entries}
        </div>
        <div className='white f3'>
          {`Rank Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}

export default Rank;
