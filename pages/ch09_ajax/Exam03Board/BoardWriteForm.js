import { createBoardNoAttach } from "apis/boards";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

function BoardWriteForm(props) {

  const router = useRouter();

  //input 양식을 위한 상태
  const [board, setBoard] = useState({
    btitle: "",
    bcontent: ""
  });

  const globalUid = useSelector(state => state.authReducer.uid);    //전역 상태인 uid 가져오기, sessionStorage를 이용해서도 가지고 올 수 있음

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      //상태를 그대로 넘겨주면 안된다. 복제 객체를 넘겨준다.
      const newBoard = {...board};
      newBoard.bwriter = globalUid;
      await createBoardNoAttach(newBoard);
      router.back();
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const handleChange = (event) => {
    setBoard({
      ...board,
      [event.target.name]: event.target.value
    })
  };

  const handleCancel = (event) => {
    router.back();
  };

  return (
    <div className="card">
    <div className="card-header">
      Component: BoardWriteForm
    </div>
    <div className="card-body">
      <form onSubmit={handleAdd}>
        <div className="form-group row">
          <label htmlFor="btitle" className="col-sm-2 col-form-label">btitle</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="btitle" value={board.btitle} onChange={handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="bcontent" className="col-sm-2 col-form-label">bcontent</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="bcontent" value={board.bcontent} onChange={handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 d-flex justify-content-center">
            <input type="submit" className="btn btn-primary btn-sm mr-2" value="추가"/>
            <input type="button" className="btn btn-primary btn-sm" value="취소" onClick={handleCancel}/>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
}

export default BoardWriteForm;