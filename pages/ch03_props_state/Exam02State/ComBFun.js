import React from "react";
import { useState } from "react";

function ComBFun(props) {
  const [number, setNumber] = useState(0);

  const addNum1 = (event) => {
    setNumber(number + 1);
    setNumber(number + 1);
  };

  const addNum2 = (event) => {
    setNumber((prevNumber) => prevNumber + 1);
    setNumber((prevNumber) => prevNumber + 1);
  };
  return (
    <div className="card">
      <div className="card-header">ComBFun</div>
      <div className="card-body">
        <h3>{number}</h3>
        <button className="btn btn-info btn-sm mr-2" onClick={addNum1}>
          숫자 증가
        </button>
        <button className="btn btn-info btn-sm mr-2" onClick={addNum2}>
          숫자 증가
        </button>
      </div>
    </div>
  );
}

export default ComBFun;
