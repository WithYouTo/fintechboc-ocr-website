<template>
  <div class="app-container">
    <el-steps :active="1" align-center>
      <el-step title="填写申报信息"></el-step>
      <el-step title="提交后台审核"></el-step>
      <el-step title="等待审核结果"></el-step>
    </el-steps>
    <div style="width: 400px; position: absolute; left: 170px; top: 120px">
      <div style="margin-bottom: 10px">
        <p>请输入火车票:</p>
      </div>

      <el-upload
        action="BASE_API + '/train/identify'"
        list-type="picture-card"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="1"
        accept=".jpg, .jpeg, .png, .pdf"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      style="
        width: 500px;
        height: 1035px;
        position: relative;
        left: 560px;
        top: 55px;
      "
    >
      <div style="margin-bottom: 25px">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-download"
          @click="open1"
        >
          自动导入发票信息
        </el-button>
      </div>
      <el-form label-width="90px">
        <el-form-item label="票号">
          <el-input v-model="ticketNo" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="检票口">
          <el-input v-model="ticketCheck" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="出发站">
          <el-input v-model="stationFrom" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="到达站">
          <el-input v-model="stationTo" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="发车日期">
          <el-input v-model="goDate" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="开车时间">
          <el-input v-model="gotime" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="车次">
          <el-input v-model="train" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="座位号">
          <el-input v-model="seat" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="identity" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="票价">
          <el-input v-model="amount" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="席别">
          <el-input v-model="seatType" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="note" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 25px; position: relative; left: 90px">
        <el-button type="primary" round @click="open2">提交审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义数据
  data() {
    return {
      ticketNo: '',
      ticketCheck: '',
      stationFrom: '',
      stationTo: '',
      goDate: '',
      gotime: '',
      train: '',
      seat: '',
      name: '',
      identity: '',
      amount: '',
      seatType: '',
      note: '',
      dialogImageUrl: '',
      dialogVisible: false, //文件上传对话框是否显示
      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    open1() {
      this.$confirm('此操作将自动识别发票信息并填入框中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导入成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    open2() {
      this.$confirm('是否确认提交发票信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '提交成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
  },
}
</script>
