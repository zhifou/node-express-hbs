var ws = new WebSocket("ws://localhost:4000");
ws.onopen = function () {
    console.log("ws onopen");
    ws.send("from client: hello");
    setInterval(() => {
        ws.send("from client: " + Math.random());
    }, 10000);
};
ws.onmessage = function (e) {
    console.log("ws onmessage::from server: " + e.data);
    document.getElementById("blackJack").innerHTML = e.data;
};
// 监听连接关闭
ws.onclose = function (evt) {
    console.log("ws onclose");
};
