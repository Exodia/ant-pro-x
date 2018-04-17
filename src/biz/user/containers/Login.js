import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Checkbox, Alert, Icon} from 'antd';
import Login from 'ant-design-pro/es/Login';
import {withRouter} from 'react-router-dom';
import {doLogin} from '../models';
import styles from './Login.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

const mapStateToProps = ({user: {login}}) => ({
  type: login.type,
  error: !!login.error,
  loading: login.loading
});

@withRouter
@connect(mapStateToProps, {doLogin})
export default class LoginPage extends Component {

  state = {
    type: 'account',
    autoLogin: true
  };

  changeTab = type => this.setState({type});

  changeAutoLogin = e => this.setState({autoLogin: e.target.checked});

  handleSubmit = async (err, values) => {
    if (!err) {
      // todo：先简单传回调，后续再根据场景的复杂程度考虑是否用 react-router-redux 来管理代码触发的跳转场景
      this.props.doLogin(
        {...values, type: this.state.type},
        () => this.props.history.push('/')
      );
    }
  };

  render() {
    const {type: loginType, loading, error} = this.props;
    const {type, autoLogin} = this.state;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.changeTab}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              error && loginType === 'account' && !loading && renderMessage('账户或密码错误（admin/888888）')
            }
            <UserName name="userName" placeholder="admin/user"/>
            <Password name="password" placeholder="888888/123456"/>
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              error && loginType === 'mobile' && !loading && renderMessage('验证码错误')
            }
            <Mobile name="mobile"/>
            <Captcha name="captcha"/>
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{float: 'right'}} href="">忘记密码</a>
          </div>
          <Submit loading={loading}>登录</Submit>
          <Other/>
        </Login>
      </div>
    );
  }
}

function renderMessage(content) {
  return <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>;
}

function Other() {
  return (
    <div className={styles.other}>
      其他登录方式
      <Icon className={styles.icon} type="alipay-circle"/>
      <Icon className={styles.icon} type="taobao-circle"/>
      <Icon className={styles.icon} type="weibo-circle"/>
      <Link className={styles.register} to="/user/register">注册账户</Link>
    </div>
  );
}
