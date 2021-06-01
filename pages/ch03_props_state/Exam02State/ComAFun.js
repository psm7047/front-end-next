import { useState } from "react";

function getRandomColor() {
    return "#" + Math.floor(Math.random()*parseInt("ffffff", 16)).toString(16);
}

function ComAFun(props) {
    //일회성 정보는 변수 선언 ex)게시판 리스트
    let name = "홍길동";

    //돔이 바껴도 유지되어야 할 정보는 상태 ex)회원가입 폼 형식
    const [state, setState] = useState({
        number: 0,
        color: "black"
    });

    const addNum = (event) => {
        setState({
            ...state,
            number: state.number + 1
        });
        name = "리액트";
    };

    const changeColor = (event) => {
        setState({
            ...state,
            color: getRandomColor()
        });
    };
    return(
        <div className="card">
              <div className="card-header">
                ComAFun
              </div>
              <div className="card-body">
                  name: {name}
                <h3 style={{color: state.color}}>{state.number}</h3>
                <button className="btn btn-info btn-sm mr-2" onClick={addNum}>숫자 증가</button>
                <button className="btn btn-info btn-sm" onClick={changeColor}>색깔 변경</button>
              </div>
            </div>
    );
}

export default ComAFun;