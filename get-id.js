const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.turbosquid.com/3d-model/free/industrial', { timeout: 0 });

  // 获取a链接属性data-click-event-sku-value的值
  async function extractLinks() {
    return await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(anchor => anchor.getAttribute('data-click-event-sku-value'));
    });
  }

  const links = await extractLinks();
  // 数组去重
  const allLinks = Array.from(new Set(links));

  for (let index = 0;index< 10;index++) {
    window.open(`https://www.turbosquid.com/AssetManager/Index.cfm?stgAction=getFiles&subAction=Download&intID=${index}&intType=3&csrf=4A4FD50FF039F0509FEC8F673914E11374BA97C2&showDownload=1&s=1`)
  }
  const productFileRow = Array.from(document.querySelectorAll('.ProductFileRow'));
  // 找到class为itemNameWide的元素
  Array.from(document.querySelectorAll('.itemNameWide')).forEach((item, index) => {
    const name = item.innerText;
    // 找到productFileRow[index]下面的class为mainFileName下面的a链接
    const link = productFileRow[index].querySelector('.mainFileName a').href;
    console.log(name, link);
  })

  // 将class为ProductFileRow元素下a链接的名字包含fbx的链接记录
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.ProductFileRow a'));
    const fbxLinks = links.filter(link => link.innerText.includes('fbx')).map(link => link.href);
    console.log(fbxLinks);
  });


  // fs.writeFileSync('links.txt', allLinks.join('\n'), 'utf-8');

  await browser.close();

  console.log('Done!');
})();