/**
 * created by MuYi086 by 2019.07.28
 */
$(function () {
  // 插入一个时间下来选择框
  insertTimeSelect()
  let data
  //点击获取从background传入的数据
  $('#getData').click(function () {
    data = chrome.extension.getBackgroundPage().webData
    // console.log(data)
    // 主函数:可以传入选定的时间间隔
    // main(data, m = 5)
    demo()
  })
  function demo () {
    console.log(axios)
    axios.get('http://hq.sinajs.cn/list=sz002307,sh600928')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      // always executed
      console.log(111111)
    })
  }
  // 时间筛选change
  $('#selectValue').change(function () {
    let minute = Number($('#selectValue').val())
    // 主函数:可以传入选定的时间间隔
    main(data, minute)
  })
  // 处理数据
  function main (data, m) {
    let dealGoalArr = fb.cutAsianDataByMinutes(data.dataArr, m)
    let goalToKArr = fb.dataTransToKNeed(dealGoalArr)
    // 处理k线横,纵坐标,数据
    let xAxisArr = fb.splitKData(goalToKArr, 1)
    let dataArr = fb.splitKData(goalToKArr, 2)
    // 将日期拼进赔率数据
    let dealedArr = fb.dateJoinOddsData(xAxisArr, dataArr)
    console.log(dealedArr)
    // 渲染k线图
    renderDiv(xAxisArr, dealedArr)
  }
  // Echart渲染
  // function renderDiv (xAxisArr, dataArr) {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('main'))
  //   // 指定图表的配置项和数据
  //   var option = {
  //     title: {text: 'k线展示'},
  //     xAxis: {data: xAxisArr},
  //     yAxis: {},
  //     series: [{type: 'k',data: dataArr}]
  //   }
  //   // 使用刚指定的配置项和数据显示图表。
  //   myChart.setOption(option)
  // }
  function renderDiv (xAxisArr, dataArr) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    var upColor = '#ec0000'
    var upBorderColor = '#8A0000'
    var downColor = '#00da3c'
    var downBorderColor = '#008F28'
    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    var data0 = splitData(dataArr)
    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    option = {
        title: {
            text: 'k线',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                },
                markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [
                        {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                normal: {color: 'rgb(41,60,85)'}
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },

        ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
  function insertTimeSelect () {
    let selectStr = '<option value ="5" selected>5分钟</option>' +
    '<option value ="10">10分钟</option>' +
    '<option value ="30">30分钟</option>' +
    '<option value ="60">60分钟</option>' +
    '<option value ="90">90分钟</option>' +
    '<option value ="120">120分钟</option>' +
    '<option value ="180">180分钟</option>' +
    '<option value ="240">240分钟</option>' +
    '<option value ="300">300分钟</option>'
    $('#selectValue').html(selectStr)
  }
})
