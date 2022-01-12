const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");

const database = "post";
const username = "root";
const password = "LuoHao-123";

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  define: {
    freezeTableName: true, // 停止 Sequelize 执行自动复数化。 Sequelize 将推断表名称等于模型名称,而无需进行任何修改。
  },
});

// 帖子
const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

// 用户
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

// 评论
const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

// 点赞()
const Like = sequelize.define("Like", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

// 订阅
// dispatcher
// subscriber
// 用户和用户之间相互订阅

// 收藏
// 用户收藏帖子

// 点赞
// 用户点赞/倒赞帖子

// 在同一模型之间定义两个不同的关联时,别名特别有用.

// 一个作者拥有多篇帖子，一篇帖子只有一个作者。
User.hasMany(Post, {
  foreignKey: "author_id",
  as: "posts",
});
Post.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

// 一篇帖子可以拥有多条评论，一条评论只属于一篇帖子。
Post.hasMany(Comment, {
  foreignKey: "commentator_id",
  as: "comments",
});
Comment.belongsTo(Post, {
  foreignKey: "commentator_id",
  as: "post",
});

// 一位观众可以发表多条评论，一条评论只能由一位观众发表。
User.hasMany(Comment, {
  foreignKey: "commentator_id",
  as: "comments",
});
Comment.belongsTo(User, {
  foreignKey: "commentator_id",
  as: "commentator",
});

// 一位博主可以订阅多位博主， 一位博主可以被多位博主订阅
User.belongsToMany(User, {
  through: "subscrib",
  as: "subscribers",
});
User.belongsToMany(User, {
  through: "subscrib",
  as: "publishers",
});

// 一位用户可以收藏多篇帖子，一篇帖子可以被多位用户收藏
User.belongsToMany(Post, {
  through: "favorites",
  as: "collects",
});
Post.belongsToMany(User, {
  through: "favorites",
  as: "owners",
});

module.exports = async function connect() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
