import { readBoard,updateBoard } from "apis/boards";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

function BoardUpdateForm(props) {

  const router = useRouter();
  const bno = parseInt(router.query.bno);

  //input 양식이므로 board는 상태로 만들어주기
  //bno속성 추가
  const [board, setBoard] = useState({
    bno: "",
    btitle: "",
    bcontent: ""
  });

  //async 달지 못함
  useEffect(() => {
    //비동기 통신
    const work = async () => {
      try {
        const response = await readBoard(bno);
        setBoard(response.data);
      } catch (error) {
        console.log(error.message);
        //history.push("./error"); 에러 컴포넌트로 이동
      }
    };
    work();
  },[bno]); //마운트, bno가 바뀔때만 실행
  
  const handleUpdate = async(event) => {
    event.preventDefault();
    const dirtyBoard = {...board};
    await updateBoard(dirtyBoard);
    router.back();
  };

  const handleChange = (event) => {
    setBoard({
      ...board,
      [event.target.name]: event.target.value
    });
  };
  
  const handleCancel = (event) => {
    router.back();
  };

  return (
        <div className="card">
      <div className="card-header">
        Component: BoardUpdateForm
      </div>
      <div className="card-body">
        <form onSubmit={handleUpdate}>
          <div className="form-group row">
            <label htmlFor="btitle" className="col-sm-2 col-form-label">btitle</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="btitle" name="btitle" value={board.btitle} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="bcontent" className="col-sm-2 col-form-label">bcontent</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="bcontent" name="bcontent" value={board.bcontent} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 d-flex justify-content-center">
              <input type="submit" className="btn btn-primary btn-sm mr-2" value="수정"/>
              <input type="button" className="btn btn-primary btn-sm" value="취소" onClick={handleCancel}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardUpdateForm;