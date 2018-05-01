import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card, Form, Button, message} from 'antd';

import {PageHeaderLayout} from 'components/Layout';
import {selectors} from 'biz/navigator/models';

import StandardTable from '../../components/StandardTable';
import FilterPanel from '../../components/FilterPanel';
import BatchOperation from '../../components/BatchOperation';
import Summary from '../../components/Summary';
import CreateForm from '../../components/CreateForm';
import {fetchRules, batchModify, createRule} from '../../models';

import {columns, filters} from './constants';
import styles from './index.less';

@connect(
  ({
     navigator: {entities: navItems, selectedItemKeys},
     list: {rule: {entities, total, loading, error}}
   }) => ({
    entities,
    total,
    loading,
    error,
    breadcrumbList: selectors.getBreadcrumbList(navItems, selectedItemKeys[0])
  }),
  {search: fetchRules, batchModify, createRule}
)
@Form.create()
export default class TableList extends PureComponent {
  state = {
    showCreateForm: false,
    selectedRows: [],
    filter: {},
    columnFilter: {},
    pagination: {
      current: 1,
      pageSize: 10
    },
    sorter: {}
  };

  componentDidMount() {
    this.props.search(this.getSearchArgs());
  }

  performSearch(args) {
    this.setState(
      {
        selectedRows: [],
        ...args
      },
      () => this.props.search(this.getSearchArgs())
    );
  }

  // 获取查询参数，默认是取`filter`表单的所有数据，加上表格的排序字段
  getSearchArgs() {
    const {filter, columnFilter, sorter, pagination} = this.state;

    return {
      ...filter,
      ...columnFilter,
      ...sorter,
      ...pagination
    };
  }

  setCreateFormVisible(iisVisible) {
    this.setState({showCreateForm: iisVisible});
  }

  // pageSize改变，分页变为1
  // 排序，分页改变，筛选面板的filter参数一起携带
  onTableChange = ({current, pageSize}, filtersArg, {field, order}) => this.performSearch({
    pagination: {current, pageSize},
    columnFilter: filtersArg,
    sorter: {sort: field, order}
  });

  // 筛选参数改变，分页变为1，pageSize，排序参数一起携带
  onFilterChange = values => this.performSearch({
    filter: values,
    pagination: {
      ...this.state.pagination,
      current: 1
    }
  });

  onBatch = type => this.props.batchModify(
    {type, items: this.state.selectedRows},
    () => {
      message.success('操作成功');
      this.performSearch({
        pagination: {
          ...this.state.pagination,
          current: 1
        }
      });
    },
    () => message.error('操作失败')
  );

  onCreate = fields => {
    this.props.createRule(
      fields,
      () => {
        message.success('添加成功');
        this.performSearch({
          filter: {},
          columnFilter: {},
          pagination: {
            current: 1,
            ...this.state.pagination
          }
        });
      },
      () => message.error('操作失败')
    );
    this.setCreateFormVisible(false);
  };

  onSelectRow = rows => this.setState({selectedRows: rows});

  render() {
    const {entities, loading, total} = this.props;
    const {selectedRows, pagination} = this.state;

    return (
      <PageHeaderLayout title="查询表格" breadcrumbList={this.props.breadcrumbList}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <FilterPanel
              onSubmit={this.onFilterChange}
              onReset={this.onFilterChange}
              className={styles.tableListForm}
              filters={filters}/>

            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.setCreateFormVisible(true)}
              >
                新建
              </Button>
              <BatchOperation
                disabled={selectedRows.length === 0}
                onBatch={this.onBatch}
              />
            </div>

            <Summary
              items={this.state.selectedRows}
              onClear={() => this.setState({selectedRows: []})}
            />

            <StandardTable
              selectedRows={selectedRows}
              dataSource={entities}
              pagination={{...pagination, total}}
              loading={loading}
              columns={columns}
              onSelectRow={this.onSelectRow}
              onChange={this.onTableChange}
            />
          </div>
        </Card>

        <CreateForm
          onCreate={this.onCreate}
          onCancel={() => this.setCreateFormVisible(false)}
          visible={this.state.showCreateForm}
        />
      </PageHeaderLayout>
    );
  }
}
