import React from 'react';

import './Modal.css';

const Modal = (props) => (
  <div className="modal">
    <header className="modal__header">
      <img src={props.info.imgUrl} />
    </header>
    <section className="modal__section">
      <ul className="modal__features">
        {Object.entries(props.info.room).map((key) => (
          <li>{`${key[0]}: ${key[1]}`}</li>
        ))}
      </ul>
      <article className="modal__article">
        <p>{props.info.desc}</p>
      </article>
    </section>
  </div>
);

export default Modal;
