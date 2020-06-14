import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var colors = ['#FF3300', '#FF3399', '#FF33FF', '#CC3F57', '#9A2555'];
  var bgColor = '#2E2733';
  var data = [{
    name: '所有',
    itemStyle: {
      // color: '#ddd',
      borderWidth: 0
    },
    label: {
      rotate: '0',
      fontWeight: 'bolder',
      fontSize: 20,
      //这里的formatter没有生效
      formatter: '{c}'
    },
    children: [{
      name: '支付宝',
      children: [{
        name: '基金',
        value: 10
      }, {
        name: '余额宝',
        value: 2,
      }]
    }, {
      name: '理财魔方',
      value: 10,
      children: [{
        name: '智能组合',
        value: 6,
      }, {
        name: '低估值定投',
        value: 4,
      }]
    }, {
      name: '招商银行',
      value: 9,
      children: [{
        name: '朝朝盈',
        value: 4,
      }, {
        name: '摩羯智投',
        value: 5,
      }]
    }]
  }];

  var option = {
    // backgroundColor:bgColor,
    title: {
      // text: '投资账单'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
    },
    series: [{
      name: '总资产',
      radius: [0, '90%'],
      type: 'sunburst',
      sort: null,
      nodeClick: false,
      highlightPolicy: 'none',
      data: data,
      levels:[
        {},
        {itemStyle: {color: colors[0],}},
        {itemStyle: {color: colors[1],}},
        {itemStyle: {color: colors[2],}},
      ],
      itemStyle: {
        // color: '#ddd',
        borderWidth: 2
      },
      label: {
        rotate: 'tangential',
        formatter: '{b}({c})'
      }
    }]
  };
  chart.setOption(option);
  chart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params);
});
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: '羊拉屎投资账单！',
      path: '/pages/tree/tree',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});