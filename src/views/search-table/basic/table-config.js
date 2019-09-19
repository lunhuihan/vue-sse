export default {
  onSelectionChange (selection) { 
    this.selection = selection
  },
  columns: [
    {
      type: 'selection',
      width: 50,
      align: 'center'
    },
    {
      title: '类型',
      minWidth: 60,
      align: 'center',
      key: 'statusDesc'
    },
    {
      title: '流水号',
      minWidth: 150,
      align: 'center',
      key: 'logId'
    },
    {
      title: '对方信息',
      minWidth: 150,
      align: 'center',
      key: 'transName'
    },
    {
      title: '姓名',
      minWidth: 100,
      align: 'center',
      key: 'name'
    },
    {
      title: '操作',
      minWidth: 150,
      align: 'center',
      slot: 'action'
    }
  ]
}