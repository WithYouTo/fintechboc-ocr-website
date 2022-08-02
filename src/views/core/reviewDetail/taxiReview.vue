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
        <el-col style="margin-left: 150px">
          <p>审核时上传图片，点击放大预览</p>
            <el-image
              :src="taxi.netImgPath"
              :preview-src-list="[taxi.netImgPath]"
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
      taxi: {},
      taxiForm: {},
      opinion: '',
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