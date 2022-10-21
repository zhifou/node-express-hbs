/**
 * Created by zhaoyadong on 12/11/2017.
 */
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

const puppeteer = require("puppeteer");

const imgDir = (ext) =>
    path.resolve(__dirname, "images", Date.now() + "." + ext);

const base64ToImg = async (src) => {
    // data:image/png;base64,6as4dfg6a4f6a46dg46sdf
    const reg = /^data:image\/(.*?);base64,(.*)/;
    const result = src.match(reg);
    const ext = result[1];
    const data = Buffer.from(result[2], "base64");
    console.log("base64ToImg : ", src.slice(0, 50));
    await writeFile(imgDir(ext), data);
};

async function getImg(src) {
    if (/^http:\/\/|https:\/\//.test(src)) {
        await urlToImg(src);
    } else {
        await base64ToImg(src);
    }
}

const urlToImg = promisify((str, callback) => {
    const mode = /^https:\/\//.test(str) ? https : http;
    mode.get(str, (res) => {
        res.pipe(fs.createWriteStream(imgDir("png"))).on("finish", () => {
            console.log("pipe finish ...", str);
            callback();
        });
    });
});

const arrayBufferToBase64Img = (buffer) => {
    const str = String.fromCharCode(...new Uint8Array(buffer));
    console.log("str::", str);
    // return `data:image/jpeg;base64,${window.btoa(str)}`;
};

const buildCookie = (rawHeaders) => {
    const result = {};
    const headersKeys = (rawHeaders || [])
        .map((item, index) => {
            if (index % 2) {
                return null;
            }
            return item;
        })
        .filter((item) => !!item);
    const headersValues = (rawHeaders || [])
        .map((item, index) => {
            if (index % 2) {
                return item;
            }
            return null;
        })
        .filter((item) => !!item);
    (rawHeaders || []).forEach((item, index) => {});
    headersKeys.forEach((item, index) => {
        result[item] = headersValues[index];
    });
    return result;
};

var index = {
    puppe: async function (req, res) {
        console.log("hello world!");
        // console.log(res.req.rawHeaders);
        // console.dir(res.req.cookies)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080,
        });

        const headers = new Map();
        // headers.set("Authorization", `Basic ${Math.random()}`);
        const jsonHeader = buildCookie(res.req.rawHeaders);

        Object.keys(jsonHeader).forEach((item) => {
            headers.set(item.toLowerCase(), jsonHeader[item]);
        });
        console.log("jsonHeader::", jsonHeader);

        await page.setExtraHTTPHeaders(headers);

        await page.goto(
            "http://xsite.xcloud.baidu-int.com/x-test?_=1652598359477"
        );
        
        // await page.setRequestInterception(true);
        // page.on("request", (request) => {
        //     if (request.isInterceptResolutionHandled()) return;

        //     // Override headers
        //     const headers = Object.assign({}, request.headers(), jsonHeader);
        //     request.continue({ headers });
        // });
        const imgBuffer = await page.screenshot({ path: "example.png" });

        const contentStr = imgBuffer.toString("base64");

        // await page.on('load', async () => {
        //     const srcs = await page.evaluate( async () => {
        //       let images = document.querySelectorAll('.main_img');
        //       return Array.prototype.map.call(images, img => img.src);
        //     })
        //     // console.log(srcs);
        //     srcs.forEach( async (ele) => {
        //       await getImg(ele);
        //     });
        //     browser.close();
        //   })
        await browser.close();
        res.send(`data:image/jpeg;base64,${contentStr}`);
    },
};

module.exports = index;
