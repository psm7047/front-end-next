import axios from "axios";
//import qs from "qs";

export function getBoardList(pageNo=1) {
    const promise = axios.get("/boards",{params:{pageNo: pageNo}});
    return promise;
}

export function createBoardNoAttach(board) {
    
    const promise = axios.post("/boards", board); //{"btitle": "제목1", "bcontent":"내용1", ...} 스프링에선ㄴ @RequsetBody 필요
    //const promise = axios.post("/boards", qs.stringify(board)); //btitle=제목1&bcontent=내용1
    return promise;
}

export function createBoard(multipartFormData) {
    return axios.post("/boards", multipartFormData); 
  }
  
  export function readBoard(bno) {
    return axios.get("/boards/" + bno);
  }
  
  export function deleteBoard(bno) {
    return axios.delete("/boards/" + bno);
  }
  
  export function updateBoard(board) {
    return axios.put("/boards", board); //{"btitle":"xxx", "bcontent":"yyy", "bwriter":"zzz"}
  }
  
  export function downloadAttach(bno) {
    return axios.get("/boards/battach/" + bno, {responseType: "blob"});
  }