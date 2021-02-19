import React, { useRef } from 'react';
import Generator from '../FRGenerator';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {},
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const Demo = () => {
  const ref = useRef();
  const extraButtons = [
    {
      text: '保存',
      onClick: () => {
        alert(1);
      },
    },
  ];
  return (
    <div style={{ height: '80vh' }}>
      <Generator
        ref={ref}
        defaultValue={defaultValue}
        extraButtons={extraButtons}
      />
    </div>
  );
};

export default Demo;
