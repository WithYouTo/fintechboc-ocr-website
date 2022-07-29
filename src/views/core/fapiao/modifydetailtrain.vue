<template>
  <div class="app-container">
    <el-form label-width="200px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="票号">
            <el-input v-model="trainForm.ticketNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="检票口">
            <el-input v-model="trainForm.ticketCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="出发站">
            <el-input v-model="trainForm.stationFrom"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="到达站">
            <el-input v-model="trainForm.stationTo"></el-input>
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
          <el-form-item label="发车日期">
            <el-input v-model="trainForm.goDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="开车时间">
            <el-input v-model="trainForm.gotime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="车次">
            <el-input v-model="trainForm.train"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="座位号">
            <el-input v-model="trainForm.seat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名">
            <el-input v-model="trainForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号码">
            <el-input v-model="trainForm.identity"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="票价">
            <el-input v-model="trainForm.amount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="席别">
            <el-input v-model="trainForm.seatType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            <el-input v-model="trainForm.note"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="审核回复"></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="发票图片">
            <img :src="train.netImgPath" style="width: 580px" />
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
      trainForm: {},
      train: {},
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
        this.trainForm = response.data.trainDetail
        this.train = response.data.invoice
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
            url: '/train/save',
            method: 'post',
            data: this.trainForm,
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
