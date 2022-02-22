import * as React from 'react';

class C extends React.Component {
  constructor(props: any) {
    super(props);
    console.log('C constructor');
  }
  componentDidMount() {
    console.log('C componentDidMount');
  }
  componentWillUnmount() {
    console.log('C componentWillUnmount');
  }

  render(): React.ReactNode {
    console.log('C render');
    return <div>C</div>;
  }
}

export default C;
