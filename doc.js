/**
 * 待爬取网站
 */
// https://www.cgtrader.com
// https://www.turbosquid.com
// https://free3d.com
// https://3dsky.org
// https://www.cgmodel.com/
// https://www.cg99.com/
// https://www.3dwhere.com/
// https://3d.3d66.com/

/**
 * 网站https://www.turbosquid.com/的下载模型的代码
 */
// 添加到购物车
const arr = Array.from(new Set(Array.from(document.querySelectorAll('a')).map(anchor => anchor.getAttribute('data-click-event-sku-value'))))
for (let index = 0;index< 10;index++) {
    name(`https://www.turbosquid.com/AssetManager/Index.cfm?stgAction=getFiles&subAction=Download&intID=${arr[index+1]}&intType=3&csrf=4A4FD50FF039F0509FEC8F673914E11374BA97C2&showDownload=1&s=1`)
  }
function name(url) {
    var iframe = document.createElement('iframe');
    console.log(url)
  iframe.src = url
  iframe.style.display = 'none'; // 隐藏iframe
  document.body.appendChild(iframe);
}

// 下载文件
const links = Array.from(document.querySelectorAll('.ProductFileRow .mainFileName a'));
const fbxLinks = links.map(link => link.href);
console.log(fbxLinks);
// fbxLinks.forEach((item, index)=> {
//     var iframe = document.createElement('iframe');
//   iframe.src = item
//   iframe.style.display = 'none'; // 隐藏iframe
//   document.body.appendChild(iframe);
// }
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const download = async () => {
  for (const item of fbxLinks) {
    console.log(`开始爬取模型，第${fbxLinks.indexOf(item) + 1}个，总共${fbxLinks.length}个`)
    var iframe = document.createElement('iframe');
    iframe.src = item
    iframe.style.display = 'none'; // 隐藏iframe
    document.body.appendChild(iframe);
    await sleep(61000);
  }
}
download()


