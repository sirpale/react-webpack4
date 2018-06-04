import React, {Component} from 'react';

class Bundle extends Component {
  state = {
    mod: null
  };

  load(props) {
    this.setState({mod:null});

    props.load(mod => {
      this.setState({mod: mod.default ? mod.default: mod});
    });
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  render() {
    return this.props.children(this.state.mod);
  }
}


export default Bundle;