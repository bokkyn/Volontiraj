import React from "react";
import "./UserContainer.css"
import UserContext from "../../UserContext";
import { useContext } from "react";

function UserContainer(props) {

  
const { userType } = useContext(UserContext);
  return (
    <>
      <div className="user-container">
        <img src={props.image} alt={props.name} />
        <div className="user-info">
          <h2>{props.name}</h2>
          <p>{props.location}</p>
          {props.children}
          {userType == "admin" && <button onClick={props.onClickDelete}>UKLONI</button>}
        </div>
      </div>
    </>
  );
}

export default UserContainer;