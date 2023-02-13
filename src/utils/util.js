import numeral from "numeral"
import _ from "lodash"
import consts from "./consts"

const lastN = (arr, n) =>{
  if(!_.isArray(arr) || !n || n >= arr.length)
    return arr;

  return arr.slice(arr.length - n, arr.length)
}

const getNumber = (val, p) => {
  if (!val) {
    return 0;
  }

  let num = numeral(val);
  if (val < 10000) {
    return num.format("0,0");
  }

  let precise = p === 1 ? "0.0a" : "0a";
  return num.format(precise).toUpperCase();
}

const getSeparatedNumber = (val, p) => {
  if (!val) {
    return 0;
  }

  let num = numeral(val);
  return num.format("0,0");
}

const getPlatformCN = (p) => {
  return consts.PlatformMap[p]?.label || p;
}

// 多级 path 结构 /a/b/c/d/e => [a,b,c,d,e]
const parsePath = path => {
  if (!path || !_.isString(path)){
    console.error('parsePath error, path:', path)
    return [];
  }
  let arr = path.split("/");
  let [, ...parts] = arr;
  // console.log('parsePath:', parts)
  return parts;
}

// brand 必须在白名单
const parsePathForceBrand = path => {
  if (!path || !_.isString(path))
    return;
  let arr = path.split("/");
  let [___, p1, p2, p3] = arr;
  // console.log('parsePathForceBrand:', path, p1, p2 || '', p3 || '')
  let b = consts.BrandPathMap[p1];
  if (!b)
    return;
  // if(!getBrand('/'+p1))
  //   return;

  return {brand: b, product: transformProduct(p2), character: p3, p1, p2, p3};
}

// 只解析一级标签，'/LF': "LINE FRIENDS"
const getBrand = path => {
  let obj = parsePathForceBrand(path);
  if(obj && obj.brand && !obj.product && !obj.character)
    return obj && obj.brand;
  // console.log('getBrand:', path, r)
}

const transformProduct = (p) =>{
  return consts.ProductPathMap[p] || p;
}
// 只解析二级标签，'/LF/B&F': "LINE FRIENDS", "B&F"
const getProduct = path =>{
  let obj = parsePathForceBrand(path);
  if(obj && obj.brand && !obj.character)
    return obj && transformProduct(obj.product);
}

const transformCharacter = (p) => {
  return consts.CharacterPathMap[p] || p;
}

// 只解析三级标签，'/LF/B&F/布朗熊': "LINE FRIENDS", "B&F", "布朗熊"
const getCharacter = path =>{
  let obj = parsePathForceBrand(path);
  return obj && transformCharacter(obj.character);
}

// Filter article.product_paths with real brand tags.
// If there's no /LF but there is /LF/B&F, then the result contains /LF.
const filterBrandPaths = paths => {
  let r = _.chain(paths)
    .map(p => {
      if (p.indexOf('/') !== 0)
        return '';
      let arr = p.split("/");
      let b = arr[1];
      return consts.BrandPathMap[b] ? b : "";
    })
    .compact()
    .uniq()
    .value();
  // console.log(paths, r);
  return r;
}

/**
 *
 * @param list Array [{name: "", value: ""}]
 */
const mergeMediaPlatform = function (list) {
  let m = {};
  list.forEach(item => {
    let key = getPlatformCN(item.name);
    if (!m[key])
      m[key] = {name: key, value: item.value, itemStyle: item.itemStyle };
    else
      m[key].value += item.value;
  })
  return _.values(m);
}


const getPercentage = (num, total) => {
  if (!num || !total) {
    return 0;
  }
  return Math.round(num / total * 1000) / 10.00;
}


/*
！！！
 "comment_num": 3,
  "like_num": 4,
  "repost_num": 0,
  "engagement_num": 7,
  "comments_count": 3,
  "attitudes_count": 4,
  "reposts_count": 0,
 */
function getEngagementFields (media_platform) {
  switch (media_platform) {
    case consts.PlatformMap.Weibo.key:
      return ['reposts_count', 'comments_count', 'attitudes_count']
    case consts.PlatformMap.WeChat.key:
      return ['read_num', 'old_like_num', 'like_num']
    case consts.PlatformMap.Kuaishou.key:
      return ['read_num', 'comment_num', 'like_num']
    case consts.PlatformMap.Douyin.key:
      return ['share_num', 'comment_num', 'like_num']
    case consts.PlatformMap.Red.key:
      return ['collect_num', 'comment_num', 'like_num']
    case consts.PlatformMap.Bilibili.key:
      // return ['read_num', 'share_num', 'comment_num', 'danmu_num', 'like_num', 'collect_num', 'coin_num']
      return ['read_num', 'share_num', 'comment_num', 'danmu_num', 'like_num', 'collect_num']
    // case consts.PlatformMap.Dewu:
    //   return ['share_num', 'comment_num', 'like_num']
    // default:
    //   return ['read_num', 'comment_num', 'like_num']
    default:
      return []
  }
}

function trunkText(t, len) {
  return (t || '').substr(0, len) + (t?.length > len ? "..." : "")
}

/**
 *
 * @param type 'IP', 'topic', 'subTopic', 'ipTag'
 * @param short
 * @returns {*}
 */
const transformShortByType = (type, short) =>{
  let k = `${type}-${short}`
  return consts.FullNameMapByType[k] || short;
}

const transformIPShort = (short) =>{
  return transformShortByType('IP', short)
}
const transformTopicShort = (short) =>{
  return transformShortByType('topic', short)
}
const transformSubTopicShort = (short) =>{
  return transformShortByType('subTopic', short)
}
const transformIPTagShort = (short) =>{
  return transformShortByType('ipTag', short)
}


export default {
  lastN,
  getNumber,
  getSeparatedNumber,
  getPlatformCN,
  parsePath,
  parsePathForceBrand,
  getBrand,
  getProduct,
  getCharacter,
  filterBrandPaths,
  mergeMediaPlatform,
  getPercentage,
  getEngagementFields,
  trunkText,
  // transformShortByType,
  transformIPShort,
  transformTopicShort,
  transformSubTopicShort,
  transformIPTagShort,
}