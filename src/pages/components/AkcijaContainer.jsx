import React from "react";
import "./AkcijaContainer.css"
import UserContext from "../../UserContext";
import { useContext } from "react";

function AkcijaContainer(props) {
  const { userType } = useContext(UserContext);
  return (
    <>
      <div className="akcija-container">
        <div className="akcija-info">
          <h2>{props.name}</h2>
          <p>{props.location}</p>
          {userType=="admin" && <button onClick={props.onClickDelete}>UKLONI AKCIJU</button>}
          {props.children}
        </div>
      </div>
    </>
  );
}

export default AkcijaContainer;
