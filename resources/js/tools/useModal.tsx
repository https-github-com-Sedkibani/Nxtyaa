import disableScroll from "disable-scroll";
import React, { useCallback, useState, useMemo } from "react";
import { createPortal } from "react-dom";

const wrapperStyle: any = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const maskStyle: any = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100000,
};

const containerStyle: any = {
  position: "relative",
  zIndex: 100001,
};

const Modal = ({
  children,
  isOpen = false,
  close,
  elementId = "root",
}: any) => {
  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div style={wrapperStyle}>
      <div style={maskStyle} onClick={close} />
      <div style={containerStyle}>{children}</div>
    </div>,
    // @ts-ignore
    document.getElementById(elementId)
  );
};

const useModal = (elementId = "root", options: any = {}) => {
  const { preventScroll = false } = options;
  const [isOpen, setOpen] = useState(false);
  const open:any = useCallback(() => {
    setOpen(true);
    if (preventScroll) {
      disableScroll.on();
    }
  }, [setOpen, preventScroll]);
  const close = useCallback(() => {
    setOpen(false);
    if (preventScroll) {
      disableScroll.off();
    }
  }, [setOpen, preventScroll]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal isOpen={isOpen} close={close} elementId={elementId}>
          {children}
        </Modal>
      );
    },
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};

export default useModal;
