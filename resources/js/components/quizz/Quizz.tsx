import React from "react";
import gsap from "gsap";
//@ts-ignore
import music1 from "../../../assets/img/icons/music1.png";

//@ts-ignore
import music2 from "../../../assets/img/icons/music2.png";
//@ts-ignore
import heart from "../../../assets/img/icons/heart.png";
//@ts-ignore
import whatsapp from "../../../assets/img/icons/whatsapp.png";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";

import StepWizard from "react-step-wizard";
import ActionButton from "../ActionButton/ActionButton";
import questions from "./questions";
import { useForm } from "react-hook-form";
import AuthServices from "../../redux/actions/auth-actions/services";
import { useAlert } from "react-alert";
import StepperHeader from "../others/StepperHeader/StepperHeader";
//@ts-ignore
import { BoxLoading } from "react-loadingg";

import "./quizz.scss";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../redux/actions/auth-actions/actions";

export type IQuizzProps = {};

const Quizz: React.FC<IQuizzProps> = ({}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [editedPhoto, setEditedPhoto] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  function onSubmit(data: any) {
    setIsSubmitting(true);
    AuthServices.submitAnswersRequest(data)
      .then((r) => {
        setIsSubmitting(false);
        setEditedPhoto(r.data);
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.response.status === 422) {
          alert.error("جميع الإجابات إجبارية");
        }
      });
  }
  const questionsComponents = questions.map((_question: any) => (
    <OneQuestion key={_question.id} question={_question} register={register} />
  ));

  function handleShareButton(e: any) {
    // e.preventDefault();
    // @ts-ignore
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: process.env.MIX_API_STORAGE + editedPhoto.edited,
      },
      function () {
        // void 0;
      }
    );
  }
  return (
    <div className="quizz-wrapper">
      <StepperHeader />
      <div className="quizz-container">
        {isSubmitting ? (
          <div
            style={{
              fontSize: "2rem",
              minHeight: "250px",
              direction: "rtl",
            }}
          >
            يتم التثبت من الإجابات...
            <BoxLoading size={"large"} color={"#430582"} />
          </div>
        ) : (
          <div>
            {!editedPhoto ? (
              <>
                <div className="headline-text ">
                  تعرف على آيس كريمك المفضل جيل أيس بالإجابة على الأسئلة التالية
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <StepWizard
                    nav={<CustomNav />}
                    className="questions-steps"
                    transitions={{}}
                  >
                    {questionsComponents}
                  </StepWizard>
                </form>
              </>
            ) : (
              <div className="edited-photo">
                <p
                  className="text-helper big text-center"
                  style={{ direction: "rtl" }}
                >
                  أحسنت !
                  <br />
                  سيتم اعتماد المشاركة بعد التثبت منها
                </p>
                <img src={process.env.MIX_API_STORAGE + editedPhoto.edited} />
                <div
                  style={{
                    maxWidth: 250,
                    margin: "auto",
                  }}
                >
                  <ActionButton
                    text="شارك الصورة"
                    callback={handleShareButton}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Quizz };

const CustomNav = (props: any) => {
  const { nextStep, previousStep, currentStep, totalSteps } = props;
  return (
    <div className="custom-nav">
      {currentStep === 4 ? (
        <ActionButton
          text={"النتيجة"}
          isSubmit
          callback={() => console.log("submit")}
        />
      ) : (
        <ActionButton text={"السؤال التالي"} callback={nextStep} />
      )}
      <p onClick={previousStep}>رجوع {">"}</p>
    </div>
  );
};

const OneQuestion = (props: any) => {
  const { question, register } = props;
  return (
    <>
      <div className="question-container">{question.question}</div>
      <div className="responses-list">
        {question.answers.map((_answer: any, key: number) => (
          <div className="radio-item" key={key}>
            <input
              {...register(`question-${question.id}`)}
              type="radio"
              className="radio-btn-item"
              id={`question-${question.id}-radio-${key}`}
              name={`question-${question.id}`}
              value={_answer.value}
            />
            <label
              htmlFor={`question-${question.id}-radio-${key}`}
              className="label-radio"
            >
              <img src={process.env.MIX_QUESTIONS_URL + _answer.gif} alt="" />
              <div className="title">الإجابة {_answer.value}</div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
