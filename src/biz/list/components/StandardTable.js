import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import styles from './StandardTable.less';

export default class StandardTable extends PureComponent {

  static propTypes = {
    onSelectRow: PropTypes.func,
    onChange: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    loading: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    selectedRows: PropTypes.array.isRequired
  };

  onRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
  };

  render() {
    const {dataSource, pagination, loading, columns} = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys: this.props.selectedRows.map(item => item.key),
      onChange: this.onRowSelectChange,
      getCheckboxProps: record => ({disabled: record.disabled})
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          pagination={paginationProps}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
