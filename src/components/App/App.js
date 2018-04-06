import React from 'react';
import {Layout} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import Navigator from '../../containers/Navigator';
import GlobalHeader from '../../containers/GlobalHeader';
import Routes from '../../Routes';

const {Header, Content} = Layout;

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navigator/>
        <Layout>
          <Header style={{padding: 0}}>
            <GlobalHeader/>
          </Header>
          <Content>
            <Routes/>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
