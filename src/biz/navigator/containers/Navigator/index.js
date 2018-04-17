import React, {PureComponent} from 'react';
import {Layout} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {retainSearchPath} from 'common/util';
import SideMenu from '../../components/SideMenu';
import {updateNavigator, changeNavigatorOpenKeys} from '../../models';

import styles from './index.less';
import logo from './logo.svg';

const mapStateToProps = ({navigator}, ownProps) => ({
  items: navigator.entities,
  selectedItemKeys: navigator.selectedItemKeys,
  openItemKeys: navigator.openItemKeys,
  collapsed: navigator.collapsed,
  location: ownProps.location
});

@withRouter
@connect(
  mapStateToProps,
  {updateNavigator, changeNavigatorOpenKeys}
)
export default class Navigator extends PureComponent {

  componentDidMount() {
    this.props.updateNavigator(this.props.location);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.updateNavigator(this.props.location);
    }
  }

  render() {
    return (
      <Layout.Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="lg"
        onCollapse={this.props.onCollapse}
        width={256}
      >
        <LogoItem/>
        <SideMenu
          items={this.props.items}
          selectedKeys={this.props.selectedItemKeys}
          openKeys={this.props.collapsed ? [] : this.props.openItemKeys}
          onOpenChange={this.props.changeNavigatorOpenKeys}
        />
      </Layout.Sider>
    );
  }
}

function LogoItem() {
  return (
    <div className={styles.logo}>
      <Link to={retainSearchPath('/')}>
        <img src={logo} alt="logo"/>
        <h1>Ant Design Pro</h1>
      </Link>
    </div>
  );
}

