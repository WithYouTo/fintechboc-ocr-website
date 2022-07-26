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
        <p>请输入增值税发票:</p>
      </div>

      <el-upload
        :action="BASE_API + '/invoice/identify'"
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
        <img v-if="imageUrl" :src="imageUrl" class="invoice" />
        <i v-else class="el-icon-plus invoice-uploader-icon"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      v-if="active === 0"
      style="
        width: 550px;
        height: 1600px;
        position: relative;
        left: 560px;
        top: 55px;
      "
    >
      <div style="width: 200px; height: 60px; position: relative; left: 150px">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-download"
          @click="identifyInvoiceInfo"
        >
          识别发票信息
        </el-button>
      </div>
      <el-form label-width="150px" ref="invoiceFormRef" :model="invoiceForm">
        <el-form-item label="购货方名称">
          <el-input
            v-model="invoiceForm.invoicePayerName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方纳税人识别号">
          <el-input
            v-model="invoiceForm.invoiceRatePayerId"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方地址和电话">
          <el-input
            v-model="invoiceForm.invoicePayerAddrTell"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方开户行及账号">
          <el-input
            v-model="invoiceForm.invoicePayerBankAccount"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码区">
          <el-input
            v-model="invoiceForm.cryptographicArea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input
            v-model="invoiceForm.invoiceDaima"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input
            v-model="invoiceForm.invoiceHaoma"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-input
            v-model="invoiceForm.invoiceIssueDate"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物或服务名称">
          <el-input
            v-model="invoiceForm.invoiceGoodsList"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input
            v-model="invoiceForm.unitPrice"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model="invoiceForm.invoicePriceList"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="税率">
          <el-input
            v-model="invoiceForm.invoiceTaxRateList"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="税额">
          <el-input
            v-model="invoiceForm.invoiceTaxList"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="合计金额">
          <el-input
            v-model="invoiceForm.invoiceTotal"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="合计税率">
          <el-input
            v-model="invoiceForm.invoiceTaxTotal"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="价税合计大写总额">
          <el-input
            v-model="invoiceForm.invoiceTotalCoverTax"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="价税合计小写总额">
          <el-input
            v-model="invoiceForm.invoiceTotalCoverTaxDigits"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方名称">
          <el-input
            v-model="invoiceForm.invoiceSellerName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方纳税人识别号">
          <el-input
            v-model="invoiceForm.invoiceSellerId"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方地址和电话">
          <el-input
            v-model="invoiceForm.invoiceSellerAddrTell"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方开户行及账号">
          <el-input
            v-model="invoiceForm.invoiceSellerBankAccount"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="invoiceForm.note"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 25px; position: relative; left: 150px">
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
      invoiceForm: {
        invoicePayerName: '',
        invoiceRatePayerId: '',
        invoicePayerAddrTell: '',
        invoicePayerBankAccount: '',
        cryptographicArea: '',
        invoiceDaima: '',
        invoiceHaoma: '',
        invoiceIssueDate: '',
        invoiceGoodsList: '',
        unitPrice: '',
        invoicePriceList: '',
        invoiceTaxRateList: '',
        invoiceTaxList: '',
        invoiceTotal: '',
        invoiceTaxTotal: '',
        invoiceTotalCoverTax: '',
        invoiceTotalCoverTaxDigits: '',
        invoiceSellerName: '',
        invoiceSellerId: '',
        invoiceSellerAddrTell: '',
        invoiceSellerBankAccount: '',
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
      this.invoiceForm = res.data.invoiceDetail
      this.imageUrl = res.data.invoice.netImgPath
    },
    identifyInvoiceInfo() {
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
            url: '/invoice/save',
            method: 'post',
            data: this.invoiceForm,
          }).then(
            // 清空表单
            // this.$refs.invoiceFormRef.resetFields(),
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
