import React from 'react';
import { Typography, Card, Table, Button, Empty } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function SimilarWork({ predicted, similarWork }) {
  const columns = [
    {
      title: '歌手',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: '作品',
      dataIndex: 'track',
      key: 'track',
    },
    {
      title: '連結',
      dataIndex: 'link',
      key: 'link',
      render: (l) => <Button type='text' href={l} icon={<LinkOutlined />} />
    }
  ];

  return (
    <WorkContainer>
      <Title level={3} style={{ color: '#fff', fontWeight: 400 }}>
        相似作品
      </Title>
      <Card
        bordered={false}
        style={{ flex: 1, marginBottom: 24, minHeight: 234 }}
        bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        {
          predicted ?
            <Table dataSource={similarWork} columns={columns} pagination={false} size='small' />
            : <Empty />
        }
      </Card>
    </WorkContainer>
  );
}

export default SimilarWork;