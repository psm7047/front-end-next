import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from 'AppHeader';
import AppMenu from 'AppMenu';
import { createStore } from 'redux';
import rootReducer from 'redux/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createSetAuthTokenAction, createSetUidAction } from 'redux/auth-reducer';

function App({ Component, pageProps }) {
  const store = createStore(rootReducer, composeWithDevTools());

  //마운트시 한 번만 실행
  useEffect(() => {
    //Redux에 인증 정보 설정
    store.dispatch(createSetUidAction(sessionStorage.getItem("uid") || ""));
    store.dispatch(createSetAuthTokenAction(sessionStorage.getItem("authToken")));
  },[]);
  
  return (
    <Provider store={store}>
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
    </Provider>
  );
}



export default App
