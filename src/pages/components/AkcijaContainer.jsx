import React from "react";
import "./AkcijaContainer.css"
import UserContext from "../../UserContext";
import { useContext } from "react";

function AkcijaContainer(props) {
  const { userType } = useContext(UserContext);
  return (
    <>
      <div className="akcija-container">
        
          <h2>{props.name}</h2>
          <div className="akcija-info">
          <p>{props.location}</p>
          {props.children}
          {userType=="admin" && <button className="remove-button" onClick={props.onClickDelete}>UKLONI AKCIJU</button>}
          
        </div>
      </div>
    </>
  );
}

export default AkcijaContainer;
