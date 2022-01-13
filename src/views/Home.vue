<template>
  <div class="home">
    <a-list item-layout="horizontal" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :bordered="false" style="width: 100%">
          <a-card-meta>
            <div slot="title">{{ item.title }}</div>
            <div slot="description" style="text-align: left">
              {{ item.content }}
              <a-tag style="float: right">{{
                item.updatedAt | formatTime
              }}</a-tag>
            </div>
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
        <a-card :bordered="false" style="width: 100%">
          <a-comment v-if="item.showMesg">
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" v-model="comment" />
              </a-form-item>
              <a-form-item>
                <a-button
                  :loading="submitting"
                  type="primary"
                  @click="handleComment(item)"
                >
                  确定
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
          <reply-comment
            v-for="(mesg, index) in item.comments"
            :key="index"
            :comment="mesg"
          >
          </reply-comment>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import moment from "moment";
import { SearchPost, DeletePost, CreateComment, SearchComment } from "../apis";
import ReplyComment from "../components/reply-comment.vue";
export default {
  name: "Home",
  components: {
    ReplyComment,
  },
  filters: {
    formatTime(date) {
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
  },
  data() {
    return {
      list: [],
      submitting: false,
      comment: "",
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
    getComments(item) {
      SearchComment(item.id)
        .then((res) => {
          item.comments = res.data;
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    handleComment(item) {
      this.submitting = true;
      CreateComment({
        postId: item.id,
        message: this.comment,
      })
        .then(() => {
          item.showMesg = false;
          this.getComments(item);
        })
        .catch(() => {
          console.error("获取信息失败");
        })
        .finally(() => {
          this.comment = "";
          this.submitting = false;
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
      .ant-comment-inner {
        padding: 0px 0px;
      }
    }
  }
  .replay-actions {
  }
}
</style>