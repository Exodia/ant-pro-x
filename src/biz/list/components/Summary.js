import React, {Fragment} from 'react';
import {Alert} from 'antd';

export default function Summary({items = [], onClear}) {

  const total = items.reduce((sum, {callNo}) => sum + parseFloat(callNo), 0);

  const message = (
    <Fragment>
      已选择 <a style={{fontWeight: 600}}>{items.length}</a> 项&nbsp;&nbsp;
      <span style={{marginLeft: 8}}>服务调用次数总计&nbsp;
        <strong>{total}万</strong>
      </span>
      <a onClick={onClear} style={{marginLeft: 24}}>清空</a>
    </Fragment>
  );


  return (
    <div style={{marginBottom: 16}}>
      <Alert message={message} type="info" showIcon/>
    </div>
  )
}
