document.getElementById("eventOpen").addEventListener("click", () => {
    console.log("token::", token);
    // 实例化 EventSource 参数是服务端监听的路由
    // var source = new EventSourcePolyfill("/sse", {
    var source = new EventSourcePolyfill("/api/eventsource", {
        headers: {
            Authorization: token,
        },
    });
    source.onopen = function (event) {
        // 与服务器连接成功回调
        console.log("SSE成功与服务器连接");
    };
    // 监听从服务器发送来的所有没有指定事件类型的消息(没有event字段的消息)
    source.onmessage = function (event) {
        // 监听未命名事件
        console.log("未命名事件", event.data, event);
    };
    source.onerror = function (error) {
        // 监听错误
        console.log("错误");
    };
    // 监听指定类型的事件（可以监听多个）
    source.addEventListener("customEvent", function (event) {
        console.log("自定义事件", event.data);
    });
});
