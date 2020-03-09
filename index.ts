import puppeteer from "puppeteer";

(async () => {
    console.log("init");
    let browser: puppeteer.Browser|undefined;
    let page: puppeteer.Page|undefined;
    try {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("https://github.com/akaishi-sandbox", {
          waitUntil: "networkidle0",
          timeout: 0
        });
        const data = await page.evaluate(() => {
            const repos: string[] = [];
            document.querySelectorAll("div.org-repos > ul > li").forEach(value => {
                repos.push(value.querySelector("a.d-inline-block")?.textContent?.trim() || "");
            });
            return {
                repos: repos,
                count: document.querySelector("div.search-result__count > em.search-result__count--hit")?.textContent || 0
            };
        });
        console.log("data:", data);
        // await page.$eval(
        //     "div.search-result__count > em.search-result__count--hit",
        //     tag => tag.textContent
        // );
    } finally {
        await page?.close();
        await browser?.close();
    }

})();
