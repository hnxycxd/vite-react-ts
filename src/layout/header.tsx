import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { getPageName } from 'src/utils';
import './style.less';

const { Header } = Layout;

interface IProps {
  route: IRouteItem[];
}

const HeadMenu = (props: IProps) => {
  const { route } = props;
  const history = useHistory();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string>('');

  const menuClick = (menu: { key: string }) => {
    history.push(`/${menu.key}`);
    setSelectedKeys(menu.key);
  };

  useEffect(() => {
    const [, key] = location.pathname.split('/');
    setSelectedKeys(key);
  }, [location.pathname]);

  // console.log('getPageName', getPageName());
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKeys]} onClick={menuClick}>
          {route.map((item) => {
            return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
          })}
        </Menu>
      </Header>
    </Layout>
  );
};
export default HeadMenu;
