import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuIcon } from "../svg/MenuIcon";
import { Motion, spring } from "react-motion";
import "./styles.scss";
export type IDrawerProps = {};

const Drawer: React.FC<IDrawerProps> = ({}) => {
  const history = useHistory();
  const [opened, setOpened] = React.useState(false);

  const toggle = React.useCallback(() => {
    setOpened((old) => !old);
  }, []);
  return (
    <>
      <Motion style={{ x: spring(opened ? 100 : 0) }}>
        {({ x }) => (
          <div
            className="drawer-container"
            style={{
              WebkitTransform: `translate3d(${-x}%, 0, 0)`,
              transform: `translate3d(${-x}%, 0, 0)`,
            }}
          >
            <Link
              to="/gifts"
              className="stepper-link"
              style={{
                fontWeight:
                  history.location.pathname === "/gifts" ? "bold" : "normal",
              }}
            >
              جوائز المسابقة
            </Link>
            <Link
              to="/upload"
              className="stepper-link"
              style={{
                fontWeight:
                  history.location.pathname === "/upload" ? "bold" : "normal",
              }}
            >
              شارك و اربح
            </Link>
            <Link
              to="/photos"
              className="stepper-link"
              style={{
                fontWeight:
                  history.location.pathname === "/photos" ? "bold" : "normal",
              }}
            >
              صور المشاركين
            </Link>
          </div>
        )}
      </Motion>

      <button onClick={toggle} className="menu-burger-btn">
        <MenuIcon />
      </button>
    </>
  );
};

export { Drawer };
