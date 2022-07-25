<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="review.borrowAmount" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间开始">
        <el-input-number v-model="review.integralStart" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间结束">
        <el-input-number v-model="review.integralEnd" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import reviewApi from '@/api/core/review'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      review: {},
    }
  },

  //页面渲染成功
  created() {
    if (this.$route.params.id) {
      this.fetchById(this.$route.params.id)
    }
  },

  methods: {
    // 根据id查询记录
    fetchById(id) {
      reviewApi.getById(id).then((response) => {
        this.review = response.data.record
      })
    },

    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      if (!this.review.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    saveData() {
      reviewApi.save(this.review).then((response) => {
        this.$message.success(response.message)
        this.$router.push('/core/integral-grade/list')
      })
    },
    // 根据id更新记录
    updateData() {
      reviewApi.updateById(this.review).then((response) => {
        this.$message.success(response.message)
        this.$router.push('/core/integral-grade/list')
      })
    },
  },
}
</script>
