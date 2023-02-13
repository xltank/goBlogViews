import Gen from "pptxgenjs";
import consts from "@/utils/consts"
import _ from "lodash";
import {COLOR_AMB, COLOR_GRN, COLOR_RED, COLOR_UNK} from "@/utils/downloadppt_enums";

const WIDTH = 10; // inch
const HEIGHT = 5.626; // inch

const TABLE_HEADER_TEXT_OPTS = {
  color: consts.ChartColorMap.GREEN_DARK,
  margin: 3,
  border: [{pt: "1", color: "F0F0F0"}, null, {pt: "1", color: "F0F0F0"}, null]
};

const TABLE_TEXT_OPTS = {
  color: "5B5B5B",
  margin: 3,
  border: [null, null, {pt: "1", color: "CFCFCF"}, null]
};

const TABLE_LINK_OPTS = {
  color: "5B5BBB",
  margin: 3,
  border: [null, null, {pt: "1", color: "CFCFCF"}, null],
};

const BASE_TABLE_OPTS = {
  x: 0.8,
  y: 1.0,
};

const TITLE_OPTS = {
  x: 0.4,
  y: 0.2,
  w: '50%',
  h: 0.5,
  fill: {
    color: '#FFFFFF'
  },
  color: consts.ChartColorMap.GREEN_DARK
};

const PIE_OPTS = {
  x: 2.8,
  y: 0.7,
  w: '50%',
  h: '70%',
  holeSize: 70,
  legendPos: "b",
  legendFontFace: "Courier New",
  showLegend: true,
  showLeaderLines: false,
  showPercent: true,
  // showValue: true,
  chartColors: consts.ChartColors,
  dataBorder: {pt: "2", color: consts.ChartColorMap.GREY},
  dataLabelColor: consts.ChartColorMap.GREEN_SHALLOW,
  dataLabelFontSize: 8,
  dataLabelPosition: "inEnd", // bestFit,b,ctr,inBase,inEnd,l,outEnd,r,t
}

// ! CHART_TYPE 只能从实例获取
let PPT = new Gen();


function downloadDashboard(name, blocks) {
  let ppt = new Gen();

  blocks.forEach(block => {
    getSlide(ppt, block)
  })
  ppt.writeFile({fileName: name});
}

function getSlide(ppt, block) {
  let {type, subType, title, data} = block;
  let opts = {};
  let slide = ppt.addSlide();
  slide.addText(title, TITLE_OPTS);

  if (type === "Chart") {
    switch (subType) {
      case "pie":
        return addPie(slide, title, data.data);
      case "bar":
        return addBar(slide, title, data.data);
      case "line":
        return addLine(slide, title, data.data);
      case "lineBar":
        return addLineBar(slide, title, data.data);
      case "stackedBar":
        return addPercentStackedBar(slide, title, data.data);
      case "wordCloud":
        return addWordCloud(slide, title, data);
    }
  } else if (type === "Table") {
    return addTable(slide, title, data.data)
  } else if (type === "StatisticGroup") {
    return addStatisticGroup(slide, title, data.data)
  } else if (type === "StatisticList") {
    return addStatisticList(slide, title, data.data)
  } else if (type === "SortableStatisticGroup") {
    return addSortableStatisticGroup(slide, title, data.data)
  }
}

function addPie(slide, title, data) {
  let d = [
    {
      name: title,
      labels: _.map(data.list, "name"),
      values: _.map(data.list, "value"),
    }
  ];

  slide.addChart(PPT.charts.DOUGHNUT, d, PIE_OPTS);
  slide.addText(data.centerText, {
    x: 4.85,
    y: 2.4,
    w: 1,
    h: 0.2,
    align: 'center',
    fontSize: 12,
    color: consts.ChartColorMap.GREEN_SHALLOW,
  });
}

function addBar(slide, title, data) {
  const seriesValues = _.map(data.seriesData, 'value');
  let list = [{
    name: '',
    labels: data.yAxisData,
    values: seriesValues,
  }]

  let optsChartBar1 = {
    x: 1.45,
    y: 1.1,
    w: 7.0,
    h: 4.0,
    barDir: "bar",
    chartColors: [consts.ChartColorMap.GREEN],
    showValue: true,
    dataLabelPosition: "outEnd",
    // dataLabelFormatCode: "#%",
    // valAxisLabelFormatCode: "0.#0",
    valAxisMaxVal: Math.max(...seriesValues),
    valAxisMinVal: 0,
    barGapWidthPct: 200,
    catAxisLineShow: false,
    valAxisLineShow: false,
    catGridLine: {style: "none"},
    valGridLine: {style: "none"},
    valAxisHidden: true,
    // showLegend: true,
    // legendPos: "r",
  };
  slide.addChart(PPT.charts.BAR, list, optsChartBar1);
}

function addPercentStackedBar(slide, title, data) {
  let list = _.map(data.series, s => {
    return {
      name: s.name,
      labels: data.yAxisData,
      values: s.data,
    }
  })

  let optsChartBar1 = {
    x: 1.5,
    y: 1.0,
    w: 7.0,
    h: 4.0,
    barDir: "bar",
    chartColors: consts.TendencyColors,
    barGrouping: "percentStacked",
    showTitle: false,
    catAxisLineShow: false,
    valAxisLineShow: false,
    catGridLine: {style: "none"},
    valGridLine: {style: "none"},
    valAxisHidden: true,
  };
  slide.addChart(PPT.charts.BAR, list, optsChartBar1);
}

function addLine(slide, title, data) {
  let list = _.map(data.series, s => {
    return {
      name: s.name,
      labels: data.xAxisData,
      values: s.data,
    }
  })

  let optsChartBar = {
    x: 1.5,
    y: 1.0,
    w: 7.0,
    h: 4.0,
    lineSmooth: true,
    chartColors: consts.ChartColors,
    lineSize: 1,
    showLegend: true,
    legendPos: "b",
    valAxisMinVal: 0,
    catAxisLabelPos: "low",
    catAxisLineShow: false,
    valAxisLineShow: false,
    // catGridLine: { style: "none" },
    valGridLine: {style: "none"},
  };
  slide.addChart(PPT.charts.LINE, list, optsChartBar);
}

function addLineBar(slide, title, data) {
  let opts = {
    x: 1.5,
    y: 1.0,
    w: 7.0,
    h: 4.0,
    barDir: "col",
    barGrouping: "stacked",
    catAxisLabelColor: "999999",
    catAxisLabelFontFace: "Arial",
    catAxisLabelFontSize: 14,
    catAxisOrientation: "minMax",
    showLegend: false,
    showTitle: false,
    lineSize: 1,
    // lineDataSymbolSize: 20,
    // lineDataSymbolLineSize: 2,
    // lineDataSymbolLineColor: "FF0000",

    //dataNoEffects: true,

    valAxes: _.map(data.yAxisData, (v, i) => {
      let values = data.series[i].data;
      return {
        showValAxisTitle: true,
        valAxisTitle: v.name,
        valGridLine: {style: "none"},
        valAxisMaxVal: Math.max(...values), // !!! 不指定会导致ppt打开时弹出"修复"弹框
        valAxisMinVal: 0,
      }
    }),
    catAxes: _.map(data.yAxisData, (y, i) => {
      return {
        catAxisTitle: "",
        catAxisHidden: i > 0,
      }
    }),
  };

  let labels = data.xAxisData;
  let list = _.map(data.series, (s, i) => {
    let opts = {
      chartColors: [consts.ChartColors[i]],
      lineSmooth: true,
    };
    if(s.type === PPT.charts.BAR)
      opts.barDir = "col";
    if(i > 0) {
      opts.secondaryValAxis = true;
      opts.secondaryCatAxis = true;
    }
    return {
      type: s.type,
      data: [
        {
          name: s.name,
          labels: labels,
          values: s.data,
        },
      ],
      options: opts
    }
  })
  slide.addChart(list, opts);
}


function addTable(slide, title, data) {
  let header = [_.map(data.columns, c => {
    return {
      text: c.title,
      options: TABLE_HEADER_TEXT_OPTS,
    }
  })];

  let content = _.map(data.source, s => {
    return _.map(data.columns, c => {
      if (c.dataIndex === 'title') {
        return {
          text: s[c.dataIndex],
          options: _.assign({hyperlink: {url: s.uri}}, TABLE_LINK_OPTS),
        }
      }
      return {
        text: s[c.dataIndex],
        options: TABLE_TEXT_OPTS,
      }
    })
  })
  let list = header.concat(content);
  let op = _.cloneDeep(BASE_TABLE_OPTS);
  let xWidthCount = 0;
  op.colW = _.chain(data.columns).reject({title: ''}).map(c => {
    if (!c.width) {
      xWidthCount++;
      return 0;
    }
    return c.width / 80;
  }).value()

  if (xWidthCount > 0) {
    let w = (WIDTH - 1 - _.sum(op.colW)) / xWidthCount;
    op.colW = _.map(op.colW, c => {
      if (c === 0)
        return w
      return c
    })
  }

  op.x = (WIDTH - _.sum(op.colW)) / 2

  slide.addTable(
    list,
    op
  );
}

const addWordCloud = function (slide, title, data) {
  slide.addImage({
    data: data,
    x: 1.0,
    y: 1.5,
    w: 8.0,
    h: 2.5,
  })
}

const addStatisticGroup = function(slide, title, data){
  data.list.forEach((item, i) =>{
    slide.addShape(PPT.ShapeType.roundRect, {
      x: 0.5 + 2.9 * i,
      y: 1.5,
      w: 2.7,
      h: 1.0,
      rectRadius: 0,
      fill: { color: consts.ChartColorMap.GREEN }
    });
    slide.addText(item.name, {
      x: 0.6 + 2.9 * i,
      y: 1.75,
      w: 2.2,
      h: 0.5,
      // fill: {
      //   color: '#FFFFFF'
      // },
      color: '#FFFFFF'
    });
    slide.addText(item.value, {
      x: 2.5 + 2.9 * i,
      y: 1.75,
      w: 0.7,
      h: 0.5,
      // fill: {
      //   color: '#FFFFFF'
      // },
      color: '#FFFFFF'
    });
  })
}

const addStatisticList = function(slide, title, data){
  slide.addShape(PPT.shapes.ROUNDED_RECTANGLE, {
    x: 3.6,
    y: 1.0,
    w: 2.7,
    h: 4.0,
    rectRadius: 0,
    fill: { color: '#F1F8ED' }
  });
  data.list.forEach((item, i) =>{
    slide.addText(item.name, {
      x: 3.9,
      y: 1.3 + 0.3 * i,
      w: 2.2,
      h: 0.2,
      fontSize: 12,
      color: consts.ChartColorMap.GREEN_SHALLOW
    });
    slide.addText(item.value, {
      x: 5.4,
      y: 1.3 + 0.3 * i,
      w: 2.2,
      h: 0.2,
      fontSize: 12,
      color: consts.ChartColorMap.GREEN_SHALLOW
    });
  })
  slide.addText(data.average, {
    x: 3.9,
    y: 4.4,
    w: 2.2,
    h: 0.2,
    fontSize: 16,
    color: consts.ChartColorMap.GREEN_DARK
  });
}

const addSortableStatisticGroup = function(slide, title, data){
  data.checkboxOptions.forEach((op, i) =>{
    slide.addText(op.label, {
      x: 0.7,
      y: 0.7 + 1.2 * i,
      w: 2.2,
      h: 0.5,
      fontSize: 12,
      color: consts.ChartColorMap.GREEN_SHALLOW
    });

    data.dataObj[op.value].forEach((item, j) =>{
      let shapeX = 0.8 + 1.65 * j;
      let shapeY = 1.1 + 1.2 * i;
      slide.addShape(PPT.ShapeType.roundRect, {
        x: shapeX,
        y: shapeY,
        w: 1.6,
        h: 0.7,
        rectRadius: 0,
        fill: { color: consts.ChartColorMap.GREEN }
      });
      slide.addText(item.value, {
        x: shapeX,
        y: shapeY + 0.1,
        w: 1.6,
        h: 0.2,
        align: 'center',
        fontSize: 14,
        color: '#FFFFFF'
      });
      slide.addText(item.name, {
        x: shapeX + 0.05,
        y: shapeY + 0.4,
        w: 1.5,
        h: 0.2,
        align: 'center',
        fontSize: 8,
        color: '#FFFFFF'
      });
    })
  })
}


export default {
  downloadDashboard,
}