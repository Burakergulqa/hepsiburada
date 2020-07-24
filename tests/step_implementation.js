/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf ,$ , click ,scrollDown} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless,
                        args: ["--start-fullscreen"]
    })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto hepsiburada main page", async () => {
    await goto('https://www.hepsiburada.com/');
});

step("Write to Searchbar for <keyword>", async(keyword) =>{
    await focus($('.desktopOldAutosuggestTheme-input'))
    await write(keyword)
    await click($('.SearchBoxOld-buttonContainer'))
})

step("Check product listing page", async()=>{
    const isExist = await $('.product-image').exists()
    assert.ok(isExist,"Products not listed")

})
step("Select first product on listing page", async()=>{
    await click($('.product-image'))
})
step("Click comment tab button", async () => {
    await scrollDown(1000);
    await click($('#reviewsTabTrigger'))
});

step("First comment yes button", async () => {
    await scrollDown(50);
    await click($('.ReviewCard-module-1MoiF'))
});

step("Check thanks message", async () => {
    assert.ok(await ($('.ReviewCard-module-1ZiTv')).exists(), "Thanks message is not coming")
});
