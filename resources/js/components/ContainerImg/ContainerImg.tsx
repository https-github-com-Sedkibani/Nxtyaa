import * as React from "react";
import gsap from "gsap";
//@ts-ignore

import "./ContainerImg.scss";
//@ts-ignore
import insta from "../../../assets/img/icons/insta.png";

//@ts-ignore
import music1 from "../../../assets/img/icons/music1.png";
//@ts-ignore
import music2 from "../../../assets/img/icons/music2.png";
//@ts-ignore
import heart from "../../../assets/img/icons/heart.png";
//@ts-ignore
import whatsapp from "../../../assets/img/icons/whatsapp.png";

interface IContainerImg {
  children: any;
}

const ContainerImg: React.FunctionComponent<IContainerImg> = (
  props: IContainerImg
) => {
  const { children } = props;

  React.useEffect(() => {
    gsap.fromTo(
      ".helper",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      "#whatsapp",
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
      "#music1",
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
      "#music2",
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
      "#heart",
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
    <div className="container-img">
      <img src={insta} className="insta-img" />
      <div className="children">{children}</div>
      <img src={music1} id="music1" alt="" />
      <img src={music2} id={"music2"} alt="" />
      <img src={heart} id={"heart"} alt="" />
      <img src={whatsapp} id={"whatsapp"} alt="" />
    </div>
  );
};

export default ContainerImg;
