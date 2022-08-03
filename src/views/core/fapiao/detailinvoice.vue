<template>
  <div class="app-container">
    <el-form label-width="200px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="购货方名称">
            {{ invoiceForm.invoicePayerName }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="购货方纳税人识别号">
            {{ invoiceForm.invoiceRatePayerId }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="购货方地址和电话">
            {{ invoiceForm.invoicePayerAddrTell }}
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="购货方开户行及账号">
            {{ invoiceForm.invoicePayerBankAccount }}
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
            {{ invoiceForm.invoiceDaima }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发票号码">
            {{ invoiceForm.invoiceHaoma }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="开票日期">
            {{ invoiceForm.invoiceIssueDate }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="货物或服务名称">
            {{ invoiceForm.invoiceGoodsList }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单价">
            {{ invoiceForm.unitPrice }}
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="金额">
            {{ invoiceForm.invoicePriceList }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="税率">
            {{ invoiceForm.invoiceTaxRateList }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="税额">
            {{ invoiceForm.invoiceTaxList }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="合计金额">
            {{ invoiceForm.invoiceTotal }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="合计税率">
            {{ invoiceForm.invoiceTaxTotal }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="价税合计大写总额">
            {{ invoiceForm.invoiceTotalCoverTax }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="价税合计小写总额">
            {{ invoiceForm.invoiceTotalCoverTaxDigits }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="销售方名称">
            {{ invoiceForm.invoiceSellerName }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="销售方纳税人识别号">
            {{ invoiceForm.invoiceSellerId }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="销售方地址和电话">
            {{ invoiceForm.invoiceSellerAddrTell }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="销售方开户行及账号">
            {{ invoiceForm.invoiceSellerBankAccount }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            {{ invoiceForm.note }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="审核回复"></el-form-item>
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
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 引入组件
import { show } from '@/api/table'
export default {
  data() {
    return {
      invoice: {},
      invoiceForm: {},
      saveBtnDisabled: false,
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
