<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f5f5;
}

#nav {
  padding: 20px;
  background-color: #fff;
  position: sticky;
  top: 0px;
  z-index: 1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
  padding: 0 10px;
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
