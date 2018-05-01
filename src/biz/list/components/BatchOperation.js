import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Icon, Button, Menu, Dropdown} from 'antd';

export default function BatchOperation({onBatch, disabled = false}) {
  const menu = (
    <Menu onClick={e => onBatch(e.key)} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Button disabled={disabled} onClick={() => onBatch('batch')}>批量操作</Button>
      <Dropdown overlay={menu} disabled={disabled}>
        <Button>更多操作 <Icon type="down"/></Button>
      </Dropdown>
    </Fragment>
  );
}

BatchOperation.propTypes = {
  disabled: PropTypes.bool,
  onBatch: PropTypes.func.isRequired
};
