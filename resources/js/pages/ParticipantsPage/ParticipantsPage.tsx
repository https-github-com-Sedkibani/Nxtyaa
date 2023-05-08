import * as React from "react";
import gsap from "gsap";
import NamingIcon from "../../components/svg/NamingIcon";
// @ts-ignore
import { Link } from "react-router-dom";
import AuthServices from "../../redux/actions/auth-actions/services";
import RedCounter from "../../components/svg/RedCounter";
import GreenCounter from "../../components/svg/GreenCounter";
import StepperHeader from "../../components/others/StepperHeader/StepperHeader";
import "./ParticipantsPage.scss";

interface IParticipantsPage {}

const ParticipantsPage: React.FunctionComponent<IParticipantsPage> = (
  props: IParticipantsPage
) => {
  const [participationsNumber, setParticipationsNumber] =
    React.useState<number>(0);

  React.useEffect(() => {
    gsap.fromTo(
      ".naming",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      ".helper",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      ".stepper-header",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      ".counters",
      { y: 40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      ".upload",
      { y: 40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.to(".upload", { scale: 1.1, duration: 0.5 });
    tl.to(".upload", { scale: 1, duration: 0.5 });
  }, []);

  React.useEffect(() => {
    AuthServices.getParticipationsNumberRequest().then((r: any) =>
      setParticipationsNumber(r.data)
    );
  }, []);

  return (
    <div className="participants-page page">
      <StepperHeader />
      <div className="naming">
        <NamingIcon />
      </div>
      <p
        className="helper"
        style={{
          direction: "rtl",
        }}
      >
        انتظرونا في السحب العشوائي المضاعف !
        {/* <br />
          160 فائز في السحب العشوائي الرئیسي 1000د لكل فائز
          <br />
          وربي ینزل البركة في حصیلة المشاركین یلي بیتحول عددھم للدینار المضاعف */}
      </p>
      <div className="counters">
        <GreenCounter value={participationsNumber} />
        <RedCounter value={participationsNumber} />
      </div>
      {/* <Link to="/upload" className="upload">
        <img src={UploadButton} />
      </Link> */}
    </div>
  );
};

export default ParticipantsPage;
