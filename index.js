const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://creator.qa.growlib.com/index', { timeout: 0 });

  async function extractLinks() {
    return await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(anchor => anchor.href);
    });
  }

  async function goToNextPage() {
    const nextPageSelector = '#next-page';
    try {
      console.log('Going to next page...');
      await page.waitForSelector(nextPageSelector, { timeout: 5000 });
      await Promise.all([
        page.click(nextPageSelector),
        page.waitForNavigation({ timeout: 0 })
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  let allLinks = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const links = await extractLinks();
    allLinks = allLinks.concat(links);
    hasNextPage = await goToNextPage();
  }

  fs.writeFileSync('links.txt', allLinks.join('\n'), 'utf-8');

  await browser.close();

  console.log('Done!');
})();
