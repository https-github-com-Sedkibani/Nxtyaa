import * as React from "react";
import gsap from "gsap";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
//@ts-ignore
import logoBrand from "../../../assets/img/logo-arab.png";
//@ts-ignore
import music1 from "../../../assets/img/icons/music1.png";

//@ts-ignore
import music2 from "../../../assets/img/icons/music2.png";
//@ts-ignore
import heart from "../../../assets/img/icons/heart.png";
//@ts-ignore
import whatsapp from "../../../assets/img/icons/whatsapp.png";
//@ts-ignore
import { Footer } from "../../components/footer/Footer";
import { Quizz } from "../../components/quizz/Quizz";

import "./QuizzPage.scss";

interface IQuizzPage {}

const QuizzPage: React.FunctionComponent<IQuizzPage> = (props: IQuizzPage) => {

  React.useEffect(() => {
    gsap.fromTo(
      "#music13",
      {
        opacity: 1,
        y: -100,
        rotate: -180,
      },
      {
        rotate: 0,
        y: 0,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        ease: "Bounce.easeOut",
      }
    );

    gsap.fromTo(
      "#music23",
      {
        opacity: 1,
        x: -10,
        scale: 0.6,
      },
      {
        x: 0,
        opacity: 0.5,
        scale: 1,
        duration: 3,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        ease: "Back.easeOut.easeOut.config(1.7)",
      }
    );
    gsap.fromTo(
      "#heart3",
      {
        opacity: 1,
        x: -10,
        scale: 0.6,
      },
      {
        x: 0,
        opacity: 0.5,
        scale: 1,
        duration: 1,
        repeat: -1,
        repeatDelay: 0.2,
        yoyo: true,
        ease: "Bounce.easeIn",
      }
    );
    gsap.fromTo(
      "#whatsapp3",
      {
        opacity: 1,
        y: -100,
        scale: 0.6,
      },
      {
        y: 0,
        opacity: 0.9,
        scale: 1,
        duration: 2,
        repeat: -1,
        repeatDelay: 0.2,
        yoyo: true,
        ease: "Bounce.easeOut",
      }
    );
  }, []);

  return (
    <div className="quizz-page page">
      {/* <img src={logoBrand} className="logo-brand" /> */}
      {/* <div className="logo-container">
        <a href={"/"}>
          <img src={logoGame} className="logo-game" alt="" />
        </a>
      </div> */}
      <img src={music1} id="music13" alt="" />
      <img src={music2} id={"music23"} alt="" />
      <img src={heart} id={"heart3"} alt="" />
      <img src={whatsapp} id={"whatsapp3"} alt="" />
      <Quizz />
      <Footer />
    </div>
  );
};

export default QuizzPage;
