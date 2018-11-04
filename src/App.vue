<template>
  <el-container id="app">
    <el-header style="margin-left:-8px;margin-top:-8px; width:100vw;">
      <el-row type="flex" class="header" justify="space-around">
        <div class="header-text header-col">{{$store.state.title}}</div>
      </el-row>
    </el-header>
    <el-main>
      <router-view @throseIt="throseIt" v-wechat-title="$store.state.DocTitle"/>
      <el-button @click="showList" v-if="chooselist.length>0" class="flex-btn" type="primary" circle>{{chooselist.length}}</el-button>

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
  methods:{
    throseIt(number){
      if(this.chooselist.indexOf(number) == -1)
        this.chooselist.push(number);
      // console.log(number)
    },
    deletIt(number){
      if(this.chooselist.indexOf(number) != -1)
        this.chooselist.splice(this.chooselist.indexOf(number),1);
        // this.showList();
    },
    getMsg(number){
      if(number == -1)
      return {"name": ".....", "grade": ".....", "class": ".....", "number": ".....", "text": ".....", "other": "....." }
      else
      return this.$store.state.dataBase[number];
    },
    showList(){
      const h = this.$createElement;
      var getVnode = ()=>{
        /*
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="name">{{getMsg(item).name}}</span>
            <el-button @click="chooseIt(getMsg(item).number)" style="float: right; padding: 3px 0" type="text">选择</el-button>
            <br>
            <span class="school">  {{getMsg(item).grade}}</span>
            <span class="class"> | {{getMsg(item).class}}</span>
            <span class="number"> | {{getMsg(item).number}}</span>
          </div>
          <div  class="text-item">
            {{getMsg(item).text}}
          </div>
          <div v-if="getMsg(item).other" class="text-item-other">
            {{getMsg(item).other}}
          </div>
        </el-card>
        */
      let tmp = [];
      for (const number of this.chooselist) {
        tmp.push(
          h('el-card', { class: "box-card inOutLine" ,style: "width:98%;transition: all 1s;" }, [
            h('div', { slot: "header", class: "name" }, [
              h('span', { class: "name" }, "第 "+this.getMsg(number).index + " 号"),
              h('el-button', {style: "float: right;",class:"el-button el-button--danger is-circle el-icon-delete deletbtn"},number),
              // h('br'),
              // h('span', { class: "school" }, this.getMsg(number).grade),
              // h('span', { class: "class" }, " | " + this.getMsg(number).class),
              // h('span', { class: "number" }, " | " + this.getMsg(number).number),
            ]),
            h('div', { class: "text-item" }, this.getMsg(number).content),
            // h('div', { class: "text-item-other" }, this.getMsg(number).other)
          ])
        )
       }
       setTimeout(
         ()=>{
           for (const btn of document.getElementsByClassName("deletbtn")) {
             var that = this;
             btn.onclick = function(res){
               this.parentNode.parentNode.parentElement.style = "display:none;"
              //  console.log(this.childNodes[2].textContent)
               that.deletIt(this.childNodes[2].textContent);
             }
           } 
         }
       ,50)
       return h('div',{class:"outList"},tmp)
      }
      this.$msgbox({
        title: '已选中列表',
        message: getVnode(),
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            let intList = [];
            for (const item of this.chooselist) {
              intList.push(Number(item))
            }
            this.$http.post(
              "/api/handup",
              JSON.stringify(intList)
            ).then(res=>{
              if(res.data.code == 200){
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = '确定';
                done();
                this.$store.state.power = 2;
                this.$store.state.obj = intList;
                this.chooselist =[];
                this.$router.push({name: 'statu'});
              }else{
                alert("error")
              }
            })
          } else {
            done();
            setTimeout(() => {
              for (const btn of document.getElementsByClassName("deletbtn")) {
                btn.parentNode.parentNode.parentElement.style = ""
              }
            }, 150);
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
      }
  },
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
