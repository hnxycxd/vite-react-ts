import * as React from 'react';
import { Image } from 'antd';
import { getPageName } from 'src/utils';
// import imgs from 'assets/img/test.png';

const Chart = () => {
  function getImageUrl(name: any) {
    return new URL(`../../assets/img/${name}.png`, import.meta.url).href;
  }
  return (
    <div>
      <Image.PreviewGroup>
        {new Array(30).fill({}).map((it, i) => (
          <Image key={i} src={getImageUrl(`m${i + 1}`)} />
        ))}
        {/* <img src={require(`assets/img/m${i + 1}`)} alt="img" /> */}
      </Image.PreviewGroup>
    </div>
  );
};

export default Chart;

// {/* <img src={getImageUrl(`m${i + 1}`)} loading="lazy" alt="img" /> */}
