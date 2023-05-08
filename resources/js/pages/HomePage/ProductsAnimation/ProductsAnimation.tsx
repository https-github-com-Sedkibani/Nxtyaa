import React from "react";
//@ts-ignore
import X4 from "./X4.png";
//@ts-ignore
import X2D1 from "./X2D1.png";
//@ts-ignore
import JoyStick from "./joystick.png";
//@ts-ignore
import PS from "./ps.png";

//@ts-ignore
import OldPhone from "./old-phone.png";
//@ts-ignore
import NewPhone from "./new-phone.png";

//@ts-ignore
import Casette from "./casette.png";
//@ts-ignore
import Cask from "./cask.png";
//@ts-ignore
import X3D3 from "./X3D3.png";

//@ts-ignore
import X2D2 from "./X2D2.png";

import gsap from "gsap";

import "./ProductsAnimation.scss";

const ProductsAnimation = () => {
  React.useEffect(() => {
    const interval = setInterval(() => {}, 17000);
    playAnimation();
  }, []);

  function playAnimation() {
    let tl = gsap.timeline();
    tl.fromTo("#lan1-img1", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan1-img3", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan1-img2", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.to("#lan1-img2", { rotate: 1, x: 5, y: 5, yoyo: true, repeat: -1 });
    tl.to("#lan1-img1", { maskSize: 500, duration: 0.2 });
    tl.to("#lan1-img1", { rotate: 1, yoyo: true, y: 2, x: 7, repeat: -1 });
    tl.to("#lan1-img3", { maskSize: 500, duration: 0.2 });
    tl.to("#lan1-img3", { rotate: 1, yoyo: true, y: 7, x: 3, repeat: -1 });
    tl.to("#lan1-img2", { scale: 0, duration: 0.2, delay: 1 });
    tl.to("#lan1-img1", { scale: 0, duration: 0.2 });
    tl.to("#lan1-img3", { scale: 0, duration: 0.2 });

    tl.fromTo("#lan2-img1", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan2-img3", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan2-img2", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.to("#lan2-img2", { rotate: 1, x: 5, y: 5, yoyo: true, repeat: -1 });
    tl.to("#lan2-img1", { maskSize: 500, duration: 0.2 });
    tl.to("#lan2-img1", { rotate: 1, yoyo: true, y: 2, x: 7, repeat: -1 });
    tl.to("#lan2-img3", { maskSize: 500, duration: 0.2 });
    tl.to("#lan2-img3", { rotate: 1, yoyo: true, y: 7, x: 3, repeat: -1 });
    tl.to("#lan2-img2", { scale: 0, duration: 0.2, delay: 1 });
    tl.to("#lan2-img1", { scale: 0, duration: 0.2 });
    tl.to("#lan2-img3", { scale: 0, duration: 0.2 });

    tl.fromTo("#lan3-img1", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan3-img3", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan3-img2", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.to("#lan3-img2", { rotate: 1, x: 5, y: 5, yoyo: true, repeat: -1 });
    tl.to("#lan3-img1", { maskSize: 500, duration: 0.2 });
    tl.to("#lan3-img1", { rotate: 1, yoyo: true, y: 2, x: 7, repeat: -1 });
    tl.to("#lan3-img3", { maskSize: 500, duration: 0.2 });
    tl.to("#lan3-img3", { rotate: 1, yoyo: true, y: 7, x: 3, repeat: -1 });
    tl.to("#lan3-img2", { scale: 0, duration: 0.2, delay: 1 });
    tl.to("#lan3-img1", { scale: 0, duration: 0.2 });
    tl.to("#lan3-img3", { scale: 0, duration: 0.2 });

    tl.fromTo("#lan4-img1", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan4-img3", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.fromTo("#lan4-img2", { y: 1000 }, { y: 0, duration: 0.2 });
    tl.to("#lan4-img2", { rotate: 1, x: 5, y: 5, yoyo: true, repeat: -1 });
    tl.to("#lan4-img1", { maskSize: 500, duration: 0.2 });
    tl.to("#lan4-img1", { rotate: 1, yoyo: true, y: 2, x: 7, repeat: -1 });
    tl.to("#lan4-img3", { maskSize: 500, duration: 0.2 });
    tl.to("#lan4-img3", { rotate: 1, yoyo: true, y: 7, x: 3, repeat: -1 });
    tl.to("#lan4-img2", { scale: 0, duration: 0.2, delay: 1 });
    tl.to("#lan4-img1", { scale: 0, duration: 0.2 });
    tl.to("#lan4-img3", {
      scale: 0,
      duration: 0.2,
      onComplete: () => {
        tl.restart();
      },
    });
  }
  return (
    <div className="products-animation">
      {/* landing one */}
      <img id="lan1-img1" className="image1" src={JoyStick} />
      <img id="lan1-img2" className="product" src={X4} />
      <img id="lan1-img3" className="image2" src={PS} />
      {/* landing one */}

      {/* landing two */}
      <img id="lan2-img1" className="image1 smaller" src={OldPhone} />
      <img id="lan2-img2" className="product corno" src={X2D1} />
      <img id="lan2-img3" className="image2 bigger" src={NewPhone} />
      {/* landing two */}

      {/* landing three */}
      <img id="lan3-img1" className="image1 casette" src={Casette} />
      <img id="lan3-img2" className="product" src={X3D3} />
      <img id="lan3-img3" className="image2 bigger" src={Cask} />
      {/* landing three */}

      {/* landing four */}
      <img id="lan4-img1" className="image1 smaller" src={OldPhone} />
      <img id="lan4-img2" className="product corno" src={X2D2} />
      <img id="lan4-img3" className="image2 bigger" src={NewPhone} />
      {/* landing two */}
      {/* landing four */}
    </div>
  );
};

export default ProductsAnimation;
