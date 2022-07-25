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
        <p>请输入出租车票:</p>
      </div>

      <el-upload
        :action="BASE_API + '/taxi/identify'"
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
        <!-- <i class="el-icon-plus"></i> -->
        <img v-if="imageUrl" :src="imageUrl" class="taxi" />
        <i v-else class="el-icon-plus taxi-uploader-icon"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      v-if="active === 0"
      style="
        width: 550px;
        height: 785px;
        position: relative;
        left: 560px;
        top: 55px;
      "
    >
      <div style="width: 200px; height: 60px; position: relative; left: 100px">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-download"
          @click="identifyTaxiInfo"
        >
          识别发票信息
        </el-button>
      </div>
      <el-form label-width="100px" ref="taxiFormRef" :model="taxiForm">
        <el-form-item label="发票代码">
          <el-input
            v-model="taxiForm.taxiDaima"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input
            v-model="taxiForm.taxiHaoma"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input
            v-model="taxiForm.carNo"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="乘车日期">
          <el-input
            v-model="taxiForm.taxiDate"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="乘车时间区间">
          <el-input
            v-model="taxiForm.taxiTime"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="乘车金额">
          <el-input
            v-model="taxiForm.amount"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input
            v-model="taxiForm.price"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="里程">
          <el-input
            v-model="taxiForm.mileage"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="taxiForm.note" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 25px; position: relative; left: 100px">
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
      taxiForm: {
        taxiId: '',
        invoiceId: '',
        taxiDaima: '',
        taxiHaoma: '',
        carNo: '',
        taxiDate: '',
        taxiTime: '',
        amount: '',
        price: '',
        mileage: '',
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
      this.taxiForm = res.data.taxiDetail
      this.imageUrl = res.data.invoice.netImgPath
    },
    identifyTaxiInfo() {
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
            url: '/taxi/save',
            method: 'post',
            data: this.taxiForm,
          }).then(
            // 清空表单
            // this.$refs.taxiFormRef.resetFields(),
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
