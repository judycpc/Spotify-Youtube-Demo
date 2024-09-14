import React, { useState } from 'react';
import { Layout, Typography, Card } from 'antd';

import Form from './Form';
import Prediction from './Prediction';
import SimilarWork from './SimilarWork';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

const headerStyle = {
  textAlign: 'center',
  backgroundColor: '#1DB954',
  minHeight: '87px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const contentStyle = {
  backgroundColor: '#212121',
  minHeight: '287px',
  paddingLeft: 24,
  paddingRight: 24
};

const siderStyle = {
  backgroundColor: '#212121',
  minHeight: '574px',
  paddingLeft: 24,
  paddingRight: 24,
};
const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#1DB954',
  height: '70px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const Root = () => {
  const [predicted, setPredicted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState({});
  const [similarWork, setSimilarWork] = useState([]);

  return (
    <Layout>
      <Header style={headerStyle}>
        <Title style={{ fontFamily: 'Helvetica Neue', color: '#FFF', fontWeight: 400, margin: 0 }}>
          音樂作品熱門程度預測
        </Title >
      </Header>
      <Layout>
        <Sider style={siderStyle} width={'60vw'}>
          <Form predicted={predicted} setPredicted={setPredicted} loading={loading} setLoading={setLoading} setPrediction={setPrediction} setSimilarWork={setSimilarWork} />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <Prediction predicted={predicted} loading={loading} prediction={prediction} />
          </Content>
          <Content style={contentStyle}>
            <SimilarWork predicted={predicted} loading={loading} similarWork={similarWork} />
          </Content>
        </Layout>
      </Layout>
      <Footer style={footerStyle}>
        <Text style={{ fontFamily: 'Helvetica Neue', color: '#fff' }}>
          第 O 組 | 國立臺灣大學 111-2 Python 資料分析與機器學習應用
        </Text>
      </Footer>
    </Layout>
  )
};

export default Root;