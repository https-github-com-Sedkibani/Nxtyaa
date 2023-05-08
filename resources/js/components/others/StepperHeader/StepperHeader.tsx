import * as React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./StepperHeader.scss";

interface IStepperHeader {}

const StepperHeader: React.FunctionComponent<IStepperHeader> = (
  props: IStepperHeader
) => {
  const history = useHistory();

  return (
    <div className="stepper-header">
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
  );
};

export default StepperHeader;
