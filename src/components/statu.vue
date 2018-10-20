<template>
    <el-card class="box-card">
      <div class="text-item">
        恭喜完成配对
      </div>
      <div class="main-text">
        对方姓名: name<br>
        对方学院: school<br>
        对方专业:  <br>
        对方学号:  <br>
        对方手机号:  <br>
        对方愿望:  <br>
      </div>
    </el-card>
</template>

<script>
export default {
  name: "statu"
}
</script>

<style>
  .text-item {
    font-size: 28px;
    text-align: center;
    color: #db4d6d;
  }

  .box-card {
    width: 100%;
  }
  .main-text {
    font-size: 16px;
  }
</style>
