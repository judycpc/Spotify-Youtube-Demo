import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, ConfigProvider, Typography } from 'antd';

import Attr from '../components/Attr';

const { Title } = Typography;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

function Form({ predicted, setPredicted }) {
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [valence, setValence] = useState(50);
  const [speechiness, setSpeechiness] = useState(50);
  const [acousticness, setAcousticness] = useState(50);
  const [instrumentalness, setInstrumentalness] = useState(50);
  const [liveness, setLiveness] = useState(50);
  const [tempo, setTempo] = useState(155);

  const onClick = () => {
    console.log({
      danceability: danceability / 100,
      energy: energy / 100,
      valence: valence / 100,
      speechiness: speechiness / 100,
      acousticness: acousticness / 100,
      instrumentalness: instrumentalness / 100,
      liveness: liveness / 100,
      tempo
    });
    setPredicted(!predicted);
  };

  return (
    <FormContainer>
      <Title level={3} style={{ color: '#fff', fontWeight: 400 }}>
        音樂作品屬性
      </Title>
      <Card
        bordered={false}
        style={{ flex: 1, overflow: 'auto' }}
        bodyStyle={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Attr
          name="可跳舞性"
          range={[0, 100]}
          unit="%"
          labels={['非舞感', '舞感']}
          value={danceability}
          setValue={setDanceability}
          disabled={predicted}
        />
        <Attr
          name="能量"
          range={[0, 100]}
          unit="%"
          labels={['平靜', '強烈']}
          value={energy}
          setValue={setEnergy}
          disabled={predicted}
        />
        <Attr
          name="情緒積極度"
          range={[0, 100]}
          unit="%"
          labels={['負面', '正向']}
          value={valence}
          setValue={setValence}
          disabled={predicted}
        />
        <Attr
          name="口語程度"
          range={[0, 100]}
          unit="%"
          labels={['歌唱', '說唱']}
          value={speechiness}
          setValue={setSpeechiness}
          disabled={predicted}
        />
        <Attr
          name="原聲程度"
          range={[0, 100]}
          unit="%"
          labels={['電子聲', '自然聲']}
          value={acousticness}
          setValue={setAcousticness}
          disabled={predicted}
        />
        <Attr
          name="樂器聲程度"
          range={[0, 100]}
          unit="%"
          labels={['含人聲', '純樂器']}
          value={instrumentalness}
          setValue={setInstrumentalness}
          disabled={predicted}
        />
        <Attr
          name="觀眾活躍度"
          range={[0, 100]}
          unit="%"
          labels={['錄音', '現場']}
          value={liveness}
          setValue={setLiveness}
          disabled={predicted}
        />
        <Attr
          name="節奏"
          range={[60, 250]}
          unit="bpm"
          labels={['慢', '快']}
          value={tempo}
          setValue={setTempo}
          disabled={predicted}
        />
      </Card>
      <ButtonContainer>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1DB954',
            },
          }}
          style={{ alignSelf: 'center' }}
        >
          <Button type={predicted ? 'default' : 'primary'} size='large' onClick={onClick}>
            {predicted ? '重新開始' : '開始預測'}
          </Button>
        </ConfigProvider>
      </ButtonContainer>
    </FormContainer >
  );
}

export default Form;