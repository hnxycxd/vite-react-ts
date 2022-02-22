import * as React from 'react';

const content: React.FC = (props) => {
  return <div style={{ height: 'calc(100% - 65px)', overflowY: 'scroll' }}>{props.children}</div>;
};

export default content;
