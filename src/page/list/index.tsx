import React, { Suspense, useEffect } from 'react';
import { Menu } from 'antd';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps {
  subRoute: IRouteItem[];
}
type TSubMenu = IRouteItem & { children: IRouteItem };

const List: React.FC<IProps> = (props) => {
  const {
    subRoute,
    history,
    location: { pathname },
  } = props;

  // 点击菜单跳转
  const handleClick = (value: MenuInfo) => {
    history.push(value.key);
  };

  // 渲染 左侧子菜单
  const renderSubMenu = (data: TSubMenu) => (
    <SubMenu key={data.key} title={data.name}>
      {data.children.map((item: IRouteItem) => {
        if (item.children?.length) {
          return renderSubMenu(item as TSubMenu);
        }
        return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
      })}
    </SubMenu>
  );

  // 渲染 子路由
  const renderSubRoute: (data: IRouteItem[]) => any = (data) => {
    return data.map((item: IRouteItem) => {
      if (item.children?.length) {
        return renderSubRoute(item.children);
      }
      return (
        <Route
          key={item.key}
          path={item.path}
          exact={item.exact}
          render={(prop) => <item.component {...prop} />}
        />
      );
    });
  };

  useEffect(() => {
    if (pathname === '/list') {
      history.push('/list/side1/op1');
    }
  }, [pathname]);

  console.log('list components', props);
  return (
    <div style={{ height: 'calc(100% - 64px)', display: 'flex', justifyContent: 'space-between' }}>
      <div className="sideMenu" style={{ height: '100%' }}>
        <Menu
          mode="inline"
          onClick={handleClick}
          defaultOpenKeys={['side1']}
          selectedKeys={[pathname]}
          style={{ width: 256, height: '100%' }}
        >
          {subRoute?.map((item) => {
            if (item.children?.length) {
              return renderSubMenu(item as TSubMenu);
            }
            return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
          })}
        </Menu>
      </div>
      <div style={{ width: 'calc(100% - 256px - 10px)', backgroundColor: 'white' }}>
        <Suspense fallback={null}>
          <Switch>{renderSubRoute(subRoute)}</Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default List;
