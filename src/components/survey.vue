<template>
  <div>
  <el-input class="inline-input" placeholder="可搜索 学号,姓名,内容" v-model="input">
    <el-button @click="find" slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <el-header v-if="theTop > 500" style="position: fixed;top:0px;left:0px; width:100vw;">
    <el-row type="flex" class="header" justify="space-around">
      <div @click="goTop" class="header-text header-col">{{title}}</div>
    </el-row>
  </el-header>
  <transition-group name="list-complete" tag="div" v-loading="loading">
    <el-card
    v-for="(item,index) in items"
    v-bind:key="item<0?index:item"
    class="box-card list-complete-item"
    >
    <div slot="header" class="clearfix">
      <span class="name">{{getMsg(item).name}}</span>
      <el-button @click="chooseIt(getMsg(item).number)" style="float: right; padding: 3px 0" type="text">选择</el-button>
      <br>
      <span class="school">  {{getMsg(item).grade}}</span>
      <span class="class"> | {{getMsg(item).class}}</span>
      <!-- <span class="number"> | {{getMsg(item).number}}</span> -->
    </div>
    <div  class="text-item">
      {{getMsg(item).text}}
    </div>
    <div v-if="getMsg(item).other" class="text-item-other">
      {{getMsg(item).other}}
    </div>
    </el-card>
  </transition-group>
  </div>
</template>

<script>
export default {
  name: "survey",
  data(){
    Promise.all([this.$http.get('/static/2018NoCall.1.json'),this.$http.get('/static/NumberList.json')])
    .then(res=>{
      this.$store.state.dataBase = JSON.parse(res[0].bodyText);
      this.$store.state.NumberList = JSON.parse(res[1].bodyText);
      var a = this.$store.state.dataBase;
      var b = this.$store.state.NumberList;
      var idx = lunr(function () {
        this.use(lunr.cn);
        this.field('name', { BOOST: 10 })
        this.field('number',{ BOOST: 20 })
        this.field('text')
        this.field('other')
        this.ref('number')
        for (const doc of b) {
          this.add(a[doc])
        }
      })
      // console.log(idx.search("dalao一起学习"));
      // console.log(idx);
      this.$store.state.idx = idx;
      this.items = []
      // for(let i = 0;i<4;i++) this.items.push(Math.floor(Math.random()*10000)%125);
      if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function() {
            for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
        };
      }
      this.items = this.$store.state.NumberList;
      this.items.shuffle();
      this.loading = false;
      // let fill = ()=>{
      //   setTimeout(() => {
      //     this.items.splice(0,1);
      //     setTimeout(() => {
      //       this.items.splice(4,0,Math.floor(Math.random()*10000)%125);
      //     }, 50);
      //     fill();
      //   }, 5000);
      // }
      // fill();
    })
    return{
      loading: true,
      cont: '',
      select: '',
      input: '',
      items: [],
      theTop: 0,
      title: "点击回到开始",
      changeTitle: false,
    }
  },
  components:{
  },
  methods: {
    find(){
      if(this.input)
        this.$router.push({name: "find", params: {kw: this.input}});
      else
        this.$notify.error({
          title: '少了什么',
          message: '盲目搜索可还行,如果真想看所有,请搜0'
        });
    },
    getMsg(number){
      if(number == -1)
      return {"name": ".....", "grade": ".....", "class": ".....", "number": ".....", "text": ".....", "other": "....." }
      else
      return this.$store.state.dataBase[number];
    },
    chooseIt(number){
      this.$emit('throseIt',number)
    },
    goTop(){
      var scrollToptimer = setInterval(function () {
          // console.log("定时循环回到顶部")
          var top = document.body.scrollTop || document.documentElement.scrollTop;
          var speed = top / 4;
          console.log(top)
          if (document.body.scrollTop!=0) {
              document.body.scrollTop -= speed;
          }else {
              document.documentElement.scrollTop -= speed;
          }
          if (top == 0) {
              clearInterval(scrollToptimer);
          }
      }, 30);
      // console.log(scrollToptimer)
    },
    handleScroll(){
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      if( top%100 == 0){
        this.theTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(!this.changeTitle &&this.theTop > 500 && this.title=="点击回到开始"){
          this.changeTitle = true;
          setTimeout(() => {
            this.title = this.$store.state.title;
          }, 500);
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
  .box-card {
  width: 100%;
  /* min-width:40vw; */
  /* max-width:40vw; */
  }

  .box-card > .el-card__header {
  padding: 10px 20px;
  }
  
  .el-main {
    overflow: visible;
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
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter
  /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translatey(30px);
  }
  .list-complete-leave-to
  /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translatex(60px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  .clearfix > .name {
  font-size: 16px;
  }
  .clearfix > .school,.class,.number {
    color: #828282;
    font-size: 9px;
  }
  .text-item-other{
    font-size: 10px;
    color: #828282;
  }
</style>
