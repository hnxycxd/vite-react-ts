import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../layout/header';
import routeList from './data';
import 'assets/less/reset.less';

const rootRoute = () => {
  const { menuRoute, mainRoute } = routeList;

  return (
    <BrowserRouter>
      {/* <Header route={menuRoute} /> */}
      <Suspense fallback={<div>loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default rootRoute;
