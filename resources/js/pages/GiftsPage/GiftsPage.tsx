import React from "react";
import StepperHeader from "../../components/others/StepperHeader/StepperHeader";
import "./gifts-page.scss";
import gsap from "gsap";
//@ts-ignore
import gift1 from "../../../assets/img/gifts/g1.png";

//@ts-ignore
import gift2 from "../../../assets/img/gifts/g2.png";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
//@ts-ignore
import gift3 from "../../../assets/img/gifts/g3.png";
//@ts-ignore
import gift4 from "../../../assets/img/gifts/g4.png";
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
import { Footer } from "../../components/footer/Footer";
import { Drawer } from "../../components/drawer/Drawer";
export type IGiftsPageProps = {};

const GiftsPage: React.FC<IGiftsPageProps> = ({}) => {
  React.useEffect(() => {
    gsap.fromTo(
      ".stepper-header",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      "#whatsapp2",
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
      "#music12",
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
      "#music22",
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
      "#heart2",
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
    <div className=" page gifts-page">
      <img src={logoBrand} className="logo-brand" />
      <Drawer />
      <div className="logo-container">
        <a href={"/"}>
          <img src={logoGame} className="logo-game" alt="" />
        </a>
      </div>
      <img src={music1} id="music12" alt="" />
      <img src={music2} id={"music22"} alt="" />
      <img src={heart} id={"heart2"} alt="" />
      <img src={whatsapp} id={"whatsapp2"} alt="" />
      <div className="container-wrapper">
        <StepperHeader />
        <div className="container">
          <div className="col">
            <img src={gift1} className="droppedDown" alt="" />
          </div>
          <div className="col">
            <img src={gift2} alt="" className="bigger" />
            <div className="spacer" />
            <img src={gift3} alt="" />
          </div>
          <img src={gift4} className="pulledTop" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { GiftsPage };
