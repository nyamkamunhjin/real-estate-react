import React from 'react';

import './Modal.css';

const Modal = (props) => (
  <div className="modal">
    <header className="modal__header">
      <img src={props.info.imgUrl} alt="top" />
    </header>
    <section className="modal__section">
      <h4>Property description:</h4>
      <br />
      <div className="modal__features">
        <b>location:</b> {props.info.address}
        <ul>
          {Object.entries(props.info.room).map((key) => (
            <li key={props.info.id + key[0]}>
              <b>{key[0]}</b>: {key[1]}
            </li>
          ))}
        </ul>
      </div>

      <article className="modal__article">
        <p>{props.info.desc}</p>
      </article>
      <br />
      <h4>Pricing/Rent:</h4>
      <br />
      <div className="modal__pricing">
        <ul>
          <li>
            <b>{props.info.priceRent}$</b>
          </li>
        </ul>
      </div>
      {}
    </section>
    <footer className="modal__footer">
      <button className='btn'>Save</button>
    </footer>
  </div>
);

export default Modal;
