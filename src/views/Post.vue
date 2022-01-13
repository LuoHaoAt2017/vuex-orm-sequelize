<template>
  <div class="post">
    <a-form
      :wrapper-col="{ span: 18, offset: 3 }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item>
        <h3>文章标题</h3>
        <a-input
          v-model="formFields.title"
          v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '请输入文章标题!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <h3>文章分类</h3>
        <a-select
          v-model="formFields.category"
          v-decorator="[
            'category',
            {
              rules: [{ required: true, message: '请选择分类标签!' }],
            },
          ]"
        >
          <a-select-option
            v-for="(item, index) in categories"
            :key="index"
            :value="item.code"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <h3>文章内容</h3>
        <a-textarea
          v-model="formFields.content"
          v-decorator="[
            'content',
            {
              rules: [{ required: true, message: '请输入文章内容!' }],
            },
          ]"
          :autoSize="{
            minRows: 12,
          }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
        <a-button type="primary" style="width: 100%" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { CreatePost, UpdatePost, QueryPost } from "../apis/index";
export default {
  name: "post",
  data() {
    return {
      categories: [
        {
          code: 1,
          name: "前端",
        },
        {
          code: 2,
          name: "后端",
        },
        {
          code: 3,
          name: "运维",
        },
        {
          code: 4,
          name: "产品",
        },
        {
          code: 5,
          name: "测试",
        },
        {
          code: 6,
          name: "界面设计",
        },
      ],
      formFields: {
        postId: "",
        title: "",
        content: "",
        category: null,
        authorId: "",
      },
    };
  },
  computed: mapState({
    userId: (state) => state.userInfo && state.userInfo.id,
  }),
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const postId = this.$route.query.postId;
      const values = this.formFields;
      if (postId) {
        this.updatePost(values);
      } else {
        this.createPost(values);
      }
    },
    createPost(values) {
      CreatePost({
        author: this.userId,
        title: values.title,
        content: values.content,
        category: values.category,
      })
        .then(() => {
          this.$router.push({
            name: "Home",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updatePost(values) {
      UpdatePost({
        id: values.postId,
        title: values.title,
        content: values.content,
        category: values.category,
        authorId: values.authorId
      })
        .then(() => {
          this.$router.push({
            name: "Home",
          });
        })
        .catch((err) => {
          console.error(err.stack);
        });
    },
    searchPost(postId) {
      QueryPost(postId)
        .then((res) => {
          this.formFields = {
            postId: res.data.id,
            title: res.data.title,
            category: res.data.category,
            content: res.data.content,
            authorId: res.data.author_id,
          };
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  },
  created() {
    const postId = this.$route.query.postId;
    postId && this.searchPost(postId);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.post {
  padding: 20px 0;
}
</style>
