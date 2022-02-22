import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Header from '../layout/header';
import Content from '../layout/content';
import routeList from './data';

const baseSize = 14;
const RootRoute = () => {
  const { mainRoute } = routeList;
  const setRem = debounce(() => {
    console.log('--setRem');
    const proportion = document.documentElement.clientWidth / 375;
    document.documentElement.style.fontSize = proportion * baseSize + 'px';
  }, 500);

  // useLayoutEffect(() => {
  //   setRem();
  //   window.addEventListener('resize', setRem);
  //   return () => {
  //     window.removeEventListener('resize', setRem);
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Header route={mainRoute} />
      <Suspense fallback={null}>
        <Content>
          <Switch>
            {mainRoute.map((item) => {
              if (item.component) {
                return (
                  <Route
                    key={item.key}
                    path={item.path}
                    exact={item.exact}
                    render={(props) => <item.component {...props} subRoute={item.children} />}
                  />
                );
              }
              return null;
            })}
          </Switch>
        </Content>
      </Suspense>
    </BrowserRouter>
  );
};

export default RootRoute;
