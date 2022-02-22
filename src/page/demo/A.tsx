import * as React from 'react';

class A extends React.Component {
  constructor(props: any) {
    super(props);
    console.log('A constructor');
  }
  componentDidMount() {
    console.log('A componentDidMount');
  }
  componentWillUnmount() {
    console.log('A componentWillUnmount');
  }

  render(): React.ReactNode {
    console.log('A render');
    return <div>A{this.props.children}</div>;
  }
}

export default A;
