import * as React from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import X4 from "./X4.png";

import "./HomePage.scss";
import {
  FB_LOGIN_REQUEST,
  FB_LOGIN_SUCCESS,
} from "../../redux/actions/auth-actions/types";
import AuthServices from "../../redux/actions/auth-actions/services";
import { getAuthUser } from "../../redux/actions/auth-actions/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//@ts-ignore
import logoBrand from "../../../assets/img/logo.png";

//@ts-ignore
import landingImg1 from "../../../assets/img/landing/1.png";
//@ts-ignore
import landingImg2 from "../../../assets/img/landing/2.png";
//@ts-ignore
import landingImg3 from "../../../assets/img/landing/3.png";
//@ts-ignore
import landingImg4 from "../../../assets/img/landing/4.png";
//@ts-ignore
import landingImg5 from "../../../assets/img/landing/5.png";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
import { Footer } from "../../components/footer/Footer";
import axiosInstance from "../../config/axios-instance";
import ActionButton from "../../components/ActionButton/ActionButton";
import ProductsAnimation from "./ProductsAnimation/ProductsAnimation";
import { Drawer } from "../../components/drawer/Drawer";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user, fbUser } = useSelector(
    (state: any) => state.authReducer
  );

  React.useEffect(() => {
    const urlString: string = window.location.href;
    var url = new URL(urlString);
    var name = url.searchParams.get("name");
    var email = url.searchParams.get("email");
    var avatar = url.searchParams.get("avatar");
    var id = url.searchParams.get("id");

    if (name && email && id && avatar) {
      const fbObject = {
        name: name,
        email: email,
        id: id,
        avatar: avatar,
      };
      dispatch({
        type: FB_LOGIN_SUCCESS,
        payload: fbObject,
      });
    }
  }, []);

  React.useEffect(() => {
    // if (isLoggedIn) {
    //   history.push("/upload");
    // }
    if (fbUser && fbUser.id) {
      AuthServices.checkAccountRequest(fbUser.id)
        .then((resp: any) => {
          localStorage.setItem("token", resp.data.token);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${resp.data.token}`;
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${resp.data.token}`;
          dispatch({
            type: "SET_TOKEN",
            payload: {
              user: resp.data.user,
              token: resp.data.token,
            },
          });
        })
        .catch(() => {
          history.push("/form");
        });
    }
  }, [isLoggedIn, fbUser]);

  async function handleLogin() {
    if (isLoggedIn && user) {
      history.push("/upload");
      return void 0;
    }
    if (!fbUser) {
      // @ts-ignore
      window.location.href = process.env.MIX_APP_URL + "/auth/facebook";
      return void 0;
    }

    if (fbUser && fbUser.id) {
      AuthServices.checkAccountRequest(fbUser.id)
        .then((resp: any) => {
          localStorage.setItem("token", resp.data.token);
          dispatch({
            type: "SET_TOKEN",
            payload: {
              user: resp.data.user,
              token: resp.data.token,
            },
          });
        })
        .catch(() => {
          history.push("/form");
        });
    }
  }

  const items = [
    <img key={"0"} src={landingImg1} className="landing-img" alt="" />,

    <img key={"1"} src={landingImg2} className="landing-img" alt="" />,

    <img key={"2"} src={landingImg3} className="landing-img" alt="" />,

    <img key={"3"} src={landingImg4} className="landing-img" alt="" />,

    <img key={"4"} src={landingImg5} className="landing-img" alt="" />,
  ];

  return (
    <div className="home-page">
      <img src={logoBrand} className="logo-brand" />
      <Drawer />
      <div className="left">
        <ProductsAnimation />
        {/* <div className="carousel-container">
          <Carousel
            infiniteLoop
            autoPlay
            stopOnHover={false}
            interval={2000}
            transitionTime={500}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            swipeable={false}
          >
            {items.map((item) => item)}
          </Carousel>
        </div> */}
      </div>

      <div className="right">
        <a href={"/"}>
          <img src={logoGame} className="logo-game" alt="" />
        </a>
        <p
          className="headline-p"
          style={{
            textAlign: "center",
          }}
        >
          !عیش مع جیلك وجیل غیرك
          <br />
          جیلاطي النسیم عاشت معاه أجیال ذھبیة والیوم شن رایكم تختاروا جیلكم
          الذھبي
          <br />
          والجیلاطي الي تحبوه واربحوا ھدایا الجیل الجدید￼
        </p>
        ￼
        <ActionButton text={"شارك و إربح"} callback={handleLogin} />
      </div>

      <div></div>
      <Footer />
    </div>
  );
};

export default HomePage;
