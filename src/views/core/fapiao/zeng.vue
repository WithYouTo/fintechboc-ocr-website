<template>
  <div class="app-container">
    <el-steps :active="active" align-center>
      <el-step title="填写申报信息"></el-step>
      <el-step title="提交后台审核"></el-step>
      <el-step title="等待审核结果"></el-step>
    </el-steps>
    <div
      v-if="active === 0"
      style="width: 400px; position: absolute; left: 170px; top: 120px"
    >
      <div style="margin-bottom: 10px">
        <p>请输入增值税发票:</p>
      </div>

      <el-upload
        action="BASE_API + '/admin/core/dict/import'"
        list-type="picture-card"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        accept=".jpg, .jpeg, .png"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      v-if="active === 0"
      style="
        width: 500px;
        height: 1600px;
        position: relative;
        left: 560px;
        top: 55px;
      "
    >
      <div style="margin-bottom: 25px">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-download"
          @click="open1"
        >
          自动导入发票信息
        </el-button>
      </div>
      <el-form label-width="150px">
        <el-form-item label="购货方名称">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="购货方纳税人识别号">
          <el-input v-model="input2" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="购货方地址和电话">
          <el-input v-model="input3" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="购货方开户行及账号">
          <el-input v-model="input4" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="密码区">
          <el-input v-model="input5" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="input6" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="input7" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-input v-model="input8" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="货物或服务名称">
          <el-input v-model="input9" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="input10" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="input11" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="税率">
          <el-input v-model="input12" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="税额">
          <el-input v-model="input13" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="合计金额">
          <el-input v-model="input14" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="合计税率">
          <el-input v-model="input15" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="价税合计大写总额">
          <el-input v-model="input16" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="价税合计小写总额">
          <el-input v-model="input17" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="销售方名称">
          <el-input v-model="input18" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="销售方纳税人识别号">
          <el-input v-model="input19" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="销售方地址和电话">
          <el-input v-model="input20" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="销售方开户行及账号">
          <el-input v-model="input21" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="input22" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 25px; position: relative; left: 150px">
        <el-button
          type="primary"
          round
          :disable="submitBtnDisabled"
          @click="open2"
        >
          提交审核
        </el-button>
      </div>
    </div>
    <div v-if="active === 1">
      <div style="margin-top: 40px">
        <el-alert
          title="您的报销申请已成功提交，请耐心等待"
          type="warning"
          show-icon
          :closable="false"
        >
          我们将在尽快完成审核，审核时间为周一至周五8:30至5:30。
        </el-alert>
      </div>
    </div>
    <div v-if="active === 2">
      <div style="margin-top: 40px">
        <el-alert
          v-if="borrowerStatus === 2"
          title="您的申报审批已通过"
          type="success"
          show-icon
          :closable="false"
        ></el-alert>
        <el-alert
          v-if="borrowerStatus === -1"
          title="您的申报审批未通过"
          type="error"
          show-icon
          :closable="false"
        ></el-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义数据
  data() {
    return {
      active: 0,
      borrowerStatus: null,
      submitBtnDisabled: false,
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      input11: '',
      input12: '',
      input13: '',
      input14: '',
      input15: '',
      input16: '',
      input17: '',
      input18: '',
      input19: '',
      input20: '',
      input21: '',
      input22: '',
      dialogImageUrl: '',
      dialogVisible: false, //文件上传对话框是否显示
      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    open1() {
      this.$confirm('此操作将自动识别发票信息并填入框中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导入成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    open2() {
      this.$confirm('是否确认提交发票信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          this.submitBtnDisabled = true
          this.active = 1
          this.$message({
            type: 'success',
            message: '提交成功',
          })
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
