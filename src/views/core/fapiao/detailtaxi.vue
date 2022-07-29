<template>
  <div class="app-container">
    <el-form label-width="150px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="发票代码">
            {{ taxiForm.taxiDaima }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发票号码">
            {{ taxiForm.taxiHaoma }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="车牌号">
            {{ taxiForm.carNo }}
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="乘车日期">
            {{ taxiForm.taxiDate }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="乘车时间区间">
            {{ taxiForm.taxiTime }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="乘车金额">
            {{ taxiForm.amount }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单价">
            {{ taxiForm.price }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="里程">
            {{ taxiForm.mileage }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            {{ taxiForm.note }}
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
      taxi: {},
      taxiForm: {},
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
        this.taxi = response.data.invoice
        this.taxiForm = response.data.taxiDetail
      })
    },
    back() {
      this.$router.push({ path: '/core/fapiao/record' })
    },
  },
}
</script>
