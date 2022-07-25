<template>
  <div class="app-container">
    <el-steps :active="active" align-center>
      <el-step title="填写申报信息"></el-step>
      <el-step title="提交后台审核"></el-step>
    </el-steps>
    <div
      v-if="active === 0"
      style="width: 400px; position: absolute; left: 170px; top: 120px"
    >
      <div style="margin-bottom: 10px">
        <p>请输入火车票:</p>
      </div>

      <el-upload
        :action="BASE_API + '/train/identify'"
        ref="upload"
        list-type="picture-card"
        :headers="myHeader"
        :auto-upload="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-success="handlerSuccess"
        accept=".jpg, .jpeg, .png"
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      v-if="active === 0"
      style="
        width: 550px;
        height: 1035px;
        position: relative;
        left: 560px;
        top: 55px;
      "
    >
      <div style="width: 200px; height: 60px; position: relative; left: 90px">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-download"
          @click="identifyTrainInfo"
        >
          识别发票信息
        </el-button>
      </div>
      <el-form label-width="90px" ref="trainFormRef" :model="trainForm">
        <el-form-item label="票号">
          <el-input
            v-model="trainForm.ticketNo"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="检票口">
          <el-input
            v-model="trainForm.ticketCheck"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发站">
          <el-input
            v-model="trainForm.stationFrom"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="到达站">
          <el-input
            v-model="trainForm.stationTo"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="发车日期">
          <el-input
            v-model="trainForm.goDate"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="开车时间">
          <el-input
            v-model="trainForm.gotime"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="车次">
          <el-input
            v-model="trainForm.train"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="座位号">
          <el-input
            v-model="trainForm.seat"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="trainForm.name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input
            v-model="trainForm.identity"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="票价">
          <el-input
            v-model="trainForm.amount"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="席别">
          <el-input
            v-model="trainForm.seatType"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="trainForm.note"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 25px; position: relative; left: 90px">
        <el-button
          type="primary"
          round
          :disable="submitBtnDisabled"
          @click="save2audit"
        >
          提交审核
        </el-button>
      </div>
    </div>
    <div v-if="active === 1">
      <div
        style="margin-top: 40px; width: 938px; left: 156px; position: relative"
      >
        <el-alert
          title="您的报销申请已成功提交，请耐心等待"
          type="success"
          show-icon
          :closable="false"
        >
          我们将在尽快完成审核，审核时间为周一至周五8:30至5:30。
        </el-alert>
      </div>
      <div style="top: 10px; height: 60px; position: relative; left: 860px">
        <el-button @click="jumpToNew">再次申请</el-button>
        <el-button type="primary" @click="jumpToRecord">查看申请记录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import request from '@/utils/request'
export default {
  // 定义数据
  data() {
    return {
      active: 0,
      borrowerStatus: null,
      submitBtnDisabled: false,
      trainForm: {
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
      },
      dialogImageUrl: '',
      dialogVisible: false, //文件上传对话框是否显示
      imageUrl: '',
      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址 /dev-api
      myHeader: {
        token: getToken(),
      },
    }
  },
  methods: {
    // 文件移除
    handleRemove(file, fileList) {
      console.log('文件移除触发', file, fileList)
    },
    // 文件预览
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件超过限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次已选择了 ${files.length} 个文件`
      )
    },
    handlerSuccess(res, file) {
      this.trainForm = res.data.trainDetail
      this.imageUrl = res.data.invoice.netImgPath
    },
    identifyTrainInfo() {
      console.log('点击识别发票信息')
      this.$refs.upload.submit()
    },
    save2audit() {
      this.$confirm('是否确认提交发票信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          // 调用axios请求后端接口
          const res = request({
            url: '/train/save',
            method: 'post',
            data: this.trainForm,
          }).then(
            // 清空表单
            // this.$refs.trainFormRef.resetFields(),
            (this.active = 1),
            this.$message({
              type: 'success',
              message: '提交成功',
            })
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    jumpToNew() {
      //指定跳转的地址
      this.$router.go(0)
    },
    jumpToRecord() {
      //指定跳转的地址
      this.$router.replace('/core/fapiao/record')
    },
  },
}
</script>
