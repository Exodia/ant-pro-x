import React, {PureComponent} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';

import {autoDispatch} from 'common/util';
import {toggleNavigatorCollapse} from '../../redux';
import styles from './index.less';

@connect(
  state => ({collapsed: state.navigator.collapsed}),
  autoDispatch({toggleNavigatorCollapse})
)
export default class GlobalHeader extends PureComponent {

  toggle = () => this.props.toggleNavigatorCollapse(!this.props.collapsed);

  render() {
    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
      </div>
    );
  }
}
