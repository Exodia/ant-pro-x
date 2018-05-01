import React, {Fragment} from 'react';
import moment from 'moment';
import {
  Badge,
  Divider,
  Input,
  Select,
  InputNumber,
  DatePicker
} from 'antd';

const {Option} = Select;

export const statusMap = ['default', 'processing', 'success', 'error'];

export const status = ['关闭', '运行中', '已上线', '异常'];

export const columns = [
  {
    title: '规则编号',
    dataIndex: 'no'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    align: 'right',
    render: val => `${val} 万`
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: status[0],
        value: 0
      },
      {
        text: status[1],
        value: 1
      },
      {
        text: status[2],
        value: 2
      },
      {
        text: status[3],
        value: 3
      }
    ],
    render: val => <Badge status={statusMap[val]} text={status[val]}/>
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
  },
  {
    title: '操作',
    render: () => (
      <Fragment>
        <a href="">配置</a>
        <Divider type="vertical"/>
        <a href="">订阅警报</a>
      </Fragment>
    ),
  }
];

export const filters = [
  {
    id: 'no',
    label: '规则编号',
    field: <Input placeholder="请输入"/>
  },
  {
    id: 'status',
    label: '使用状态',
    field: (
      <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    )
  },
  {
    id: 'number',
    label: '调用次数',
    field: <InputNumber style={{width: '100%'}}/>
  },
  {
    id: 'date',
    label: '更新日期',
    field: <DatePicker style={{width: '100%'}} placeholder="请输入更新日期"/>
  },
  {
    id: 'status3',
    label: '使用状态',
    field: (
      <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    )
  },
  {
    id: 'status4',
    label: '使用状态',
    field: (
      <Select placeholder="请选择" style={{width: '100%'}}>
        <Option value="0">关闭</Option>
        <Option value="1">运行中</Option>
      </Select>
    )
  }
];
