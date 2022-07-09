import { memo, FC, CSSProperties, useEffect } from "react";
import { createPortal } from "react-dom";
import FocusTrap, { Props } from "focus-trap-react";

const modalContainer = document.createElement("div");
const root = document.getElementById("root");

modalContainer.id = "modal_container";

const baseStyle: CSSProperties = {
  position: "fixed",
  left: "50%",
  top: "50%",
  zIndex: 222,
  transform: "translate(-50%,-50%)",
};

const focusTrapProps = (returnFocus: HTMLElement | undefined): Props => {
  if (returnFocus) {
    return { focusTrapOptions: { setReturnFocus: returnFocus } };
  }

  return {};
};

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  returnFocus?: HTMLElement;
  HTMLProps?: React.HTMLProps<HTMLDivElement>;
}

export const Modal: FC<IModalProps> = memo(
  ({ children, isOpen, HTMLProps, returnFocus }) => {
    useEffect(() => {
      if (!document.getElementById(modalContainer.id)) {
        document.body.appendChild(modalContainer);
      }
    }, []);

    if (isOpen) {
      if (root) root.setAttribute("aria-hidden", "true");

      return createPortal(
        <FocusTrap {...focusTrapProps(returnFocus)}>
          <div role="dialog" style={baseStyle} {...HTMLProps}>
            {children}
          </div>
        </FocusTrap>,
        modalContainer
      );
    } else {
      if (root) root.setAttribute("aria-hidden", "false");
      return null;
    }
  }
);
