import puppeteer from 'puppeteer'

export const visit = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://juejin.im')
  await page.screenshot({
    path: './juejin.png'
  })
}

export const visitFE = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://juejin.im')
  const navSelector = '.view-nav .nav-item'
  const navType = '前端'
  await page.waitFor(navSelector)
  const navList = await page.$$eval(navSelector, els =>
    els.map(el => el.innerText)
  )
  const webNavIndex = navList.findIndex(item => item === navType)
  await Promise.all([
    page.waitForNavigation(),
    page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
  ])
  await page.screenshot({
    path: './juejin-web.png'
  })
}

export const fetchFE = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://juejin.im')
  const navSelector = '.view-nav .nav-item'
  const listSelector = '.entry-list .item a.title'
  const navType = '前端'
  await page.waitFor(navSelector)
  const navList = await page.$$eval(navSelector, els =>
    els.map(el => el.innerText)
  )
  const webNavIndex = navList.findIndex(item => item === navType)
  await Promise.all([
    page.waitForNavigation(),
    page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
  ])
  await page.waitForSelector(listSelector, {
    timeout: 5000
  })
  const res = await page.$$eval(listSelector, els =>
    els.map(el => ({
      url: el.href,
      text: el.innerText
    }))
  )

  console.log(res)
}
