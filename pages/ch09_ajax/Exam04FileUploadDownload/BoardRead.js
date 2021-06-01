import { deleteBoard, downloadAttach, readBoard } from "apis/boards";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

function BoardRead(props) {

  const router = useRouter();
  const bno = parseInt(router.query.bno);
  const pageNo = parseInt(router.query.pageNo);

  const [board, setBoard] = useState({});

  //async 달지 못함 마운트 되면 board의 내용을 가져오기(라이프사이클 참조)
  //이벤트 함수가 아닌 처음에 보여주어야할 정보
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

  //방법1
  //사진은 비동기로 불러야하므로 상태로 선언
  const [imgSrc, setImgSrc] = useState(null);
  //const imgTag = useRef();
  
  //마운트되거나 board 상태가 바뀔 경우(첫 화면) 사진이 보여져야하므로 useEffect
  useEffect(() => {
    //첨부파일이 있을 경우
    if(board.battachoname) {
      //비동기 통신
      const work = async () => {
        try {
          const response = await downloadAttach(board.bno);   //board가 바뀔때 실행되므로
          setImgSrc(URL.createObjectURL(response.data));    //json타입이 아니라 blob 타입이므로 오브젝트 데이터로 변환
          //imgTag.current.src = URL.createObjectURL(response.data);    //이렇게도 할 수 있다(참고용)
        } catch (error) {
          console.log(error.message);
          //history.push("./error"); 에러 컴포넌트로 이동
        }
      };
      work();
    }
  }, [board]);    //마운트, board 상태가 바뀔 때

  //방법2
  const authToken = useSelector(state => state.authReducer.authToken);

  return (
        <div className="card">
      <div className="card-header">
        BoardRead
      </div>
      <div className="card-body">
        {board &&
        <>
          <div className="row">
            <div className="col-md-6">
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

            <div className="col-md-6">
              {board.battachoname && 
                <div>
                  {/* 방법1 (axios 이용) */}
                  <img src={imgSrc} alt="" width="200"/>
                  <hr/>
                  {/* 방법2 (절대경로 이용) authToken을 queryString으로 보내줌 */}
                  <img src={`http://localhost:8080/boards/battach/${board.bno}?authToken=${authToken}`} alt="" width="200"/>
                </div>
              }
            </div>
          </div>

            <div>
              <Link href={"/ch09_ajax/Exam04FileUploadDownload/BoardTable?pageNo=" + pageNo} ><a className="btn btn-info btn-sm mr-2">목록</a></Link>
              <Link href={`/ch09_ajax/Exam04FileUploadDownload/BoardUpdateForm?bno=${board.bno}`} ><a className="btn btn-info btn-sm mr-2">수정</a></Link>
              <button className="btn btn-info btn-sm mr-2" onClick={handleRemove}>삭제</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default BoardRead;