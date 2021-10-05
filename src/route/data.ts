import { lazy } from 'react';

const menuRoute: IRouteItem[] = [
  {
    key: '',
    path: '/',
    exact: true,
    name: 'index',
    component: lazy(() => import('../page/index')),
  },
  {
    key: 'list',
    path: '/list',
    exact: false,
    name: 'list',
    component: lazy(() => import('../page/list')),
    children: [
      {
        key: 'side1',
        name: 'side1',
        children: [
          {
            key: 'op1',
            name: 'op1',
            exact: true,
            path: '/list/side1/op1',
            component: lazy(() => import('../page/list/op1')),
          },
          {
            key: 'op2',
            name: 'op2',
            exact: true,
            path: '/list/side1/op2',
            component: lazy(() => import('../page/list/op2')),
          },
        ],
      },
      {
        key: 'op3',
        name: 'op3',
        exact: true,
        path: '/list/op3',
        component: lazy(() => import('../page/list/op3')),
      },
      // {
      //   key: 'nav-two',
      //   name: 'nav-two',
      //   children: [
      //     {
      //       key: 'nav-two-2',
      //       name: 'nav-two-2',
      //       children: [
      //         {
      //           key: 'op3',
      //           name: 'op3',
      //           exact: true,
      //           path: '/list/nav2/op3',
      //           component: lazy(() => import('../page/list')),
      //         },
      //         {
      //           key: 'op3-2',
      //           name: 'op3-2',
      //           exact: true,
      //           path: '/list/nav2/op3-2',
      //           component: lazy(() => import('../page/list')),
      //         },
      //       ],
      //     },
      //     {
      //       key: 'op4',
      //       name: 'op4',
      //       exact: true,
      //       path: '/list/nav2/op4',
      //       component: lazy(() => import('../page/list')),
      //     },
      //   ],
      // },
    ],
  },
];

const otherRoute: IRouteItem[] = [
  {
    key: 'demo',
    path: '/demo',
    exact: true,
    name: 'demo',
    component: lazy(() => import('../page/demo')),
  },
];

const mainRoute = [...menuRoute, ...otherRoute];

export default {
  menuRoute,
  mainRoute,
};
