import * as React from "react";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
//@ts-ignore
import logoBrand from "../../../assets/img/logo-arab.png";

// @ts-ignore
import Photo from "../../img/photo.png";

import axios from "axios";
import { Footer } from "../../components/footer/Footer";
import GlaceSelector from "./GlaceSelector";

import ContainerImg from "../../components/ContainerImg/ContainerImg";
import ActionButton from "../../components/ActionButton/ActionButton";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import "./UploadPage.scss";
import { Drawer } from "../../components/drawer/Drawer";

interface IUploadPage {}

const UploadPage: React.FunctionComponent<IUploadPage> = (
  props: IUploadPage
) => {
  const history = useHistory();
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [product, setProduct] = React.useState<any>(null);
  const [base64, setBase64] = React.useState<string>("");
  const [percentage, setPercentage] = React.useState<number>(0);
  const [done, setDone] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [photoURL, setPhotoURL] = React.useState<string>("");
  const alert = useAlert();

  const handleFile = React.useCallback((e: any) => {
    setPhoto(e.target.files[0]);
  }, []);

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve("data:image/png;base64, " + encoded);
      };
      reader.onerror = (error: any) => reject(error);
    });
  }

  function handleShareButton(e: any) {
    // @ts-ignore
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: process.env.MIX_API_STORAGE + photoURL,
      },
      function () {
        // void 0;
      }
    );
  }

  React.useEffect(() => {
    (async () => {
      if (photo) {
        if (!product) {
          alert.error("يرجى إختيار الصورة و نوع المنتج");
        } else {
          setSuccess(false);
          const _base64: any = await getBase64(photo);
          setBase64(_base64);
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: function (progressEvent: any) {
              let percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setPercentage(percentCompleted);
            },
          };
          const formData = new FormData();
          formData.append("photo", photo);
          formData.append("product", product.value);
          axios
            .post("/api/photo", formData, config)
            .then((r: any) => {
              setPhotoURL(r.data.path);
              setDone(true);
              setSuccess(true);
            })
            .catch(() => setDone(true));
        }
      }
    })();
  }, [photo]);

  React.useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      let ua = navigator.userAgent || navigator.vendor;
      if (
        ua.indexOf("FBAN") > -1 ||
        ua.indexOf("FBAV") > -1 ||
        ua.indexOf("Instagram") > -1
      ) {
        if (document.querySelector("input[accept]") !== null) {
          document.querySelectorAll("input[accept]").forEach((el) => {
            el.removeAttribute("accept");
          });
        }
      }
    });
  }, []);
  return (
    <div className="upload-page page">
      <img src={logoBrand} className="logo-brand" />
      <Drawer />
      <div className="logo-container">
        <a href={"/"}>
          <img src={logoGame} className="logo-game" alt="" />
        </a>
      </div>
      <ContainerImg>
        {!done && !success ? (
          <p className="text-helper big">صور جيل آيس ثم أجب على الأسئلة</p>
        ) : (
          <p className="text-helper big text-center">
            تم تحميل صورتك سيتم التثبت منها
            <br />و إعتماد المشاركة بعد الاجابة على الأسئلة
          </p>
        )}

        {base64.length > 0 ? (
          <>
            {done ? (
              <img
                className="img-placeholder"
                src={process.env.MIX_API_STORAGE + photoURL}
              />
            ) : (
              <img className="img-placeholder" src={base64} />
            )}
          </>
        ) : (
          <img src={Photo} className="img-placeholder" />
        )}

        {!done && !success && base64.length > 0 && (
          <div className="loading-bar">
            <span
              style={{
                width: percentage + "%",
              }}
            />
          </div>
        )}
        {!done && !success && (
          <div className="glace-picker">
            <GlaceSelector setProduct={setProduct} />
            <p>1/ إختر نوع جيل آيس الموجود في صورتك</p>
          </div>
        )}
        {!success ? (
          <div className="btn-with-text">
            {/* <label htmlFor="photo-upload" onClick={() => void 0}>
            <label htmlFor="photo-upload">
              <ActionButton
                text={"حمل صورتك"}
                callback={() => console.log("ok")}
              />
            </label>
            <p className="upload-text">2/ الآن إضغط على الزر لتحمل صورتك</p> */}
          </div>
        ) : (
          <ActionButton
            text={"أجب على الأسئلة"}
            callback={() => {
              window.location.pathname = "/quizz";
            }}
          />
        )}
        <input
          onChange={(e) => handleFile(e)}
          id="photo-upload"
          type="file"
          accept="image/*"
        />
      </ContainerImg>
      <Footer />
    </div>
  );
};

export default UploadPage;
