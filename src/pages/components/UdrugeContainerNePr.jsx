import React from "react";
import "./UdrugeContainerNePr.css"

function UdrugeContainer(props) {
  return (
    <>
      <div className="udruge-container-ne-pr">
        <div className="udruge-info">
          <h2>{props.name}</h2>
          <p>{props.mjesto}</p>
        </div>
        {props.children}
      <button onClick={props.onClickDelete} className="remove-button">UKLONI</button>
     <button onClick={props.onClickPrihvati} className="sortiraj-button">PRIHVATI</button>
      </div>
    </>
  );
}

export default UdrugeContainer;