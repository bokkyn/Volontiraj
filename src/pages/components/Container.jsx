import React from "react";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import "./CenterMode.css"

function Container(props) {

  return (
    <>
      <div className="news-item">
        <h2>{props.naslov}</h2>
        
        <p>{`${props.tekst.slice(0, 20)}...`}</p>
        <Popup
              trigger={<p className="button"> Pročitaj više </p>}
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> {props.naslov} </div>
                  <img className="slika "src={props.image}></img>
                  <div className="content">
                    {' '}
                    <p>{props.tekst}</p>
                  </div>
                </div>
              )}
            </Popup>
      </div>
    </>
  );
}

export default Container;

  