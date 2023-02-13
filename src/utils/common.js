import consts from "@/utils/consts"

const getChartColor = function(pathType, key) {
  let color = null;
  switch (pathType) {
    case "brand":
      color = consts.BrandPathColorMap[key]?.color || null;
      break;
    case "product":
      color = consts.IpPathColorMap[key]?.color;
      break;
    case "character":
      color = consts.IpCharacterColorMap[key]?.color || null;
      break;
  }
  return color;
}

export default {
  getChartColor,
}