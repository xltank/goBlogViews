import consts from "@/utils/consts";
import util from "@/utils/util";

const Pie = {
  title: {
    text: '',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      color: consts.ChartColorMap.GREEN_DARK,
    },
    top: 10,
  },
  textStyle: {
    fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false
  },
  color: consts.ChartColors,
  series: [
    {
      name: '',
      type: 'pie',
      top: 15,
      radius: ['48%', '58%'],
      // avoidLabelOverlap: false,
      markPoint: {
        tooltip: { show: false },
        label: {
          show: true,
          formatter: '{b}',
          color: '#85956C',
          fontSize: 12,
          offset: [0, 10]
        },
        data: [{
          name: '12312',
          value: '-',
          symbol: 'circle',
          itemStyle: { color: 'transparent' },
          x: '50%',
          y: '50%',
        }],
      },
      emphasis: {
        disabled: true, // 点击放大所选项
        label: {
          show: false,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      label: {
        formatter: '{b} {d}%',
        color: '#85956C',
        fontSize: 12,
        fontWeight: "bold"
      },
      labelLine: {
        show: true,
        lineStyle: {
          color: "#85956C",
          type: "dotted",
        }
      },
      data: [],
      itemStyle: {
        borderRadius : [50, 50, 50, 50], // Specify the border radius
        shadowColor: '#5470c6',
      },
    },
    {
      name: '',
      type: 'pie',
      top: 15,
      radius: ['60%', '68%'],
      data: []
    }
  ]
}

const Line = {
  textStyle: {
    fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
  },
  grid: {
    left: '30',
    right: '30',
    top: '50',
    bottom: '70',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      },
      label: {
        precision: 0
        // formatter: (params) => util.getNumber(params.value)
      }
    },
    order:'seriesAsc',
    // position: function (pos, params, dom, rect, size) {
    //   // tooltip will be fixed on the right if mouse hovering on the left,
    //   // and on the left if hovering on the right.
    //   var obj = {top: 60};
    //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
    //   return obj;
    // }
  },
  legend: {
    data: [],
    bottom: 10,
    itemStyle: {
      opacity: 0,
    },
    lineStyle: {
      // width: 1
      height: 5
    },
    textStyle: {
      color: "#86956A",
    }
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          type: "dashed",
          color: "rgba(236, 239, 241, 1)", // #ECEFF1
        }
      },
      axisLabel: {
        color: "#86956A",
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      alignTicks: true,
      axisLabel: {
        color: "#86956A",
        formatter: '{value}'
      },
    }
  ],
  series: [
    {
      name: 'd',
      type: 'line',
      // tooltip: {
      //   valueFormatter: function (value) {
      //     return value + ' ml';
      //   }
      // },
      data: []
    }
  ]
}

const Bar = {
  textStyle: {
    fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#ff0000'
      }
    },
    order:'seriesAsc'
  },
  // legend: {
  // data: ['Precipitation']
  // },
  grid: {
    left: '25',
    right: '35',
    top: '20',
    bottom: '30',
    containLabel: true
  },
  xAxis: [
    {
      show: false,
      type: 'value',
      // name: 'Precipitation',
      alignTicks: true,
      axisLabel: {
        color: "#86956A",
        formatter: '{value}'
      },
      axisPointer: {
        show: false
      }
    },
  ],
  yAxis: [
    {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#86956A"
      },
      data: [
      ],
    }
  ],
  series: [
    {
      name: '声量',
      type: 'bar',
      // tooltip: {
      //   valueFormatter: function (value) {
      //     return value + ' ml';
      //   }
      // },
      color: '#41B748',
      itemStyle: {
        borderRadius : [50, 50, 50, 50], // Specify the border radius
        shadowColor: '#5470c6',
      },
      label: {
        show: true,
        position: 'right',
        color: "#86956A",
        fontWeight: "bold",
        formatter: (params) => util.getNumber(params.value)
      },
      barWidth: 10,
      data: [],
    },
  ]
}

let StackedBarSeriesItem = {
  name: '',
  type: 'bar',
  stack: '总量',
  // tooltip: {
  //   valueFormatter: function (value) {
  //     return value + ' °C';
  //   }
  // },
  color: '#41B748',
  // barCategoryGap: "0%",
  itemStyle: {
    borderRadius : [50, 50, 50, 50], // Specify the border radius
    shadowColor: '#5470c6',
  },
  barWidth: 10,
  data: [
  ]
}

const StackedBar = {
  textStyle: {
    fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
  },
  legend: {
    data: [],
    bottom: 0,
    textStyle: {
      color: "#86956A",
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    order:'seriesAsc',
    valueFormatter: (value) => value + "%"
  },
  grid: {
    left: '25',
    right: '40',
    top: '20',
    bottom: '30',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      show: false,
      axisLabel: {
        color: "#86956A",
      },
      axisPointer: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        color: "#86956A"
      },
      data: [
      ],
    }
  ],
  series: [StackedBarSeriesItem]
}

const LineBar = {
  textStyle: {
    fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
  },
  grid: {
    left: '30',
    right: '60',
    top: '45',
    bottom: '60',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      },
      label: {
        precision: 0
        // formatter: (params) => util.getNumber(params.value)
      }
    },
    order:'seriesAsc'
  },
  legend: {
    data: [],
    bottom: 10,
    itemStyle: {
      opacity: 1,
    },
    lineStyle: {
      // width: 1
      height: 5
    },
    textStyle: {
      color: "#86956A",
    }
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          type: "dashed",
          color: "rgba(236, 239, 241, 1)", // #ECEFF1
        }
      },
      axisLabel: {
        color: "#86956A"
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      alignTicks: true,
      axisLabel: {
        color: "#86956A",
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: 'd',
      type: 'line',
      data: []
    }
  ]
}

const WordCloud = {
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    left: 'center',
    top: 'center',
    width: '800px',
    height: '400px',
    right: null,
    bottom: null,
    sizeRange: [12, 34],
    rotationRange: [0, 0],
    rotationStep: 45,

    // size of the grid in pixels for marking the availability of the canvas
    // the larger the grid size, the bigger the gap between words.
    gridSize: 8,

    // set to true to allow word being draw partly outside of the canvas.
    // Allow word bigger than the size of the canvas to be drawn
    drawOutOfBound: false,

    // If perform layout animation.
    // NOTE disable it will lead to UI blocking when there is lots of words.
    layoutAnimation: true,

    // Global text style
    // textStyle: {
    //   fontFamily: 'Line-en-normal, Line-normal', // 只能这样管用
    //   fontWeight: 'bold',
    //   // Color can be a callback function or a color string
    //   color: function () {
    //     // Random color
    //     return 'rgb(' + [
    //       Math.round(Math.random() * 160),
    //       Math.round(Math.random() * 160),
    //       Math.round(Math.random() * 160)
    //     ].join(',') + ')';
    //   }
    // },
    emphasis: {
      focus: 'self',
      textStyle: {
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    data: [
      // {"name": "迪士尼", "value": 2752},
    ]
  }]
}

export default {
  Pie,
  StackedBar,
  StackedBarSeriesItem,
  LineBar,
  Line,
  Bar,
  WordCloud
}