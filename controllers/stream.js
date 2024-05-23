const fs = require("fs");

var stream = {
    index: function (req, res, next) {
        const readStream = fs.createReadStream(
            __dirname + "/../files/dang.mp3"
        );
        //

        // readStream.on("data", (chunk) => {
        //     console.log(chunk);
        // });

        // readStream.resume();
        // setTimeout(() => {
        //     readStream.on("data", console.log('kong')); // 打印为空
        // }, 1000);

        // readStream.once("data", (chunk) => {
        //     readStream.pause();

        //     // setTimeout(() => {
        //     //     console.log(
        //     //         readStream._readableState.length, // 水龙头 buffer 的大小
        //     //         readStream._readableState.highWaterMark // 最高水位线
        //     //     ); // 65536 65536
        //     // }, 1000);

        //     setTimeout(() => {
        //         console.log('data', readStream._readableState.buffer)
        //         const data =
        //             readStream._readableState.buffer?.head?.data?.toString();
        //         console.log('data', data)
        //         readStream.once("data", (chunk) => {
        //             console.log(data === chunk.toString()); // 第二次读到的数据确实是来自上次 pause 后存放到 buffer 中的
        //         });
        //         readStream.resume();
        //     }, 2000);
        // });

        // console.log(
        //     readStream._readableState.flowing,
        //     readStream._readableState.paused
        // );

        readStream.on("readable", () => {
            let chunk;
            console.log("Stream is readable (new data received in buffer)");
            console.log(
                readStream._readableState.highWaterMark,
                readStream._readableState.length
            );
            // Use a loop to make sure we read all currently available data
            while (null !== (chunk = readStream.read(65537))) {
                console.log(`Read ${chunk.length} bytes of data...`);
            }
        });

        const writeStream = fs.createWriteStream(
            __dirname + "/../files/out-stream.mp3"
        );

        // writeStream.on("open", () => {
        //     writeStream.write("a");
        // });

        readStream.pipe(writeStream);

        // writeStream.cork();
        // writeStream.on("open", () => {
        //     writeStream.write("a"); // 不会写入到磁盘
        //     console.log(
        //         writeStream._writableState.buffered[0].chunk.toString()
        //     ); // a
        //     setTimeout(() => {
        //         writeStream.uncork(); // 打开出口，水会流完
        //         console.log(writeStream._writableState.buffered[0]); // undefined
        //     }, 1000);
        // });

        res.json({
            status: "ok",
        });
    },
    readFile: function (req, res, next) {
        console.log("readFile");
        fs.readFile(__dirname + "/../files/big.file", (err, data) => {
            console.log(16, __dirname + "/../files/big.file", err);
            if (err) throw err;
            fs.writeFile(__dirname + "/../files/out", data, () => {});
        });
        res.json({
            status: "ok",
        });
    },
};

module.exports = stream;
