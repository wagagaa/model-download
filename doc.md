## 待爬取网站

<https://www.cgtrader.com>
<https://www.turbosquid.com>
<https://free3d.com>
<https://3dsky.org>
<https://www.cgmodel.com/>
<https://www.cg99.com/>
<https://www.3dwhere.com/>
<https://3d.3d66.com/>

### <https://www.turbosquid.com>

+ 步骤
  1. 登录
  2. 爬取模型id
  3. 添加到购物车
  4. 下载文件

+ 添加到购物车
  1. 获取token
  2. 添加模型

```js
const arr = Array.from(new Set(Array.from(document.querySelectorAll('a')).map(anchor => anchor.getAttribute('data-click-event-sku-value'))))
const token = 'F9565CAE6A17AC60807D171ACAE768B835711553'

function addModel(url) {
  // var iframe = document.createElement('iframe');
  // iframe.src = url
  // iframe.style.display = 'none'; // 隐藏iframe
  // document.body.appendChild(iframe);

  // ajax访问url
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.error('Error:', error);
  });
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const download = async () => {
  for (let index = 0;index< arr.length;index++) {
    console.log(`开始添加模型，第${index + 1}个，总共${arr.length}个, id: ${arr[index]}`)
    addModel(`https://www.turbosquid.com/AssetManager/Index.cfm?stgAction=getFiles&subAction=Download&intID=${arr[index]}&intType=3&csrf=${token}&showDownload=1&s=1`)
    await sleep(1000);
  }
}
download()
```

+ 下载文件

```js
/**
 * 下载全部fbx文件
 */
const links = Array.from(document.querySelectorAll('.ProductFileRow .mainFileName a'));
// fbxLinks是文件名包含fbx或者class为的链接
const fbxLinks = links.filter(link => (link.innerText.toLowerCase().includes('fbx') || link.parentElement.parentElement.className==='mainFile mainFileHidden hidden')).map(link => link.href);
// const fbxLinks = links.map(link => link.href);
console.log(fbxLinks);
// fbxLinks.forEach((item, index)=> {
//     var iframe = document.createElement('iframe');
//   iframe.src = item
//   iframe.style.display = 'none'; // 隐藏iframe
//   document.body.appendChild(iframe);
// }
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const download = async () => {
  for (let index = 0;index< fbxLinks.length;index++) {
    const item = fbxLinks[index];
    console.log(`开始爬取模型，第${fbxLinks.indexOf(item) + 1}个，总共${fbxLinks.length}个，下载地址：${item}`)
    var iframe = document.createElement('iframe');
    iframe.src = item
    iframe.style.display = 'none'; // 隐藏iframe
    document.body.appendChild(iframe);
    await sleep(61000);
  }
}
download()

/**
 * 下载全部fbx文件和对应的材质
 */
// 选择所有类名为ProductFileRowFiles的元素
var productFileRows = document.querySelectorAll('.ProductFileRowFiles');
// 存储链接地址的数组
var fbxLinks = [];
// 遍历每个ProductFileRowFiles元素
productFileRows.forEach(function(productFileRow) {
  // 找到下载地址所属的文件
  let folder = '模型名'
  var ancestorTd = productFileRow.closest('tr');
  if (ancestorTd) {
    let previousSibling = ancestorTd.previousElementSibling;
    if (previousSibling) {
      let itemNameLabel = previousSibling.querySelector('.itemNameLabel') || previousSibling.querySelector('.itemNameWide');
      if (itemNameLabel) {
        console.log(itemNameLabel.textContent);
        folder = itemNameLabel.textContent
      }
    }
  }
  // 将fbx文件添加到下载列表中
  let hasFbx = false
  Array.from(productFileRow.querySelectorAll('.mainFileName a')).forEach(item => {
    if (item.innerText.toLowerCase().includes('fbx')) {
      fbxLinks.push({
        type: 'fbx',
        folder,
        name: item.textContent,
        url: item.href
      });
      hasFbx = true
    }
  })
  if (!hasFbx) return
  // 将附件添加到下载列表中
  // 找到子元素类名为AccompanyingFiles的元素
  var accompanyingFiles = productFileRow.querySelector('.AccompanyingFiles');
  // 获取AccompanyingFiles元素的所有弟弟元素，并筛选出class为mainFile的元素
  if (accompanyingFiles) {
    var sibling = accompanyingFiles.nextElementSibling;
    while (sibling) {
      // 检查兄弟元素的类名是否为mainFile
      if (sibling.classList.contains('mainFile')) {
        // 找到兄弟元素中的<a>标签
        var link = sibling.querySelector('a');
        if (link) {
          // 将链接地址存储到数组中
          fbxLinks.push({
            type: 'attachment',
            folder,
            name: link.textContent,
            url: link.href
          });
        }
      }
      sibling = sibling.nextElementSibling;
    }
  }
});
console.log(fbxLinks)
// 输出数组内容
console.log(fbxLinks);
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const download = async () => {
  for (let index = 0;index< fbxLinks.length;index++) {
    const item = fbxLinks[index];
    console.log(`开始爬取模型，第${fbxLinks.indexOf(item) + 1}个，总共${fbxLinks.length}个，下载地址：${item}， ${new Date().toLocaleString()}`)
    var iframe = document.createElement('iframe');
    iframe.src = item
    iframe.style.display = 'none'; // 隐藏iframe
    document.body.appendChild(iframe);
    // window.open(item)
    await sleep(61000);
  }
}
download()

/**
 * 下载全部文件和对应的材质
 * */
// 选择所有类名为ProductFileRowFiles的元素
var productFileRows = document.querySelectorAll('.ProductFileRowFiles');
// 存储链接地址的数组
var fileLinks = [];
// 遍历每个ProductFileRowFiles元素
productFileRows.forEach(function(productFileRow) {
  // 找到下载地址所属的文件
  let folder = '模型名'
  var ancestorTd = productFileRow.closest('tr');
  if (ancestorTd) {
    let previousSibling = ancestorTd.previousElementSibling;
    if (previousSibling) {
      let itemNameLabel = previousSibling.querySelector('.itemNameLabel') || previousSibling.querySelector('.itemNameWide');
      if (itemNameLabel) {
        console.log(itemNameLabel.textContent);
        folder = itemNameLabel.textContent
      }
    }
  }
  // 将文件添加到下载列表中
  Array.from(productFileRow.querySelectorAll('.mainFileName a')).forEach(item => {
    fileLinks.push({
      type: 'model',
      folder,
      name: item.textContent,
      url: item.href
    });
  })
  // 将附件添加到下载列表中
  // 找到子元素类名为AccompanyingFiles的元素
  var accompanyingFiles = productFileRow.querySelector('.AccompanyingFiles');
  // 获取AccompanyingFiles元素的所有弟弟元素，并筛选出class为mainFile的元素
  if (accompanyingFiles) {
    var sibling = accompanyingFiles.nextElementSibling;
    while (sibling) {
      // 检查兄弟元素的类名是否为mainFile
      if (sibling.classList.contains('mainFile')) {
        // 找到兄弟元素中的<a>标签
        var link = sibling.querySelector('a');
        if (link) {
          // 将链接地址存储到数组中
          fileLinks.push({
            type: 'attachment',
            folder,
            name: link.textContent,
            url: link.href
          });
        }
      }
      sibling = sibling.nextElementSibling;
    }
  }
});
console.log(fileLinks, JSON.stringify(fileLinks))
// 下载文件移步download.js
```
