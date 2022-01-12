<template>
  <div class="home">
    <a-list item-layout="horizontal" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card hoverable style="width: 100%">
          <a-card-meta>
            <a-avatar
              slot="avatar"
              :size="64"
              shape="circle"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div slot="title">Card title</div>
            <div slot="description">This is the description</div>
          </a-card-meta>
          <template slot="actions" class="ant-card-actions">
            <a-icon key="like" type="like" />
            <a-icon key="dislike" type="dislike" />
            <a-icon key="message" type="message" />
            <a-icon key="edit" type="edit" />
            <a-icon key="delete" type="delete" />
            <a-icon key="bell" type="bell" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = Array.from({ length: 12 }).map((elem) => ({
      key: uuidv4(),
    }));
  },
  mounted() {},
};
</script>
<style lang="less">
.home {
  .ant-list-items {
    background-color: #f4f5f5;
    .ant-list-item {
      margin-bottom: 10px;
      padding: 0 0;
    }
  }
}
</style>