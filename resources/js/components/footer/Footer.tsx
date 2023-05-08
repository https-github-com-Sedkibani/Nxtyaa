import React from "react";
import { Link } from "react-router-dom";
export type IFooterProps = {};
import "./footer.scss";

const Footer: React.FC<IFooterProps> = ({}) => {
  return (
    <div className="footer-container">
      <Link className="f-link" to="/photos">
        صور المشاركين
      </Link>

      <Link className="f-link spacer-t" to="/privacy-policy">
        قانون المسابقة
      </Link>

      {/* <div className="spacer-t">/</div> */}
      {/* <a href="/rules.pdf" target="_blank" className="f-link">
        قانون المسابقة
      </a> */}
    </div>
  );
};

export { Footer };
