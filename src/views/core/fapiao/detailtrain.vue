<template>
  <div class="app-container">
    <el-form label-width="150px" class="form-table">
      <el-row>
        <el-col :span="11">
          <el-form-item label="票号">
            {{ trainForm.ticketNo }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="检票口">
            {{ trainForm.ticketCheck }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="出发站">
            {{ trainForm.stationFrom }}
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="到达站">
            {{ trainForm.stationTo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="发车日期">
            {{ trainForm.goDate }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="开车时间">
            {{ trainForm.gotime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="车次">
            {{ trainForm.train }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="座位号">
            {{ trainForm.seat }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名">
            {{ trainForm.name }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号码">
            {{ trainForm.identity }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="票价">
            {{ trainForm.amount }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="席别">
            {{ trainForm.seatType }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注">
            {{ trainForm.note }}
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
      train: {},
      trainForm: {},
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
        this.train = response.data.invoice
        this.trainForm = response.data.trainDetail
      })
    },
    back() {
      this.$router.push({ path: '/core/fapiao/record' })
    },
  },
}
</script>
