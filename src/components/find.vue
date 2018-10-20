<template>
  <div>
    <el-header style="position: fixed;top:0px;left:0px; width:100vw;">
      <el-row type="flex" class="header" justify="space-around">
        <div class="header-text header-col">{{$store.state.title}}</div>
      </el-row>
    </el-header>
    <el-button type="primary" icon="el-icon-back" class="iconBack"></el-button>
    <transition-group name="list-complete" tag="p">
      <el-card
        v-for="item in 10"
        v-bind:key="item"
        class="box-card"
      >
        <div slot="header" class="clearfix">
          <span class="name">王花花</span>
          <span class="school">信息与通信工程学院</span>
          <span class="class">电子信息类</span>
          <span class="number">2017211110</span>
          <el-button style="float: right; padding: 3px 0" type="text">选择</el-button>
        </div>
        <div  class="text-item">
          我是许愿内容 我要脱单
        </div>
      </el-card>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "find",

}
</script>

<style>
  .iconBack {
    position: fixed;
    z-index:999;
    left:0;
    top:0;
    color: aliceblue;
    font-size: 18px;
    padding: 10px;
  }
  .box-card > .el-card__header {
    padding: 10px 20px;
  }
  

  .text-item {
    font-size: 12px;
  }
  .el-select .el-input {
    width: 130px;
  }
  /* .input-with-select .el-input-group__prepend {
    background-color: #fff;
  } */
  .clearfix > .name {
    font-size: 16px;
  }
  .clearfix > .school,.class,.number {
    color: #828282;
    font-size: 7px;
  }
</style>
