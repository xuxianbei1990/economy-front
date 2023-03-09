<template>
  <div>
    <el-row type="flex">
      <template>
        <el-col>
          <div>
            <el-tag>逆回购</el-tag>
            <el-table :data="items" style="width: 90%" height="480" :cell-style="{padding: '0.9%'}">
              <el-table-column prop="price" label="价格" width="80"></el-table-column>
              <el-table-column prop="subPrice" label="减少货币" width="80"></el-table-column>
              <el-table-column prop="addPrice" label="增加货币" width="80"></el-table-column>
              <el-table-column prop="priceUnit" label="单位" width="80"></el-table-column>
              <el-table-column prop="period" label="周期"></el-table-column>
              <el-table-column prop="periodUnit" label="周期单位"></el-table-column>
              <el-table-column prop="interestRate" label="汇率"></el-table-column>
              <el-table-column prop="createDate" label="日期"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col>
          <div>
            <el-tag>MLF</el-tag>
            <el-table :data="mlfitems" style="width: 90%">
              <el-table-column prop="price" label="价格" width="80"></el-table-column>
              <el-table-column prop="subPrice" label="减少货币" width="80"></el-table-column>
              <el-table-column prop="addPrice" label="增加货币" width="80"></el-table-column>
              <el-table-column prop="priceUnit" label="单位" width="80"></el-table-column>
              <el-table-column prop="period" label="周期"></el-table-column>
              <el-table-column prop="periodUnit" label="周期单位"></el-table-column>
              <el-table-column prop="interestRate" label="汇率"></el-table-column>
              <el-table-column prop="createDate" label="日期"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
const itemsData = []
const mlfItemsData = []
export default {

  name: 'MgTail',
  data () {
    return {
      items: itemsData,
      mlfitems: mlfItemsData
    }
  },
  methods: {
    getList () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1002/data/show/graph'
      }).then(response => {
        const value = response.data
        for (let index = 0; index < value.reverseRepurchaseAgreements.records.length; index++) {
          const element = value.reverseRepurchaseAgreements.records[index]
          itemsData.push(element)
        }
        for (let index = 0; index < value.mediumtermLendingFacilities.length; index++) {
          const element = value.mediumtermLendingFacilities[index]
          mlfItemsData.push(element)
        }
      })
    }

  },
  mounted () {
    this.getList()
  }
}

</script>
