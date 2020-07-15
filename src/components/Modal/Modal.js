import React from 'react';

import './Modal.css';

const Modal = (props) => (
  <div className="modal">
    <header className="modal__header">
      <img src={props.info.imgUrl} alt="top" />
    </header>
    <section className="modal__section">
      <h4>Property description</h4>
      location: {props.info.address}
      <ul className="modal__features">
        {Object.entries(props.info.room).map((key) => (
          <li key={props.info.id + key[0]}>{`${key[0]}: ${key[1]}`}</li>
        ))}
      </ul>
      <article className="modal__article">
        <p>{props.info.desc}</p>
      </article>
      <h4>Pricing/Rent</h4>
      <ul className="modal__pricing">
        <li><b>{props.info.priceFull}$</b></li>
      </ul>
      {}
    </section>
  </div>
);

export default Modal;
