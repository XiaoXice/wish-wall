<template>
  <div>
    <el-header style="position: fixed;top:0px;left:0px; width:100vw;">
      <el-row type="flex" class="header" justify="space-around">
        <div class="header-text header-col">{{$store.state.title}}</div>
      </el-row>
    </el-header>
    <el-button @click="back" type="primary" icon="el-icon-back" class="iconBack"></el-button>
    <el-card
    v-for="(item,index) in items"
    v-if="items.length"
    v-bind:key="item<0?index:item"
    class="box-card"
    >
    <div slot="header" class="clearfix">
      <span class="name">第 {{getMsg(item).index}} 号</span>
      <br>
      <span class="number"> | {{getMsg(item).connect}}</span>
    </div>
    <div  class="text-item">
      {{getMsg(item).content}}
    </div>
    <!-- <div v-if="getMsg(item).other" class="text-item-other">
      {{getMsg(item).other}}
    </div> -->
    </el-card>
    <div class="error" v-if="!items.length">抱歉,什么都没找到呢..</div>
  </div>
</template>

<script>
export default {
  name: "find",
  data(){
    return {
      items:[],
      loading: true
    }
  },
  mounted() {
    let out = this.$store.state.idx.search(this.$route.params.kw);
    if(out.length == 0){
      if(this.$store.state.dataBase[this.$route.params.kw])
      out = [{ref:this.$route.params.kw}];
    }
    for (const item of out) {
      this.items.push(item.ref-1)
    }
    this.loading = false;
  },
  methods:{
    getMsg(number){
      if(number == -1)
      return {"name": ".....", "grade": ".....", "class": ".....", "number": ".....", "text": ".....", "other": "....." }
      else
      return this.$store.state.dataBase[number];
    },
    back(){
      this.$router.back();
    }
  }
}
</script>

<style>
  .error{
    color: #828282;
    text-align: center;
    font-size: 18px;
  }
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
    font-size: 9px;
  }
</style>
