<template>
  <div class="post">
    <a-form
      :form="form"
      :wrapper-col="{ span: 18, offset: 3 }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item>
        <h3>文章标题</h3>
        <a-input
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
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <h3>文章内容</h3>
        <a-textarea
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
import { CreatePost } from "../apis";
export default {
  name: "post",
  data() {
    return {
      categories: ["前端", "后端", "运维", "数据库", "产品", "测试", "UI"],
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", err);
          this.createPost(values);
        }
      });
    },
    createPost(values) {
      CreatePost({
        title: values.title,
        content: values.content,
        category: values.category,
      })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.post {
  padding: 20px 0;
}
</style>
