# NestJs模板（CORS）

跨源资源共享（`CORS`）是一种允许从另一个域请求资源的机制。在底层，`Nest` 使用了 Express 的[cors](https://github.com/expressjs/cors) 包，它提供了一系列选项，您可以根据自己的要求进行自定义。

## 启用cors

```typescript
const app = await NestFactory.create(AppModule);
const options = {}
app.enableCors(options);
await app.listen(3000);

//或者

const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(3000);


// options支持的项
const options = {
    /**
    * 设置为Boolean：开启或关闭cors
    * 设置为String：仅允许该站点的访问
    * 设置为RegExp：使用正则表达式匹配站点
    * 设置为Array：接受来自多个站点的访问
    * 设置为Function：回调 (err,origin):boolean=>true 可自定义可访问那些站点
    */
    origin:"",
    /**
    * 指定哪些 HTTP 方法（例如 GET、POST、PUT 等）允许在跨域请求中使用。
    * 例：['GET','PUT']
    */
    methods:"",
    /**
    * 指定哪些 HTTP 头部字段允许在请求中包含。这通常用于支持自定义的 HTTP 头部。
    * 默认值：['Content-Type', 'Authorization']
    */
    allowedHeaders:"",
    /**
    * 指定哪些 HTTP 头部字段可以在响应中暴露给客户端，以便客户端能够访问它们。
    * 例：['Content-Range', 'X-Content-Range']
    */
    exposedHeaders:"",
    /**
    * 传一个boolean值
    * 指定是否允许在跨域请求中发送身份验证凭证（例如 cookies、HTTP 认证信息）。
    */
    credentials:"",
    /**
    * 指定浏览器应该缓存预检请求的结果多长时间，以减少对服务器的重复预检请求。
    * 传递数字-单位：秒
    * 传递字符串- "s" 表示秒，"m" 表示分钟，"h" 表示小时，"d" 表示天 例：'1d'
    */
    maxAge:10,
    /**
    * 指定是否将 CORS 预检响应传递给下一个请求处理程序。
    */
    preflightContinue:true,
    /**
    * 提供一个成功的 OPTIONS 请求的状态码，用于指定在成功的预检请求后返回的 HTTP 状态码
    */
    optionsSuccessStatus:200
}

tip:什么是预检请求，有什么作用？
预检请求（Preflight Request）是跨域资源共享（CORS）机制中的一种特殊的 HTTP 请求，用于在实际的跨域请求之前执行一次预检以确定是否允许实际请求。预检请求的主要目的是确保安全地进行跨域请求，以防止潜在的安全风险。

以下是预检请求的关键特点和用途：

发起时机：浏览器在发起某些跨域请求之前会先发送一个 OPTIONS 请求，这个 OPTIONS 请求即为预检请求。这种请求通常发生在以下情况下：

使用非简单 HTTP 方法（例如 PUT、DELETE）进行跨域请求。
发送包含自定义 HTTP 头部字段的请求。
使用某些类型的 Content-Type（例如 application/json）。
其他可能导致跨域安全性问题的情况。
内容：预检请求包含一些 CORS 相关的头部字段，例如 Origin（指示请求的来源）、Access-Control-Request-Method（请求的 HTTP 方法）、Access-Control-Request-Headers（请求的自定义头部字段）等。

服务器处理：接收到预检请求的服务器会根据请求头部的信息来判断是否允许实际请求。服务器需要配置合适的 CORS 响应头部，包括 Access-Control-Allow-Origin（指定允许访问的域名）、Access-Control-Allow-Methods（指定允许的 HTTP 方法）、Access-Control-Allow-Headers（指定允许的头部字段）等。

浏览器处理：浏览器会根据预检请求的响应来决定是否继续发送实际的跨域请求。如果服务器的响应符合 CORS 规则，浏览器会发送实际请求；否则，它将阻止实际请求的发送，以确保安全性。

安全性：预检请求有助于减少跨域请求可能引发的潜在安全问题，因为它允许服务器在实际请求之前验证请求的来源和允许的操作，从而避免恶意网站利用用户的身份执行危险的操作。

总之，预检请求是跨域请求的一部分，用于确保安全性和控制哪些跨域请求是允许的。通过配置服务器和合适的 CORS 响应头部，开发人员可以实现安全的跨域数据访问。
```

