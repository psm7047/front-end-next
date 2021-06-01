import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from 'AppHeader';
import AppMenu from 'AppMenu';
import { createStore } from 'redux';
import rootReducer from 'redux/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createSetAuthTokenAction, createSetUidAction } from 'redux/auth-reducer';
import { addAuthHeader } from "apis/axiosConfig";
import { createWrapper } from "next-redux-wrapper";

//next 는 ssr이기 때문에 서버에서도 실행이 되는데 브라우저에서만 동작을 하는 코드를 넣게 되면 에러
//window => BOM 서버에서는 실행X 클라이언트 쪽에서 실행 => window가 존재하는지 확인
//서버쪽에서 sessionStorage가 없어서 에러가 난다.
//브라우저(클라이언트)에서 반드시 실행해야할 코드(useEffect는 비동기이기 때문에 순서 중요!)
if(typeof window !== "undefined") {
  //axios에 인증 헤더 추가
  if(sessionStorage.getItem("authToken")) {
    addAuthHeader(sessionStorage.getItem("authToken"));
  }
}

function App({ Component, pageProps }) {
  const dispatch = useDispatch();

  //마운트시 한 번만 실행, 비동기로 실행하기 때문에 코드가 다 실행되기 전에 다른 axios 통신이 발생할 수 있음
  useEffect(() => {
    //Redux에 인증 정보 설정
    dispatch(createSetUidAction(sessionStorage.getItem("uid") || ""));
    dispatch(createSetAuthTokenAction(sessionStorage.getItem("authToken")));
    
    
  },[]);
  
  return (
      <div className="d-flex flex-column vh-100">
        <AppHeader />
        <div className="flex-grow-1 container-fluid">
          <div className="row h-100">
            <div className="col-md-6 col-lg-4 p-3 bg-dark">
              <div className=" h-100 d-flex flex-column">
                <div className="flex-grow-1" style={{ height: "0px", overflowY: "auto", overflowX: "hidden" }}>
                  <AppMenu />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-8 p-3">
              <div className=" h-100 d-flex flex-column">
                <div className="flex-grow-1 overflow-auto pr-3" style={{ height: "0px" }}>
                  <Component {...pageProps} />  {/*AppRoute 역할 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools());
  return store;
};
const wrapper = createWrapper(configureStore);
export default wrapper.withRedux(App);