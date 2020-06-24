import React from 'react';
import logo from "../../logo.svg";

import './InfoCard.css';

export default function InfoCard(props) {
  return (
    <div className='card'>
      <img src={props.info.img} alt="logo" />
      <h2>{props.info.price}$</h2>
      <p>
        {props.info.desc}
      </p>
    </div>
  );
};
