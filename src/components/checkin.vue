<template>
  <div class="checkin-main">
    <el-input :class="{ 'rad-border': (checked&&(!$store.state.name||type.name))}" placeholder="一定是真名呦~" v-model="$store.state.name" clearable>
      <template slot="prepend"><div>姓名:</div></template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&(!$store.state.number||type.number))}" type="number" placeholder="注意别填错啦~" v-model="$store.state.number" clearable>
      <template slot="prepend">学号:</template>
    </el-input> 
    <el-input :class="{ 'rad-border': (checked&&(!$store.state.school||type.school))}" placeholder="一定来自出色的学院" v-model="$store.state.school" clearable>
      <template slot="prepend">学院:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&(!$store.state.class||type.class))}" placeholder="不知道说什么了..." v-model="$store.state.class" clearable>
      <template slot="prepend">专业:</template>
    </el-input>
    <el-input :class="{ 'rad-border': (checked&&(!$store.state.phone||type.phone))}" type="number" placeholder="联系不上后果自负（嘿嘿嘿" v-model="$store.state.phone" clearable>
      <template slot="prepend">手机:</template>
    </el-input>
    <el-button type="primary" @click="checkTable" round>让我们开始吧</el-button>
  </div>
</template>
<script>
export default {
  name: "checkin",
  data() {
    // console.log(BASE_URL);
    this.$store.state.routerPush = (string)=>{
      return this.$router.push(string);
    }
    return {
      checked: false,
      type:{}
    }
  },
  mounted(){
    
  },
  methods:{
    checkTable: function(){
      let state = this.$store.state;
      this.checked = true;
      if(!(state.name && state.number && state.school && state.class && state.phone)){
        this.$notify.error({
          title: '好像哪里不太对',
          message: '亲的信息还没有填全面(●ˇ∀ˇ●)'
        });
        return false;
      }
      let cont = 0;
      let re = /^1\d{10}$/;
      if (!re.test(state.phone)) {
        this.$notify.error({
          title: '好像哪里不太对',
          message: '手机号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        this.type.phone=true;cont++;
      }
      re = /^\d{10}$/
      if (!re.test(this.$store.state.number)) {
        this.$notify.error({
          title: '好像哪里不太对',
          message: '学号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        this.type.number=true;cont++;
      }else if(this.$store.state.number > 2019000000){
        this.$notify.error({
          title: '好像哪里不太对',
          message: '你是穿越过来的么？'
        });
        this.type.number=true;cont++;
      }
      if (!re.test(this.$store.state.class)) {
        this.$notify.error({
          title: '好像哪里不太对',
          message: '班号好像不太对劲的说(●ˇ∀ˇ●)'
        });
        this.type.class=true;cont++;
      }
      if(cont == 0){
        this.$store.state.power = 1;
        this.$router.push({name: 'survey'});
      }
    }
  }
}
</script>

<style>
.checkin-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rad-border > * {
  /* color: red; */
  border: 1px solid #ce2121;
  transition: border-color 0.2s;
}
.el-input > * {
  transition: border-color 0.2s;
}
</style>
