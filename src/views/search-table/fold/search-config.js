export default {
  fieldWidth: 200,
  labelWidth: 70,
  fold: true,
  fields: [
    {
      name: 'date',
      component: 'DatePicker',
      type: 'daterange',
      label: '选择日期'
    },
    {
      name: 'type',
      component: 'Select',
      label: '类型',
      clearable: true,
      data: [
        {
          label: '充值',
          value: 0
        },
        {
          label: '提现',
          value: 1
        },
        {
          label: '付款',
          value: 2
        },
        {
          label: '收款',
          value: 3
        }
      ]
    },
    {
      name: 'type2',
      component: 'Select',
      label: '类型',
      clearable: true,
      data: [
        {
          label: '充值',
          value: 0
        },
        {
          label: '提现',
          value: 1
        },
        {
          label: '付款',
          value: 2
        },
        {
          label: '收款',
          value: 3
        }
      ]
    },
    {
      name: 'type4',
      component: 'Input',
      label: '类型',
      clearable: true
    },
    {
      name: 'type3',
      component: 'Select',
      label: '类型',
      clearable: true,
      data: [
        {
          label: '充值',
          value: 0
        },
        {
          label: '提现',
          value: 1
        },
        {
          label: '付款',
          value: 2
        },
        {
          label: '收款',
          value: 3
        }
      ]
    },
    {
      name: 'status',
      component: 'Select',
      label: '状态',
      clearable: true,
      data: [
        {
          label: '处理中',
          value: 0
        },
        {
          label: '处理成功',
          value: 1
        },
        {
          label: '处理失败',
          value: 2
        }
      ]
    },
    {
      name: 'piao',
      component: 'RadioGroup',
      label: '发票状态',
      data: [
        {
          label: '未开票',
          value: 0
        },
        {
          label: '已开票',
          value: 1
        }
      ]
    },
    {
      name: 'zhang',
      component: 'DatePicker',
      type: 'daterange',
      label: '账单日期'
    }
  ]
}