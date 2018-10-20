<template>
  <el-container id="app">
    <el-header style="margin-left:-8px;margin-top:-8px; width:100vw;">
      <el-row type="flex" class="header" justify="space-around">
        <div class="header-text header-col">{{$store.state.title}}</div>
      </el-row>
    </el-header>
    <el-main>
      <router-view v-wechat-title="$store.state.DocTitle"/>
    </el-main>
    <el-footer class="page-footer">
      <div class="container">
        <div class="section center-align white-text">©2018 北京邮电大学学生会网络部</div>
    </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  background-color: #fff;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.el-header {
  background-color: #E16B8C;
  box-shadow: 0 2px 5px #888888;
}
.header {
  height: 100%;
}
.header-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-text {
  color: aliceblue;
  font-size: 0.75rem;
  text-align: center;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.center-align {
  text-align: center;
  color: #888888;
  font-size: 0.3rem;
}
.el-message-box {
  width: auto;
  max-width: 90vw;
}
</style>
