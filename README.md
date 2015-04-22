# WebSockets
> "WebSockets is an advanced technology that makes it possible to open an interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply."

[WebSockets | MDN](https://developer.mozilla.org/en-US/docs/WebSockets)

"WebSocket is designed to be implemented in web browsers and web servers, but it can be used by any client or server application. The WebSocket Protocol is an independent TCP-based protocol. Its only relationship to HTTP is that its handshake is interpreted by HTTP servers as an Upgrade request. The WebSocket protocol makes more interaction between a browser and a website possible, facilitating live content and the creation of real-time games. This is made possible by providing a standardized way for the server to send content to the browser without being solicited by the client, and allowing for messages to be passed back and forth while keeping the connection open. In this way a two-way (bi-directional) ongoing conversation can take place between a browser and the server. A similar effect has been achieved in non-standardized ways using stop-gap technologies such as Comet.""

[WebSocket | Wikipedia](http://en.wikipedia.org/wiki/WebSocket)

## Why?

The below answer from [stackoverflow](http://stackoverflow.com/questions/3617583/why-do-we-need-web-sockets) is pretty accurate.

1. WebSocket is a naturally full-duplex, bidirectional, single-socket connection. With WebSocket, your HTTP request becomes a single request to open a WebSocket connection and reuses the same connection from the client to the server, and the server to the client.

2. WebSocket reduces latency. For example, unlike polling, WebSocket makes a single request. The server does not need to wait for a request from the client. Similarly, the client can send messages to the server at any time. This single request greatly reduces latency over polling, which sends a request at intervals, regardless of whether messages are available.

3. WebSocket makes real-time communication much more efficient. You can always use polling (and sometimes even streaming) over HTTP to receive notifications over HTTP. However, WebSocket saves bandwidth, CPU power, and latency. WebSocket is an innovation in performance.

4. WebSocket is an underlying network protocol that enables you to build other standard protocols on top of it.

5. WebSocket is part of an effort to provide advanced capabilities to HTML5 applications in order to compete with other platforms.

6. WebSocket is about simplicity.

Ultimately, once in place - we write less and simpler code.

## Browser Support
Supported on most modern browsers including IE10.

[Can I Use WebSockets](http://caniuse.com/#feat=websockets)

## Helpful Links
- [Writing WebSocket client applications](https://developer.mozilla.org/en-US/docs/WebSockets/Writing_WebSocket_client_applications)
- [WebSocket over HTTP/2.0](https://github.com/yutakahirano/ws-over-http2/blob/master/ws-over-http2-message-mapping.md)