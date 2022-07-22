<template>
  <div class="app-container">
    <el-steps :active="1" align-center>
      <el-step title="填写申报信息"></el-step>
      <el-step title="提交后台审核"></el-step>
      <el-step title="等待审核结果"></el-step>
    </el-steps>
    <div style="width: 400px; position: absolute; left: 170px; top: 120px">
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
    </div>
    <div
      style="
        width: 500px;
        height: 785px;
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
        <el-button type="primary" round @click="save2audit">提交审核</el-button>
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
      console.log('文件移除触发', file)
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
  },
}
</script>

<style scoped>
.taxi-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.taxi-uploader .el-upload:hover {
  border-color: #409eff;
}
.taxi-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* width: 178px;
  height: 178px;
  line-height: 178px; */
  text-align: center;
}
.taxi {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
