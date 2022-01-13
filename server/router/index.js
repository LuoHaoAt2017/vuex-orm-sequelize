const Vue = require("vue");
const { Router } = require("express");
const { createRenderer } = require("vue-server-renderer");
const Controller = require("../controller");

const router = Router();

const render = createRenderer({
  // 为整个页面的 HTML 提供一个模板。此模板应包含注释 <!--vue-ssr-outlet-->，作为渲染应用程序内容的占位符。
  template: `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <title>RBAC</title>
        <style type="text/css">
          body {
            width: 80%;
            margin: 0 auto;
          }
          form {
            width: 100%;
            margin: 200px auto;
            padding: 50px 20px;
            border: thin solid #eee;
            border-radius: 4px;
          }
          .form-group {
            display: flex;
          }
          .form-group label {
            width: 150px;
          }
        </style>
      </head>
      <body>
        <!-- 这里将是应用程序 HTML 标记注入的地方。 -->
        <!--vue-ssr-outlet-->
      </body>
    </html>
    `,
});

router.get("/login", function (req, res) {
  const app = new Vue({
    template: `
      <form action="/login" method="post" enctype="application/x-www-form-urlencoded">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="form-group border-bottom">
          <div class="btn-group" role="group" style="width:100%;">
            <button type="submit" class="btn btn-primary" role="button">确定登录</button>
            <a href="/register" class="btn btn-success" role="button">前往注册</a>
            <a href="/auth/github" class="btn btn-warning" role="button">GitHub授权</a>
          </div>
        </div>
      </form>
    `,
  });

  render.renderToString(app, function (err, html) {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.status(200).send(html);
  });
});
router.post("/login", Controller.login);
router.put("/register", Controller.createUser);

router.get("/post/:id", Controller.queryPost);
router.get("/posts", Controller.searchPost);
router.put("/post", Controller.createPost);
router.delete("/post/:id", Controller.deletePost);
router.post("/post", Controller.updatePost);

router.get("/comments/:postId", Controller.searchComment);
router.put("/comment", Controller.createComment);
router.delete("/comment", Controller.deleteComment);
router.post("/comment", Controller.updateComment);

router.put("/reply", Controller.createReply);
router.get("/replies/:commentId", Controller.searchReply);
router.delete("/reply/:commentId", Controller.deleteReply);

router.get("/users", Controller.searchUser);
router.put("/user", Controller.createUser);
router.delete("/user", Controller.deleteUser);
router.post("/user", Controller.updateUser);

module.exports = router;
