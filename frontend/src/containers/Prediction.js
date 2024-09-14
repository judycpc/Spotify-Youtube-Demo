import React from 'react';
import { Typography, Card, Col, Row, Statistic, Empty, Spin, ConfigProvider } from 'antd';
import { CustomerServiceOutlined, EyeOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function Prediction({ predicted, loading, prediction }) {

  return (
    <PredictionContainer>
      <Title level={3} style={{ color: '#fff', fontWeight: 400 }}>
        熱門程度預測
      </Title>
      <Card
        bordered={false}
        style={{ flex: 1, minHeight: 240 }}
        bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        {
          predicted ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Card bordered={false} size='small' hoverable style={{ background: '#f5f5f5' }}>
                    <Statistic title="Spotify Streams per Year" value={prediction.stream} prefix={<CustomerServiceOutlined />} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false} size='small' hoverable style={{ background: '#f5f5f5' }}>
                    <Statistic title="YouTube Views per Year" value={prediction.views} prefix={<EyeOutlined />} />
                  </Card>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Card bordered={false} size='small' hoverable style={{ background: '#f5f5f5' }}>
                    <Statistic title="YouTube Likes per Year" value={prediction.likes} prefix={<LikeOutlined />} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false} size='small' hoverable style={{ background: '#f5f5f5' }}>
                    <Statistic title="YouTube Comments per Year" value={prediction.comments} prefix={<CommentOutlined />} />
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#1DB954',
                },
              }}
            >
              {loading ? <Spin /> : <Empty />}
            </ConfigProvider>
          )
        }
      </Card>
    </PredictionContainer>
  );
}

export default Prediction;