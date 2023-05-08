import * as React from "react";

import "./ActionButton.scss";

interface IActionButton {
  text: string;
  callback?: any;
  isSubmit?: boolean;
  isButton?: boolean;
}

const ActionButton: React.FunctionComponent<IActionButton> = (
  props: IActionButton
) => {
  const { text, callback, isSubmit } = props;
  return (
    <>
      {!isSubmit ? (
        <div
          className="action-btn"
          onClick={() => {
            if (callback) {
              callback();
              return void 0;
            }
            return void 0;
          }}
        >
          {text}
        </div>
      ) : (
        <button
          className="action-btn"
          type="submit"
          onClick={() => {
            if (callback) {
              callback();
              return void 0;
            }
            return void 0;
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default ActionButton;
