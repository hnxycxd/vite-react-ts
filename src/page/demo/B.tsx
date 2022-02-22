import * as React from 'react';

class B extends React.Component {
  constructor(props: any) {
    super(props);
    console.log('B constructor');
  }
  componentDidMount() {
    console.log('B componentDidMount');
  }
  componentWillUnmount() {
    console.log('B componentWillUnmount');
  }

  render(): React.ReactNode {
    console.log('B render');
    return <div>B{this.props.children}</div>;
  }
}

export default B;
