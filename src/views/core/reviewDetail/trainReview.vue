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
          <el-form-item label="审核回复">
            {{trainForm.opinion}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="margin-left: 150px">
          <p>审核时上传图片，点击放大预览</p>
            <el-image
              :src="train.netImgPath"
              :preview-src-list="[train.netImgPath]"
              style="width: 300px;
                    height:300px;
                    display: block;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    ">
            </el-image>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <div 
        style="margin-bottom: 40px; 
        text-align: center;
        position: relative;"
      >
          <el-button
            type="success"
            round
            @click="permmit"
          >
            同意
          </el-button>
          <el-button
            type="warning"
            round
            @click="returnBack"
          >
            退回
          </el-button>
          <el-button
            type="danger"
            round
            @click="reject"
          >
            拒绝
          </el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 引入组件
import { show } from '@/api/table'
import request from '@/utils/request'
export default {
  data() {
    return {
      train: {},
      trainForm: {},
      opinion: ''
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
    // back() {
    //   this.$router.push({ path: '/core/fapiao/record' })
    // },
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
      }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消'
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-form .el-form-item__content {
    background-color: #e8e8e8;
    text-align: center;
    // border-color: #c0c4cc;
    color:#000
    border-box;
    border-radius: 5px;
    border: 1px solid #c0c4cc;
}
</style>
