<template>
  <div class="app-container">
    <div style="width: 400px; position: absolute; left: 100px; top: 120px">
      <div style="margin-bottom: 10px">
        <p>待审核增值税发票:</p>
      </div>
      <el-image style="width: 400px; height: 400px;" :src="invoiceForm.invoiceImg"></el-image>
      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>  -->
    </div> 
    <div
      style="
        width: 550px;
        height: 1460px;
        position: relative;
        left: 560px;
        top: 55px;
        "
    >
      <el-form label-width="150px" ref="invoiceFormRef" :model="invoiceForm">
        <el-form-item label="购货方名称">
          <el-input
            class="input"
            :disabled="true"
            v-model="invoiceForm.invoicePayerName"
            :placeholder="invoiceForm.invoicePayerName"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方纳税人识别号">
          <el-input
            v-model="invoiceForm.invoiceRatePayerId"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方地址和电话">
          <el-input
            v-model="invoiceForm.invoicePayerAddrTell"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="购货方开户行及账号">
          <el-input
            v-model="invoiceForm.invoicePayerBankAccount"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码区">
          <el-input
            v-model="invoiceForm.cryptographicArea"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input
            v-model="invoiceForm.invoiceDaima"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input
            v-model="invoiceForm.invoiceHaoma"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-input
            v-model="invoiceForm.invoiceIssueDate"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物或服务名称">
          <el-input
            v-model="invoiceForm.invoiceGoodsList"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input
            v-model="invoiceForm.unitPrice"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model="invoiceForm.invoicePriceList"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="税率">
          <el-input
            v-model="invoiceForm.invoiceTaxRateList"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="税额">
          <el-input
            v-model="invoiceForm.invoiceTaxList"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="合计金额">
          <el-input
            v-model="invoiceForm.invoiceTotal"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="合计税率">
          <el-input
            v-model="invoiceForm.invoiceTaxTotal"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="价税合计大写总额">
          <el-input
            v-model="invoiceForm.invoiceTotalCoverTax"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="价税合计小写总额">
          <el-input
            v-model="invoiceForm.invoiceTotalCoverTaxDigits"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方名称">
          <el-input
            v-model="invoiceForm.invoiceSellerName"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方纳税人识别号">
          <el-input
            v-model="invoiceForm.invoiceSellerId"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方地址和电话">
          <el-input
            v-model="invoiceForm.invoiceSellerAddrTell"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售方开户行及账号">
          <el-input
            v-model="invoiceForm.invoiceSellerBankAccount"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="invoiceForm.note"
            class="input"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div 
      style="margin-bottom: 40px; 
      text-align: center;
      position: relative;"
    >
        <el-button
          type="success"
          round
          :disable="submitBtnDisabled"
          @click="permmit"
        >
          同意
        </el-button>
        <el-button
          type="warning"
          round
          :disable="submitBtnDisabled"
          @click="returnBack"
        >
          退回
        </el-button>
        <el-button
          type="danger"
          round
          :disable="submitBtnDisabled"
          @click="reject"
        >
          拒绝
        </el-button>
      </div>

  </div>
</template>

<script>
import { show } from '@/api/table'
import request from '@/utils/request'

export default {
  // 定义数据
  data() {
    return {
      invoiceForm: {},
      opinion: '',
    }
  },
  //  页面渲染成功后获取数据 调用下面方法里的fetchData 从后台获取数据
   created(){
    this.fetchDataById();
   },

  methods: {
    // 后台获取数据
    fetchDataById() {
      show(this.$route.params.id).then((response) => {
        this.invoiceForm = response.data.invoiceDetail
      })
   },
    //同意按钮
    permmit(){
      this.$confirm('确定同意吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.status = '1';
        // 调用axios请求后端接口
        const res = request({
            url: '/audit/check',
            method: 'post',
            data: {
              status:this.status,
              invoiceId:this.$route.params.id
              }, 
          })
          .then(
            // (this.status=1),
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          )
            .then((res) => {
              this.$router.push('/core/review/list')
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    // 退回按钮
    returnBack(){
      this.$prompt('请输入退回建议','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      // this.$confirm('确定退回吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
       .then(({value}) => {
        this.opinion = value;
        this.status = '2';
       })
       .then(() => {
        // 调用axios请求后端接口
        const res = request({
            url: '/audit/check',
            method: 'post',
            data: {
              status:this.status,
              invoiceId:this.$route.params.id,
              opinion:this.opinion
              }, 
          })
          .then(
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          )
            .then((res) => {
              this.$router.push('/core/review/list')
        })
       })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    // 拒绝按钮
    reject(){
      this.$confirm('确定拒绝吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.status = '3';
        // 调用axios请求后端接口
        const res = request({
            url: '/audit/check',
            method: 'post',
            data: {
              status:this.status,
              invoiceId:this.$route.params.id
              }, 
          })
          .then(
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          )
            .then((res) => {
              this.$router.push('/core/review/list')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .input .el-input__inner {
    width:100%;
    background-color: #e8e8e8;
    text-align: center;
    border-color: #c0c4cc;
    color:#000
}
</style>
