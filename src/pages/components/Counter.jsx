import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from 'react-countup';
import "./Counter.css"

function Counter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(props.page)
      .then((response) => {
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error("Greška:", error);
      });
  }, [props.page]);

  return (
    <div className="home-container">
      <div className="header">
        <p className="counter-text">
          {props.name}: <CountUp end= {count} />

        </p>
      </div>
    </div>
  );
}

export default Counter;
