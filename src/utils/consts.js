import _ from "lodash"

const CUSTOMER_CODE = 'linefriends'

//TODO:  从 mongodb获取
const Product_Paths = [
  "/LF",
  "/LF/B&F",
  "/LF/B&F/布朗熊",
  "/LF/B&F/可妮兔",
  "/LF/B&F/莎莉",
  "/LF/B&F/丘可",
  "/LF/B&F/馒头人",
  "/LF/B&F/胖友",
  "/LF/B&F/蛙里奥",
  "/LF/B&F/詹姆斯",
  "/LF/B&F/老板",
  "/LF/B&F/杰西卡",
  "/LF/B&F/爱德华",
  "/LF/BT21",
  "/LF/BT21/RJ",
  "/LF/BT21/KOYA",
  "/LF/BT21/CHIMMY",
  "/LF/BT21/TATA",
  "/LF/BT21/COOKY",
  "/LF/BT21/SHOOKY",
  "/LF/BT21/MANG",
  "/LF/BT21/VAN",
  "/LF/ROY6",
  "/LF/ROY6/莱阳",
  "/LF/ROY6/爱迪",
  "/LF/ROY6/劳迪",
  "/LF/ROY6/龙龙",
  "/LF/ROY6/T-2000",
  "/LF/ROY6/迷你抱",
  "/Pop Mart",
  "/Kakao Friends",
  "/迪士尼影业",
  "/迪士尼乐园",
  "/三丽鸥",
  "/环球影城",
  "/泰迪珍藏",
  "/乐高",
];

const Path_LineFriends = "/LF";
// const BrandPaths = ['/LF', '/Pop Mart', '/Kakao Friends', '/迪士尼影业', '/迪士尼乐园', '/三丽鸥', '/环球影城', '/泰迪珍藏', '/乐高'];

const BrandPathMap = {
  'LF': "LINE FRIENDS",
  'POP MART': 'POP MART',
  'KAKAO FRIENDS': 'KAKAO FRIENDS',
  '迪士尼影业': '迪士尼影业',
  '迪士尼乐园': '迪士尼乐园',
  '三丽鸥': '三丽鸥',
  '环球影城': '环球影城',
  '泰迪珍藏': '泰迪珍藏',
  '乐高': '乐高',
  'B-DUCK': 'B-DUCK'
};

const BrandPathColorMap = {
  'LINE FRIENDS': { key: '/LF', label: 'LINE FRIENDS', color: '#00C64A'},
  'POP MART': { key: '/POP MART', label: 'POP MART', color: '#E60221'},
  'KAKAO FRIENDS': { key: '/KAKAO FRIENDS', label: 'KAKAO FRIENDS', color: '#F6A309'},
  '迪士尼影业': { key: '/迪士尼影业', label: '迪士尼影业', color: '#05266E'},
  '迪士尼乐园': { key: '/迪士尼乐园', label: '迪士尼乐园', color: '#777FC1'},
  '三丽鸥': { key: '/三丽鸥', label: '三丽鸥', color: '#FF839B'},
  '环球影城': { key: '/环球影城', label: '环球影城', color: '#036BD9'},
  '泰迪珍藏': { key: '/泰迪珍藏', label: '泰迪珍藏', color: '#6A300D'},
  '乐高': { key: '/乐高', label: '乐高', color: '#000000'},
  'B-DUCK': { key: '/B-DUCK', label: 'B-DUCK', color: '#FBCB3B'},
}

const IpCharacterColorMap = {
  '布朗熊': { key: '/LF/B&F/布朗熊', label: '布朗熊', color: '#935841' },
  '可妮兔': { key: '/LF/B&F/可妮兔', label: '可妮兔', color: '#EE8C94' },
  '莎莉': { key: '/LF/B&F/莎莉', label: '莎莉', color: '#FFD900' },
  '丘可': { key: '/LF/B&F/丘可', label: '丘可', color: '#E4A877' },
  '馒头人': { key: '/LF/B&F/馒头人', label: '馒头人', color: '#F6C7CD' },
  '蛙里奥': { key: '/LF/B&F/蛙里奥', label: '蛙里奥', color: '#009832' },
  '詹姆斯': { key: '/LF/B&F/詹姆斯', label: '詹姆斯', color: '#FFEB00' },
  '部长': { key: '/LF/B&F/老板', label: '部长', color: '#FBD7B6' },
  '爱德华': { key: '/LF/B&F/爱德华', label: '爱德华', color: '#009832' },
  '杰西卡': { key: '/LF/B&F/杰西卡', label: '杰西卡', color: '#A0111A' },
  '胖友': { key: '/LF/B&F/胖友', label: '胖友', color: '#474747' },
  'RJ': { key: '/LF/BT21/RJ', label: 'RJ', color: '#E75012' },
  'CHIMMY': { key: '/LF/BT21/CHIMMY', label: 'CHIMMY', color: '#FFDF00' },
  'COOKY': { key: '/LF/BT21/COOKY', label: 'COOKY', color: '#F3B4CF' },
  'KOYA': { key: '/LF/BT21/KOYA', label: 'KOYA', color: '#A1D9F3' },
  'SHOOKY': { key: '/LF/BT21/SHOOKY', label: 'SHOOKY', color: '#CE8B5C' },
  'MANG': { key: '/LF/BT21/MANG', label: 'MANG', color: '#DBC8DF' },
  'VAN': { key: '/LF/BT21/VAN', label: 'VAN', color: '#919294' },
  'TATA': { key: '/LF/BT21/TATA', label: 'TATA', color: '#5A79B6' },
  '莱阳': { key: '/LF/ROY6/莱阳', label: '莱阳', color: '#E7513D' },
  '爱迪': { key: '/LF/ROY6/爱迪', label: '爱迪', color: '#FFE863' },
  '龙龙': { key: '/LF/ROY6/龙龙', label: '龙龙', color: '#F9DBE8' },
  '劳迪': { key: '/LF/ROY6/劳迪', label: '劳迪', color: '#D4ECF9' },
  'T-2000': { key: '/LF/ROY6/T-2000', label: 'T-2000', color: '#4B4B4D' },
  '迷你抱': { key: '/LF/ROY6/迷你抱', label: '迷你抱', color: '#7FC195' },
  'BNINI': { key: '/LF/MININI/BNINI', label: 'BNINI', color: '#C79988' },
  'CONINI': { key: '/LF/MININI/CONINI', label: 'CONINI', color: '#F6CDC5' },
  'SELINI': { key: '/LF/MININI/SELINI', label: 'SELINI', color: '#FFEF9F' },
  'CHONINI': { key: '/LF/MININI/CHONINI', label: 'CHONINI', color: '#E9C4A8' },
  'LENINI': { key: '/LF/MININI/LENINI', label: 'LENINI', color: '#77BF6E' },
  'BONINI': { key: '/LF/MININI/BONINI', label: 'BONINI', color: '#F6E5D3' },
  'MOONINI': { key: '/LF/MININI/MOONINI', label: 'MOONINI', color: '#EEBCB1' },
  'DININI': { key: '/LF/MININI/DININI', label: 'DININI', color: '#63AA5B' },
}

const IpPathColorMap = {
  'BROWN&FRIENDS': { key: '/LF/B&F', label: 'BROWN&FRIENDS', color: '#955A42' },
  'BT21': { key: '/LF/BT21', label: 'BT21', color: '#030303' },
  'ROY6': { key: '/LF/ROY6', label: 'ROY6', color: '#DB4713' },
  'MININI': { key: '/LF/MININI', label: 'MININI', color: '#EF8C94' },
  '其它': { key: '其它', label: '其它', color: '#20AEE5' },
}
// const BrandPaths = _.chain(Product_Paths).map(i => i.split('/').length === 2 ? i : '' ).compact().value();

const ProductPathMap = {
  "B&F": "BROWN&FRIENDS"
};

const CharacterPathMap = {
  '老板': '部长',
}

const PlatformMap = {
  "Weibo": {key: "Weibo", label: "微博", color: '#EF8833'},
  "Web": {key: "Web", label: "网络", color: '#95CBEE'},
  "WeChat": {key: "WeChat", label: "微信", color: '#41B748'},
  "App": {key: "App", label: "App", color: '#2C5414'},
  "Red": {key: "Red", label: "小红书", color: '#FF000C'},
  "Bilibili": {key: "Bilibili", label: "Bilibili", color: '#ED7199'},
  "Douyin": {key: "Douyin", label: "抖音", color: '#000000'},
  "BBS": {key: "BBS", label: "论坛", color: '#6A96E4'},
  "Kuaishou": {key: "Kuaishou", label: "快手", color: '#FF6813'},
  "QA": {key: "QA", label: "问答", color: '#55935A'},
  "Paper": {key: "Paper", label: "报纸", color: '#999999'},
  "Video": {key: "Video", label: "视频", color: '#AF7C59'},
  // "Wechat": "微信",
  // "App": "App",
}

const SocialPlatformMap = {
  "Weibo": {key: "Weibo", label: "微博"},
  "Douyin": {key: "Douyin", label: "抖音"},
  "Red": {key: "Red", label: "小红书"},
  "Bilibili": {key: "Bilibili", label: "Bilibili"},
  "WeChat": {key: "WeChat", label: "微信"},
  "TXVideo": {key: "Web", label: "腾讯视频"},
  "WeiShi": {key: "App", label: "微视"},
}

const ChartColorMap = {
  ORANGE: "#F2AA41",
  GREEN: "#41B748",
  YELLOW: "#FAE069",
  GREEN_DARK: "#2C5414",
  BLUE: "#85CCF2",
  GREEN_SHALLOW: "#86956A",
  BROWN: "#AF7C59",
  BLACK: "#000000",
  GREY: "#E6E6E6",
}
const ChartColors = [
  ChartColorMap.GREEN,
  ChartColorMap.BLUE,
  ChartColorMap.YELLOW,
  ChartColorMap.BROWN,
  ChartColorMap.ORANGE,
  ChartColorMap.GREEN_DARK,
  ChartColorMap.GREY,
  ChartColorMap.BLACK,
  ChartColorMap.GREEN_SHALLOW,
];

const Tendencies = ["正面", "中性", "负面"];
const TendencyColors = [ChartColorMap.GREEN, ChartColorMap.GREY, ChartColorMap.YELLOW];
const TendencyColorMap = {
  "正面": ChartColorMap.GREEN,
  "中性": ChartColorMap.GREEN_SHALLOW,
  "负面": ChartColorMap.YELLOW
}

// 除词云外的echart tendency color
const TendencyEchartColorsMap = {
  '正面': ChartColorMap.GREEN,
  '中性': ChartColorMap.GREY,
  '负面': ChartColorMap.YELLOW,
}

// const PlatformColorMap = {
//  "微博": ChartColorMap.YELLOW,
//  "微信": ChartColorMap.,
//  "网络": ChartColorMap.,
//  "App": ChartColorMap.,
//  "小红书": ChartColorMap.,
//  "Bilibili": ChartColorMap.,
//  "抖音": ChartColorMap.,
//  "得物": ChartColorMap.,
//  "论坛": ChartColorMap.,
//  "快手": ChartColorMap.,
//  "问答": ChartColorMap.,
//  "报纸": ChartColorMap.,
//  "盯潮": ChartColorMap.,
// }

const FullNameList = [
  {short: "B&F", full: "BROWN&FRIENDS", type: "IP"},
  {short: "LF日常", full: "LINEFRIENDS的日常", type: "topic"},
  {short: "LF小剧场", full: "LINEFRIENDS小剧场", type: "topic"},
  {short: "LF速报", full: "LINEFRIENDS速报", type: "topic"},
  {short: "LF资讯", full: "LINEFRIENDS资讯", type: "topic"},
  {short: "LF在身边", full: "LINEFRIENDS在身边", type: "topic"},
  {short: "SWF", full: "SALLY WITH FRIENDS", type: "subTopic"},
  {short: "LF地标行", full: "LINEFRIENDS地标行", type: "subTopic"},
  {short: "LF艺术画廊", full: "LINEFRIENDS艺术画廊", type: "subTopic"},
  {short: "LFWHATIF", full: "LINEFRIENDS WHAT IF", type: "subTopic"},
  {short: "B&F", full: "BROWN&FRIENDS", type: "ipTag"},
];

const FullNameMapByType = _.reduce(FullNameList, (r, c) =>{
  r[c.type+'-'+c.short] = c.full;
  return r;
}, {})


export default {
  CUSTOMER_CODE,
  BrandPathMap,
  ProductPathMap,
  FullNameMapByType,
  Path_LineFriends,
  PlatformMap,
  SocialPlatformMap,
  ChartColorMap,
  ChartColors,
  Tendencies,
  TendencyColors,
  TendencyColorMap,
  BrandPathColorMap,
  IpPathColorMap,
  TendencyEchartColorsMap,
  IpCharacterColorMap,
  CharacterPathMap,
}