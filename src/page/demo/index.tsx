import React from 'react';
// import { Upload } from 'antd';
import A from './A';
import B from './B';
import C from './C';

class Demo extends React.Component {
  constructor(props: any) {
    super(props);
    console.log('demo constructor');
  }
  componentDidMount() {
    console.log('Demo componentDidMount');
  }
  componentDidUpdate() {
    console.log('Demo componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('Demo componentWillUnmount');
  }
  render() {
    console.log('demo render');
    return (
      <div>
        Demo
        <A />
        {/* <A>
          <B>
            <C />
          </B>
        </A> */}
      </div>
    );
  }
}

export default Demo;
