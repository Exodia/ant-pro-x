import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';

import Navigator from '../../biz/navigator/containers/Navigator';
import GlobalHeader from '../../containers/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';

const {Header, Content, Footer} = Layout;

export function AppLayout({content}) {
  return (
    <Layout>
      <Navigator/>
      <Layout>
        <Header style={{padding: 0}}>
          <GlobalHeader/>
        </Header>
        <Content>
          {content}
        </Content>
        <Footer style={{padding: 0}}>
          <GlobalFooter/>
        </Footer>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  content: PropTypes.element
};
