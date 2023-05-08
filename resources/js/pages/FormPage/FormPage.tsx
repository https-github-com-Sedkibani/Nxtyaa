import * as React from "react";
import { Controller, useForm } from "react-hook-form";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
//@ts-ignore
import logoBrand from "../../../assets/img/logo-arab.png";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/actions/auth-actions/actions";
import { cities } from "./cities";
import ContainerImg from "../../components/ContainerImg/ContainerImg";

import "./FormPage.scss";
import ActionButton from "../../components/ActionButton/ActionButton";

interface IFormPage {}

const FormPage: React.FunctionComponent<IFormPage> = (props: IFormPage) => {
  const { register, handleSubmit, control, setValue } = useForm();

  const dispatch = useDispatch();

  const { authErrors, fbUser, user, isLoggedIn } = useSelector(
    (state: any) => state.authReducer
  );

  React.useEffect(() => {
    if (isLoggedIn && user && user.email) {
      setValue("email", user.email);
    }
  }, [isLoggedIn]);

  function onSubmit(data: any) {
    if (data.zone && data.zone.value) {
      dispatch(
        connect({
          ...data,
          ...(data.zone && data.zone.value ? { zone: data.zone.value } : {}),
          ...(fbUser && fbUser.id ? { facebook_id: fbUser.id } : {}),
          ...(fbUser && fbUser.avatar ? { avatar: fbUser.avatar } : {}),
        })
      );
    }
  }

  const options = cities.map((item) => {
    return { value: item, label: item };
  });
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: 60,
      background: "#d7ecff",
      fontWeight: "500",
      padding: "0 2rem",
      border: "3px solid #490093",
      height: "4rem",
      paddingBottom: "1rem",
      "@media (max-width:991px)": {
        marginBottom: "2rem",
      },
      "@media (min-width:992px)": {
        height: "7rem",
        border: "4px solid #490093",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "4rem",
      justifyContent: "center",
      fontWeight: "500",
      paddingBottom: "1rem",
      "@media (min-width:992px)": {
        height: "7rem",
        paddingBottom: "1rem",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#490093",
      fontSize: "1.2rem",
      textAlign: "center",
      paddingBottom: "1rem",
      fontWeight: "500",
      "@media (min-width:992px)": {
        fontSize: "2rem",
        paddingBottom: "1rem",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#490093",
      fontWeight: "500",
      fontSize: "1.2rem",
      textAlign: "center",
      paddingBottom: "1rem",
      "@media (min-width:992px)": {
        fontSize: "2rem",
      },
    }),

    option: (provided: any) => ({
      ...provided,
      color: "#490093",

      fontWeight: "500",
      fontSize: "1.2rem",
      textAlign: "center",
      "@media (min-width:992px)": {
        fontSize: "2rem",
      },
    }),
  };

  return (
    <div className="form-page page">
      <img src={logoBrand} className="logo-brand" />
      <div className="logo-container">
        <a href={"/"}>
          <img src={logoGame} className="logo-game" alt="" />
        </a>
      </div>
      <ContainerImg>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              defaultValue={fbUser ? fbUser.email : ""}
              placeholder="البريد الالكتروني"
              {...register("email")}
            />
            {authErrors["email"] && (
              <div className="error">{authErrors["email"]}</div>
            )}
          </div>
          <div>
            <input
              defaultValue={fbUser ? fbUser.name : ""}
              placeholder="اﻹسم و اللقب"
              {...register("name")}
            />
            {authErrors["name"] && (
              <div className="error">{authErrors["name"]}</div>
            )}
          </div>
          <div>
            <Controller
              name="zone"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  menuPortalTarget={document.body}
                  placeholder="المدينة"
                  name="zone"
                  isSearchable={false}
                  styles={customStyles}
                  options={options}
                />
              )}
            />
            {authErrors["zone"] && (
              <div className="error">{authErrors["zone"]}</div>
            )}
          </div>

          <div>
            <input placeholder="رقم الهاتف" {...register("phone")} />
            {authErrors["phone"] && (
              <div className="error">{authErrors["phone"]}</div>
            )}
          </div>

          <div className="container-btn-submit">
            <ActionButton text={"إنهاء التسجيل"} isSubmit />
          </div>
        </form>
      </ContainerImg>
    </div>
  );
};

export default FormPage;
