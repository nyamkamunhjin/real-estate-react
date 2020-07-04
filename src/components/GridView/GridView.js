import React from 'react';
import InfoCard from '../InfoCard/InfoCard';

import './GridView.css';

export default function GridView(props) {
  const infos = props.info;
  return (
    <ul className="grid-view">
      {infos.map((info) => (
        <InfoCard info={info} key={info.desc} />
      ))}
    </ul>
  );
}
