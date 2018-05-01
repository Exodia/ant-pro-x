import React from 'react';
import {Link} from 'react-router-dom';
import PageHeader from 'ant-design-pro/es/PageHeader';
import styles from './PageHeaderLayout.less';

export function PageHeaderLayout({children, wrapperClassName, top, ...restProps}) {
  return (
    <div className={wrapperClassName}>
      {top}
      <PageHeader {...restProps} linkElement={Link}/>
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
