<template>
  <div class="app-container">
    <el-table 
      v-loading="listLoading"
      :data="list"
      :cell-style="{ 'text-align': 'center'}"  
      :header-cell-style="{ 'text-align': 'center'}" 
      style="width: 100%"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="username"
        label="申报人"
        width="200"
      ></el-table-column>
      <el-table-column prop="applyDate" label="申报日期"></el-table-column>
      <el-table-column
        prop="invoiceType"
        label="发票类型"
        :formatter="invoiceTypeFormat"
      ></el-table-column>
      <el-table-column prop="invoiceAmount" label="发票金额"></el-table-column>
      <!-- <el-table-column prop="status" label="状态"></el-table-column> -->
       <el-table-column prop="status" label="审核状态" width="110">
       <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter" v-if="scope.row.status===0">待审核</el-tag>
          <el-tag :type="scope.row.status | statusFilter" v-if="scope.row.status===1">已通过</el-tag>
          <el-tag :type="scope.row.status | statusFilter" v-if="scope.row.status===2">待修改</el-tag>
          <el-tag :type="scope.row.status | statusFilter" v-if="scope.row.status===3">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="jumpToReviewDetail(scope.row)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success',
        2: 'blue',
        3: 'danger',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      pageParams: {
        pageSize: 10,
        pageNum: 1,
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      let response = await getList(this.pageParams)
      if (response.code === 200) {
        console.log('response', response)
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      }
    },
    handleSizeChange(newSize) {
      console.log(`每页 ${newSize} 条`)
      this.pageParams.pageSize = newSize
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageParams.pageNum = val
      this.fetchData()
    },
    invoiceTypeFormat(row) {
      console.log('row',row)
      if (row.invoiceType === 'train') {
        return '火车票'
      } else if (row.invoiceType === 'taxi') {
        return '出租车票'
      } else if (row.invoiceType === 'invoice') {
        return '增值税发票'
      }
    },
    jumpToReviewDetail(rowInfo){
        if(rowInfo.invoiceType==="train"){
         this.$router.push('/core/reviewDetail/trainReview/' + rowInfo.id)
        }
        else if(rowInfo.invoiceType==="taxi"){
         this.$router.push('/core/reviewDetail/taxiReview/' + rowInfo.id)
        }
        else if(rowInfo.invoiceType==="invoice"){
         this.$router.push('/core/reviewDetail/vatReview/' + rowInfo.id)
        }
      }
  },
}
</script>