import React from 'react';
import styled from 'styled-components';
import { Slider, ConfigProvider, Typography } from 'antd';

const { Text } = Typography;

const AttrContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0px 5px;
`;

function Attr({ name, range, unit, labels, value, setValue, disabled }) {

  const [min, max] = range;
  const marks = {};
  marks[min] = {
    style: { marginLeft: 8, paddingBottom: 8 },
    label: <Text type='secondary' ellipsis={{ tooltip: labels[0] }}>{labels[0]}</Text>
  };
  marks[max] = {
    style: { marginLeft: 8, paddingTop: 8 },
    label: <Text type='secondary' ellipsis={{ tooltip: labels[1] }}>{labels[1]}</Text>
  };

  return (
    <AttrContainer>
      <Text style={{ color: '#212121', fontWeight: 400, margin: 0 }}>{value + ' ' + unit}</Text>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1DB954',
          },
        }}>

        <Slider
          vertical
          min={min}
          max={max}
          marks={marks}
          disabled={disabled}
          defaultValue={(range[0] + range[1]) / 2}
          onChange={(v) => setValue(v)}
          handleStyle={{ borderRadius: 0 }}
          style={{ marginTop: 16, marginBottom: 16, flex: 1 }}
        />
      </ConfigProvider>
      <Text
        ellipsis={{ tooltip: name }}
        style={{ color: '#212121', fontWeight: 400, margin: 0 }}>
        {name}
      </Text>

    </AttrContainer>
  );
}

export default Attr;