<template>
  <div class="home">
    <a-list item-layout="horizontal" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :bordered="false" style="width: 100%">
          <a-card-meta>
            <div slot="title">{{ item.title }}</div>
            <div slot="description">{{ item.content }}</div>
          </a-card-meta>

          <template slot="actions" class="ant-card-actions">
            <a-icon key="like" type="like" />
            <a-icon key="dislike" type="dislike" />
            <a-icon key="message" type="message" @click="toggleMessage(item)" />
            <a-icon key="edit" type="edit" @click="handleUpdate(item)" />
            <a-popconfirm
              placement="topLeft"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDelete(item)"
            >
              <template slot="title">
                <p>你确定要删除吗</p>
              </template>
              <a-icon key="delete" type="delete" />
            </a-popconfirm>
            <a-icon key="bell" type="bell" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
        </a-card>
        <a-card :bordered="false" v-if="item.showMesg">
          <a-comment>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <p slot="content">
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure).
            </p>
            <span slot="actions" key="comment-nested-reply-to">回复</span>
          </a-comment>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { SearchPost, DeletePost } from "../apis/index";
export default {
  name: "Home",
  data() {
    return {
      list: [],
      submitting: false,
    };
  },
  created() {
    this.getAllPosts();
  },
  methods: {
    handleSubmit() {},
    handleUpdate(item) {
      this.$router.push({
        name: "Post",
        query: {
          postId: item.id,
        },
      });
    },
    handleDelete(item) {
      DeletePost(item.id)
        .then(() => {
          this.getAllPosts();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    toggleMessage(item) {
      item.showMesg = !item.showMesg;
    },
    getAllPosts() {
      SearchPost()
        .then((res) => {
          this.list = res.data.map((elem) => ({
            ...elem,
            key: elem.id,
            showMesg: false,
          }));
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>
<style lang="less">
.home {
  .ant-list-items {
    background: #f4f5f5;
    .ant-list-item {
      margin-bottom: 10px;
      padding: 0 0;
      flex-direction: column;
      background: #fff;
    }
  }
}
</style>