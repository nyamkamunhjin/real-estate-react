import React from 'react';
import logo from '../../logo.svg';

import './InfoCard.css';

export default function InfoCard(props) {
  return (
    <li className="card">
      <div className="card-top">
        <img src={props.info.imgUrl} alt="logo" />
      </div>
      <div className="card-info">
        <div className="card-info-price"><b>{props.info.priceRent}$</b></div>
        <div className="card-info-details">
          {props.info.room.bed}bd |{' '}
          {props.info.room.bath}ba |{' '} 
          {props.info.room.size}sqft
        </div>
      </div>
      <div className="card-footer">
          <div className="address">{props.info.address}</div>
        </div>
    </li>
  );
}
