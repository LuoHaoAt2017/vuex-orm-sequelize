const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/index");
const { connect } = require("./model/index");

try {
  const app = express();
  // 虚拟路径前缀
  app.use("/static", express.static("./assets"));
  // 解析 form 参数
  app.use(bodyParser.urlencoded({ extended: false }));
  // 解析 json 参数
  app.use(bodyParser.json());
  //设置跨域访问
  app.all("*", function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,X-Custom-Timestrap"
    );
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  // 注册路由
  app.use(router);
  // 链接数据库
  connect();
  // 指定端口
  app.listen(7001, function () {
    console.log("server listen on 7001");
  });
} catch (err) {
  console.error(err);
}
