<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table 
      :data="list" 
      :cell-style="{ 'text-align': 'center'}"  
      :header-cell-style="{ 'text-align': 'center'}" 
      border 
      stripe 
      style="width=100%" >
      <!-- <el-table-column class="index" width="50" label="序号"/> -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      // prop 修改
      <el-table-column prop="invoiceType" label="待报销发票种类" />
      <el-table-column prop="applier" label="报销人" />
      <el-table-column prop="subbmitTime" label="提交时间" />

      <el-table-column prop="status" label="审核状态" width="110">
       <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      // 操作栏 待修改
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="'/core/review/edit/' + scope.row.id"
            style="margin-right: 5px"
          >
            <el-button type="primary" size="mini" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import reviewApi from '@/api/core/review'
export default {
  // 新增的filter
  filters: {
    statusFilter(status) {
      const statusMap = {
        approved: 'success',
        draft: 'gray',
        rejected: 'danger'
      }
      return statusMap[status]
    }
  },
  // 定义数据模型
  data() {
    return {
      list: [], // 数据列表
    }
  },
  // 页面渲染成功后获取数据 调用下面方法里的fetchData 从后台获取数据

  created() {
    this.fetchData()
  },
  // 定义方法
  methods: {
    fetchData() {
      // 调用api
      reviewApi.list().then((response) => {
        this.list = response.data.list
      })
    },
    removeById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 此处是为了避免回调地狱，返回当前对象
          return reviewApi.removeById(id)
        })
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.message,
          })
          this.fetchData()
        })
        .catch((error) => {
          // 此处不加这个提示，会产生一个Bug
          if (error === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          }
        })
    },
  },
}
</script> 