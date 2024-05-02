import React from "react";
import "./UdrugeContainer.css"


function UdrugeContainer(props) {
  return (
    <>
      <div className="udruge-container">
        <div className="udruge-info">
          <h2>{props.name}</h2>
          <p>{props.mjesto}</p>
        </div>
        {props.children}
      </div>
    </>
  );
}

export default UdrugeContainer;