import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, ConfigProvider, Typography } from 'antd';

import Attr from '../components/Attr';

import { predict } from '../api';

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

function Form({ predicted, setPredicted, loading, setLoading, setPrediction, setSimilarWork }) {
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [loudness, setLoudness] = useState(-30);
  const [valence, setValence] = useState(50);
  const [speechiness, setSpeechiness] = useState(50);
  const [acousticness, setAcousticness] = useState(50);
  // const [instrumentalness, setInstrumentalness] = useState(50);
  const [liveness, setLiveness] = useState(50);
  const [tempo, setTempo] = useState(155);
  const [duration_ms, setDuration_ms] = useState(195);

  const onClick = async () => {
    if (!predicted) {
      const data = {
        Danceability: danceability / 100,
        Energy: energy / 100,
        Loudness: loudness,
        Valence: valence / 100,
        Speechiness: speechiness / 100,
        Acousticness: acousticness / 100,
        // instrumentalness: instrumentalness / 100,
        Liveness: liveness / 100,
        Tempo: tempo,
        Duration_ms: duration_ms * 1000
      }

      setLoading(true);
      const { prediction, similar_work } = await predict(data);
      setLoading(false);

      setPrediction(prediction);
      setSimilarWork(similar_work);
    }

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
          name="音量"
          range={[-60, 0]}
          unit="dB"
          labels={['小聲', '大聲']}
          value={loudness}
          setValue={setLoudness}
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
        {/* <Attr
          name="樂器聲程度"
          range={[0, 100]}
          unit="%"
          labels={['含人聲', '純樂器']}
          value={instrumentalness}
          setValue={setInstrumentalness}
          disabled={predicted}
        /> */}
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
          name="情緒積極度"
          range={[0, 100]}
          unit="%"
          labels={['負面', '正向']}
          value={valence}
          setValue={setValence}
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
        <Attr
          name="長度"
          range={[30, 360]}
          unit="秒"
          labels={['短', '長']}
          value={duration_ms}
          setValue={setDuration_ms}
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
            {predicted ? '重新調整屬性' : '開始預測'}
          </Button>
        </ConfigProvider>
      </ButtonContainer>
    </FormContainer >
  );
}

export default Form;