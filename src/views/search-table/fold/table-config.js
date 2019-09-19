export default {
  onSelectionChange(selection) {
    this.selection = selection
  },
  columns: [
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
    }
  ]
}