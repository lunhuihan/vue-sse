<template>
  <Card title="search-table展开/收缩示例">
    <search-table :search-config="searchConfig" :table-config="tableConfig" :table-data="tableData" :total="total"
      :loading="loading" @on-search="getData">
      <template v-slot:action="{row}">
        <Button type="success" size="small">交易明细</Button>
        <Button type="primary" size="small">电子回单</Button>
      </template>
      <template v-slot:page-prepend>
        <span class="stress">每天提现截止时间: 22:00</span>
      </template>
    </search-table>
  </Card>
</template>

<script>
import tableConfig from './table-config'
import searchConfig from './search-config'
export default {
  data () {
    return {
      tableConfig,
      searchConfig,
      tableData: [],
      total: 0,
      loading: false
    }
  },
  computed: {
  },
  created () {
    this.getData()
  },
  methods: {
    async getData (search = {}, page = 1, pageSize = 10, done = () => { }) {
      try {
        this.loading = true
        let res = await this.$Http.searchTable.fold(search, page, pageSize)
        let { total = 0, content = [] } = res.data
        this.tableData = content
        this.total = total
      } finally {
        this.loading = false
        done()
      }
    }
  }
}
</script>