// import React, { useEffect, useRef, useState } from 'react';
// import G6 from '@antv/g6';
// import Graph from '@antv/g6-pc/lib/graph/graph.d';
// import { Item } from '@antv/g6-core/lib/types/index.d';

// const Index = () => {
//   const chartWrapRef = useRef<HTMLDivElement>(null);
//   const graphInstance = useRef<Graph | null>(null);
//   const [chartData, setChartData] = useState({});
//   const data = {
//     // 点集
//     nodes: [
//       {
//         id: 'node1', // String，该节点存在则必须，节点的唯一标识
//         x: 100, // Number，可选，节点位置的 x 值
//         y: 200, // Number，可选，节点位置的 y 值
//         label: '七点',
//       },
//       {
//         id: 'node2', // String，该节点存在则必须，节点的唯一标识
//         x: 300, // Number，可选，节点位置的 x 值
//         y: 200, // Number，可选，节点位置的 y 值
//         label: '中点',
//       },
//     ],
//     // 边集
//     edges: [
//       {
//         source: 'node1', // String，必须，起始点 id
//         target: 'node2', // String，必须，目标点 id
//       },
//     ],
//   };

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(
//         'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
//       );
//       await response.json();
//       setChartData({
//         name: 'A',
//         children: [
//           {
//             name: 'A-0',
//           },
//           {
//             name: 'A-1',
//             children: [
//               {
//                 name: 'A-1-0',
//               },
//             ],
//           },
//           {
//             name: 'A-2',
//           },
//         ],
//       });
//     }
//     fetchData();

//     G6.registerNode(
//       'tree-node',
//       {
//         drawShape: function drawShape(cfg, group) {
//           // console.log('cfg', cfg);
//           // console.log('group', group);
//           const rect = group!.addShape('rect', {
//             attrs: {
//               fill: '#fff',
//               stroke: '#666',
//               x: 0,
//               y: 0,
//               width: 100,
//               height: 30,
//             },
//             name: 'rect-shape',
//           });
//           const text = group!.addShape('text', {
//             attrs: {
//               text: cfg!.name,
//               x: 0,
//               y: 0,
//               textAlign: 'left',
//               textBaseline: 'middle',
//               fill: '#666',
//             },
//             name: 'text-shape',
//           });
//           const bbox = text.getBBox();
//           console.log('bbox', bbox);
//           rect.attr({
//             x: -bbox.width / 2 - 4,
//             y: -bbox.height / 2 - 6,
//             width: bbox.width + 26,
//             height: bbox.height + 12,
//           });
//           text.attr({
//             x: -bbox.width / 2,
//             y: 0,
//           });
//           return rect;
//         },
//         update: (cfg, item) => {
//           const group = item.getContainer();
//           const icon = group.find((e) => e.get('name') === 'collapse-icon');
//           icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
//         },
//       },
//       'single-node'
//     );
//   }, []);

//   useEffect(() => {
//     if (chartWrapRef.current && Object.keys(chartData).length) {
//       if (!graphInstance.current) {
//         graphInstance.current = new G6.TreeGraph({
//           container: chartWrapRef.current as HTMLElement,
//           fitView: true,
//           // fitViewPadding: 10,
//           // animate: true,
//           linkCenter: true,
//           modes: {
//             default: [
//               {
//                 type: 'collapse-expand',
//                 onChange: function onChange(item, collapsed) {
//                   const data = item?.get('model');
//                   graphInstance.current?.updateItem(item as Item, {
//                     collapsed,
//                   });
//                   data.collapsed = collapsed;
//                   return true;
//                 },
//               },
//               'drag-canvas',
//               'zoom-canvas',
//             ],
//           },
//           defaultNode: {
//             type: 'tree-node',
//             anchorPoints: [
//               [0, 0.5],
//               [1, 0.5],
//             ],
//           },
//           defaultEdge: {
//             type: 'line',
//             style: {
//               stroke: '#A3B1BF',
//             },
//           },
//           layout: {
//             type: 'compactBox',
//             direction: 'TB',
//             getId: function getId(d: any) {
//               return d.id;
//             },
//             getHeight: function getHeight() {
//               return 16;
//             },
//             getWidth: function getWidth() {
//               return 16;
//             },
//             getVGap: function getVGap() {
//               return 20;
//             },
//             getHGap: function getHGap() {
//               return 80;
//             },
//           },
//         });
//       }
//       graphInstance.current.data(chartData);
//       graphInstance.current.render();
//     }
//   }, [chartData]);

//   // useEffect(() => {

//   // }, [])

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <div ref={chartWrapRef} style={{ width: '600px', height: '400px' }} />
//     </div>
//   );
// };

// export default Index;
