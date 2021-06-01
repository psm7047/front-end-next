import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { getBoardList } from "apis/boards";
import { useRouter } from "next/router";

function BoardTable(props) {
  //console.log(props.location);
  const router = useRouter();
  const pageNo = parseInt(router.query.pageNo) || 1;

  const [page, setPage] = useState(null);
  
  const changePageNo = async (pageNo) => {
    try{
      const response = await getBoardList(pageNo);
      setPage(response.data);
    }catch(error) {
      console.log(error.message);
    }
  }
  useEffect(() => {   //마운트될 때 실행
    changePageNo(pageNo); //처음 마운트될 경우에 호출됨(실행)
  }, [pageNo]);

  return (
    <div className="card">
      <div className="card-header">
        BoardTable
      </div>
      <div className="card-body">
        {page!=null &&
          <div>
            <div className="mb-3">
              <Link href="/ch09_ajax/Exam04FileUploadDownload/BoardWriteForm" ><a className="btn btn-success btn-sm">생성</a></Link>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>날짜</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                {page.boards.map(board => {
                  return (
                    <tr key={board.bno}>
                      <td>{board.bno}</td>
                      <td><Link href={`/ch09_ajax/Exam04FileUploadDownload/BoardRead?bno=${board.bno}&pageNo=${page.pager.pageNo}`}>{board.btitle}</Link></td>
                      <td>{board.bwriter}</td>
                      <td>{new Date(board.bdate).toLocaleDateString()}</td>
                      <td>{board.bhitcount}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan="5" style={{textAlign: "center"}}>
                    <button className="btn btn-outline-primary btn-sm mr-1" onClick={() => changePageNo(1)}>처음</button> 
                    {(page.pager.groupNo > 1) && 
                      <button   className="btn btn-outline-info btn-sm mr-1" onClick={()=> changePageNo(page.pager.startPageNo-1)}>이전</button>
                    }
                    {page.pager.pageArray.map(i =>
                      <button className={`btn ${i===page.pager.pageNo?"btn-danger":"btn-outline-success"} btn-sm mr-1`} key={i} onClick={() => changePageNo(i)}>{i}</button>
                    )}
                    {page.pager.groupNo < page.pager.totalGroupNo && 
                      <button   className="btn btn-outline-info btn-sm mr-1" onClick={()=> changePageNo(page.pager.endPageNo+1)}>다음</button>
                    }
                    <button className="btn btn-outline-primary btn-sm" onClick={() => changePageNo(page.pager.totalPageNo)}>맨끝</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default BoardTable;