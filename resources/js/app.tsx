import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axiosInstance from "./config/axios-instance";
import FormPage from "./pages/FormPage/FormPage";
import { GiftsPage } from "./pages/GiftsPage/GiftsPage";
import HomePage from "./pages/HomePage/HomePage";
import ParticipantsPage from "./pages/ParticipantsPage/ParticipantsPage";
import PhotosPage from "./pages/PhotosPage/PhotosPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import { getAuthUser } from "./redux/actions/auth-actions/actions";
import store from "./redux/store";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  useAlert,
} from "react-alert";
//@ts-ignore
import AlertTemplate from "react-alert-template-basic";

import "./main.scss";
import QuizzPage from "./pages/QuizzPage/QuizzPage";
import PrivacyPage from "./pages/PrivacyAndPolicy/PrivacyPage";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 6000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

// @ts-ignore
window.svgPanZoom = require("./svg-zoom");

const App = () => {
  const { token, isLoggedIn, isLoadingUser } = useSelector(
    (state: any) => state.authReducer
  );
  const alert = useAlert();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    dispatch(getAuthUser());
  }, []);

  // React.useEffect(() => {
  //   var ua = navigator.userAgent.toLowerCase();
  //   var isAndroid = ua.indexOf("android") > -1;

  //   if (isAndroid) {
  //     alert.info(
  //       <div
  //         style={{
  //           direction: "rtl",
  //           textAlign: "center",
  //         }}
  //       >
  //         لضمان عمل التطبيق كما يجب، يرجى إستخدام متصفح الهاتف بدلا من المتصفح
  //         الخاص بفايسبوك ، شكرا
  //       </div>
  //     );
  //   }
  // }, []);

  return (
    <Router>
      {isLoadingUser ? (
        <h1>Loading...</h1>
      ) : (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <GuestRoute
            path="/form"
            authenticated={isLoggedIn}
            component={FormPage}
          />
          <Route path="/gifts" component={GiftsPage} />

          <AuthRoute
            path="/upload"
            authenticated={isLoggedIn}
            component={UploadPage}
          />

          <AuthRoute
            path="/quizz"
            authenticated={isLoggedIn}
            component={QuizzPage}
            exact
          />
          {/* <AuthRoute
            path="/photos"
            authenticated={isLoggedIn}
            component={PhotosPage}
          /> */}
          <Route path="/photos" exact>
            <PhotosPage />
          </Route>

          <Route path="/privacy-policy" exact>
            <PrivacyPage />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

function WrappedApp() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  );
}

if (document.getElementById("root")) {
  ReactDOM.render(<WrappedApp />, document.getElementById("root"));
}

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { isLoggedIn } = useSelector((state: any) => state.authReducer);
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

const GuestRoute = ({ component: Component, authenticated, ...rest }: any) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        return !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/upload" />
        );
      }}
    />
  );
};
