import * as React from "react";
import StepperHeader from "../../components/others/StepperHeader/StepperHeader";
import AuthServices from "../../redux/actions/auth-actions/services";
import ReactPaginate from "react-paginate";
import gsap from "gsap";
//@ts-ignore
import logoBrand from "../../../assets/img/logo-arab.png";
//@ts-ignore
import logoGame from "../../../assets/img/logo-game.png";
//@ts-ignore

import ModalImage from "react-modal-image";
//@ts-ignore
import music1 from "../../../assets/img/icons/music1.png";

//@ts-ignore
import music2 from "../../../assets/img/icons/music2.png";
//@ts-ignore
import heart from "../../../assets/img/icons/heart.png";
//@ts-ignore
import whatsapp from "../../../assets/img/icons/whatsapp.png";
import "./PhotosPage.scss";
import { Footer } from "../../components/footer/Footer";
import OrderByFilter from "./OrderByFilter";
import OrderByMyPhotos from "./OrderByMyPhotos";
import { Drawer } from "../../components/drawer/Drawer";

interface IPhotosPage {}

const PhotosPage: React.FunctionComponent<IPhotosPage> = (
  props: IPhotosPage
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(0);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [ordered, setOrdered] = React.useState<string>("desc");
  const [isMyPhotos, setIsMyPhotos] = React.useState<boolean>(false);

  function handlePageChange(selected: number) {
    setLoading(true);
    setPage(selected);
    AuthServices.getPhotosRequest(selected, ordered, isMyPhotos)
      .then((r: any) => {
        setTotal(r.data.total);
        setPhotos(r.data.data);
        setPageCount(r.data.last_page);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  React.useEffect(() => {
    handlePageChange(page);
  }, [ordered, isMyPhotos]);

  React.useEffect(() => {
    gsap.fromTo(
      ".stepper-header",
      { y: -40, opacity: 0 },
      { y: 0, duration: 1, opacity: 1 }
    );

    gsap.fromTo(
      "#whatsapp26",
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
      "#music226",
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
      "#heart66",
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
    <div className="photos-page page">
      <img src={logoBrand} className="logo-brand" />
      <Drawer />
      <div className="logo-containerx">
        <a href={"/"}>
          <img src={logoGame} className="logo-gamex" alt="" />
        </a>
      </div>
      <img src={music1} id="music12" alt="" />
      <img src={music2} id={"music226"} alt="" />
      <img src={heart} id={"heart66"} alt="" />
      <img src={whatsapp} id={"whatsapp26"} alt="" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="card-bg-wrapper">
          <StepperHeader />
          <div className="card-bg-container">
            <div className="order">
              <OrderByMyPhotos setIsMyPhotos={setIsMyPhotos} />
              <OrderByFilter setOrdered={setOrdered} />
            </div>
            <div className="photos">
              {photos.map((_photo: any) => (
                <PhotoCard key={_photo.id} photo={_photo} />
              ))}
            </div>
            <ReactPaginate
              previousLabel={"الصفحة السابقة"}
              nextLabel={"الصفحة  الموالية"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              forcePage={page - 1}
              pageRangeDisplayed={1}
              onPageChange={({ selected }: any) => {
                handlePageChange(selected + 1);
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PhotosPage;

const PhotoCard = ({ photo }: any) => {
  return (
    <ModalImage
      small={process.env.MIX_API_STORAGE + photo.edited}
      large={process.env.MIX_API_STORAGE + photo.edited}
      alt=""
    />
  );
};
