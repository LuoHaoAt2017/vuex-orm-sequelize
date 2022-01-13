<template>
  <div class="replay">
    <a-comment>
      <a slot="author">Han Solo</a>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content" style="text-align: left">
        {{ comment.message }}
        <a-tag style="float: right">{{ comment.updatedAt | formatTime }}</a-tag>
      </div>

      <template slot="actions">
        <a-button-group class="replay-actions">
          <a-button icon="like"></a-button>
          <a-button icon="dislike"></a-button>
          <a-button icon="message" @click="toggleMessage(comment)"></a-button>
          <a-button icon="delete" @click="deleteMessage(comment)"></a-button>
        </a-button-group>
      </template>

      <a-comment v-if="comment.unfold">
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="2" v-model="message" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleReply(comment)">
              确定
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
      <reply-comment
        v-for="(mesg, index) in comment.messages"
        :key="index"
        :comment="mesg"
      >
      </reply-comment>
    </a-comment>
  </div>
</template>
<script>
import moment from "moment";
import { ReplyComment, SearchReply, DeleteReply } from "../apis";
export default {
  name: "ReplyComment",
  props: ["comment"],
  filters: {
    formatTime(date) {
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    handleReply(item) {
      ReplyComment({
        comment: item.id,
        message: this.message,
      })
        .then(() => {
          this.getReplies(item);
          item.unfold = false;
        })
        .catch(() => {
          console.error("获取信息失败");
        })
        .finally(() => {
          this.message = "";
        });
    },
    toggleMessage(item) {
      item.unfold = !item.unfold;
    },
    getReplies(item) {
      SearchReply(item.id)
        .then((res) => {
          this.$set(item, "messages", res.data.messages || []);
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    deleteMessage(item) {
      DeleteReply(item.id)
        .then(() => {
          debugger;
          this.$emit("refresh");
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
  created() {
    this.$set(this.comment, "unfold", false);
  },
};
</script>
<style lang="less" scoped>
.comment-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .replay-actions {
    margin-bottom: 20px;
  }
}
</style>