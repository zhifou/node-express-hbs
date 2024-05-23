/**
 * Created by zhaoyadong on 12/11/2017.
 */
var eventSource = {
    index: function (req, res, next) {
        // 根据 EventSource 规范设置报头
        res.writeHead(200, {
            "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
            "Cache-Control": "no-cache", // 设置不对页面进行缓存
            'Connection': 'keep-alive'
        });
        // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
        res.write("data:" + "消息内容1" + "\n\n"); // 未命名事件

        res.write(
            // 命名事件
            "event: customEvent" + "\n" +
            "data: 消息内容2" + "\n\n"
        );

        res.flushHeaders();

        setInterval(() => {
            // 定时事件
            console.log("定时事件::" + req.headers.authorization);
            res.write(
                "event: customEvent" + "\n" +
                "data: 消息内容3 - " + Math.random() + "\n\n"
            );
        }, 5000);
    },
};

module.exports = eventSource;
