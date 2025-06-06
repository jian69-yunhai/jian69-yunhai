def getHtml(ulr):
    import asyncio
    import pyppeteer as pyp
    async def asGetHtml(url):
       browser = await pyp.launch(headless=False)
       page = await browser.newPge()
       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')
       await page.evaluateOnNewDocument('() => { Object.defineProperties(navigator, { webdriver: { get: () => false } }) }')
       await page.goto(url)
       text = await page.content()
       await browser.close()
       return text

#m = asyncio.ensure_future(asGetHtml(ulr))
#asyncio.get_event_loop().run_until_complete(m)
#return m.result()
 