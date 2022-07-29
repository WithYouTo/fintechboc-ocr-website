<template>
  <div class="app-container">
    <el-form label-width="200px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="发票代码">
            <el-input v-model="taxiForm.taxiDaima"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发票号码">
            <el-input v-model="taxiForm.taxiHaoma"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="车牌号">
            <el-input v-model="taxiForm.carNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="乘车日期">
            <el-input v-model="taxiForm.taxiDate"></el-input>
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
          <el-form-item label="乘车时间区间">
            <el-input v-model="taxiForm.taxiTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="乘车金额">
            <el-input v-model="taxiForm.amount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单价">
            <el-input v-model="taxiForm.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="里程">
            <el-input v-model="taxiForm.mileage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            <el-input v-model="taxiForm.note"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="审核回复"></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="发票图片">
            <img :src="taxi.netImgPath" style="width: 580px" />
          </el-form-item>
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
      taxiForm: {},
      taxi: {},
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
        this.taxiForm = response.data.taxiDetail
        this.taxi = response.data.invoice
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
            url: '/taxi/save',
            method: 'post',
            data: this.taxiForm,
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
