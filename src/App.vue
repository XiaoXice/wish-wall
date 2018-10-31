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
  name: 'App',
  data(){
    return {
      chooselist:[]
    }
  }
}
</script>

<style>
body {
  background-color: #fff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  overflow-x:hidden;
}
.el-header {
  background-color: #e16b8c;
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

.flex-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
}

.deletbtn > span {
  display: none;
}

.inOutLine{
  width: 90%;
}

.outList {
  height: 80vh;
  max-height: 300px;
  width: 80vw;
  max-width: 500px;
  overflow:auto;
  overflow-x:hidden;
}
.school,.class,.number {
    color: #828282;
    font-size: 9px;
  }
</style>
