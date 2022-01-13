<template>
  <div id="app">
    <div id="nav">
      <div class="logo"></div>
      <div>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
      </div>
      <a-dropdown class="auth-center">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="navigate('/post')"> <a-icon type="plus" />发表文章</a-menu-item>
          <a-menu-item key="2"> <a-icon type="user" />用户中心 </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px" type="primary">
          创作者中心 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    navigate(url) {
      this.$router.push({
        path: url
      });
    }
  }
}
</script>
<style>
body {
  background: #f4f5f5!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f5f5;
  position: relative;
}

#nav {
  background-color: #fff;
  position: sticky;
  top: 0px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: thin solid #eee;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
  padding: 0 10px;
}

#nav .logo {
  width: 60px;
  height: 60px;
  background-size: 60px 60px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("./assets/logo.png");
}

#nav a.router-link-exact-active {
  color: #42b983;
}

main {
  background-color: #fff;
  width: 800px;
  border-radius: 4px;
  margin: 10px auto;
}
</style>
