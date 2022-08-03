<template>
  <div class="app-container">
    <el-form label-width="200px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="购货方名称">
            <el-input v-model="invoiceForm.invoicePayerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="购货方纳税人识别号">
            <el-input v-model="invoiceForm.invoiceRatePayerId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="购货方地址和电话">
            <el-input v-model="invoiceForm.invoicePayerAddrTell"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="购货方开户行及账号">
            <el-input v-model="invoiceForm.invoicePayerBankAccount"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="密码区">
            {{ invoiceForm.cryptographicArea }}
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="发票代码">
            <el-input v-model="invoiceForm.invoiceDaima"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发票号码">
            <el-input v-model="invoiceForm.invoiceHaoma"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="开票日期">
            <el-input v-model="invoiceForm.invoiceIssueDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="货物或服务名称">
            <el-input v-model="invoiceForm.invoiceGoodsList"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单价">
            <el-input v-model="invoiceForm.unitPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="金额">
            <el-input v-model="invoiceForm.invoicePriceList"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="税率">
            <el-input v-model="invoiceForm.invoiceTaxRateList"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="税额">
            <el-input v-model="invoiceForm.invoiceTaxList"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="合计金额">
            <el-input v-model="invoiceForm.invoiceTotal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="合计税率">
            <el-input v-model="invoiceForm.invoiceTaxTotal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="价税合计大写总额">
            <el-input v-model="invoiceForm.invoiceTotalCoverTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="价税合计小写总额">
            <el-input
              v-model="invoiceForm.invoiceTotalCoverTaxDigits"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="销售方名称">
            <el-input v-model="invoiceForm.invoiceSellerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="销售方纳税人识别号">
            <el-input v-model="invoiceForm.invoiceSellerId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="销售方地址和电话">
            <el-input v-model="invoiceForm.invoiceSellerAddrTell"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="销售方开户行及账号">
            <el-input v-model="invoiceForm.invoiceSellerBankAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            <el-input v-model="invoiceForm.note"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="审核回复">
            {{ invoice.auditNote }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p style="margin-left: 200px">发票图片，点击放大预览</p>
          <el-image
            :src="invoice.netImgPath"
            :preview-src-list="[invoice.netImgPath]"
            style="
              width: 300px;
              height: 300px;
              margin-left: 200px;
              display: block;
              border-radius: 5px;
              border: 1px solid #ccc;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            "
          ></el-image>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-button @click="back">返回</el-button>
        <el-button type="primary" @click="save3audit">保存修改</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 引入组件
import { show } from '@/api/table'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

export default {
  data() {
    return {
      invoiceForm: {},
      invoice: {},
      saveBtnDisabled: false,
      myHeader: {
        token: getToken(),
      },
    }
  },

  created() {
    if (this.$route.params.id) {
      this.fetchDataById()
    }
  },
  methods: {
    // 根据id查询记录
    fetchDataById() {
      show(this.$route.params.id).then((response) => {
        this.invoice = response.data.invoice
        this.invoiceForm = response.data.invoiceDetail
      })
    },
    back() {
      this.$router.push({ path: '/core/fapiao/record' })
    },
    save3audit() {
      this.$confirm('是否确认保存对发票信息的修改?', '提示', {
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
            this.$router.push({ path: '/core/fapiao/record' }),
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
<style lang="scss" scoped>
::v-deep .el-form .el-form-item__content {
  background-color: #e8e8e8;
  text-align: center;
  // border-color: #c0c4cc;
  color: #000 border-box;
  border-radius: 5px;
  border: 1px solid #c0c4cc;
}
</style>
