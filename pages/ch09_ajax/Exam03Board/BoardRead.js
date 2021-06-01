import { deleteBoard, readBoard } from "apis/boards";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function BoardRead(props) {
  const router = useRouter();
  const bno = parseInt(router.query.bno);
  const pageNo = parseInt(router.query.pageNo);

  //비동기 통신을 위한 상태
  const [board, setBoard] = useState({});

  //async 달지 못함 마운트 되면 board의 내용을 가져오기(라이프사이클 참조)
  //이벤트 함수가 아닌 처음에 뿌려주어야 하는 정보들
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

  const handleRemove = async(event) => {
    try {
      await deleteBoard(bno);
      router.back();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
        <div className="card">
      <div className="card-header">
        BoardRead
      </div>
      <div className="card-body">
        {board &&
          <>
            <div>
              <p>bno: {board.bno}</p>
              <p>btitle: {board.btitle}</p>
              <p>bcontent: {board.bcontent}</p>
              <p>bwriter: {board.bwriter}</p>
              <p>bdate: {new Date(board.bdate).toLocaleDateString()}</p>
              <p>bhitcount: {board.bhitcount}</p>
              <p>battachoname: {board.battachoname}</p>
              <p>battachsname: {board.battachsname}</p>
              <p>battachtype: {board.battachtype}</p>
            </div>
            <div>
              <Link href={`/ch09_ajax/Exam03Board/BoardTable?pageNo=${pageNo}`}><a className="btn btn-info btn-sm mr-2">목록</a></Link>
              <Link href={`/ch09_ajax/Exam03Board/BoardUpdateForm?bno=${bno}`}><a className="btn btn-info btn-sm mr-2">수정</a></Link>
              <button className="btn btn-info btn-sm mr-2" onClick={handleRemove}>삭제</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default BoardRead;