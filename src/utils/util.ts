export function getNodeText(ele: CheerioElement) {
  return ele.children.map(item=>item.data).join('').trim();
}