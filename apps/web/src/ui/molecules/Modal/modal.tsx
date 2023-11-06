import { FocusScope } from "@react-aria/focus";
import { DismissButton, OverlayContainer } from "@react-aria/overlays";
import { Children, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { Content } from "./content";
import { ModalProvider } from "./context";
import * as S from "./styles";
import { ModalBaseComponent } from "./types";
import * as T from "./types";
import { useModal } from "./useModal";

const Modal: T.ModalComponent = ({
  children,
  bgStyle,
  border,
  isFull,
  isBlur,
  placement = "start right",
  isFullWidth,
  isFullHeight,
  ...props
}) => {
  const context = useModal(props);
  const [Header, Body, Footer] = Children.toArray(children);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  return (
    <ModalProvider value={context}>
      <CSSTransition
        key={S.Overlay.toString()}
        in={context.state.isOpen}
        timeout={120}
        unmountOnExit
        onEnter={context.state.open}
        onExited={context.state.close}
        nodeRef={overlayRef}
      >
        <OverlayContainer>
          <Content>
            <FocusScope contain restoreFocus autoFocus>
              <S.Overlay
                isBlur={isBlur}
                placement={placement}
                isFull={isFull}
                ref={overlayRef}
                {...context.underlayProps}
              >
                <S.Container
                  bgStyle={bgStyle}
                  border={border}
                  isFull={isFull}
                  isFullWidth={isFullWidth}
                  isFullHeight={isFullHeight}
                  {...context.dialogProps}
                  ref={context.modalRef}
                >
                  {Header}
                  {Footer}
                  {Body}
                </S.Container>
              </S.Overlay>
              {context.isDismissable && (
                <DismissButton onDismiss={context.onClose} />
              )}
            </FocusScope>
          </Content>
        </OverlayContainer>
      </CSSTransition>
    </ModalProvider>
  );
};

export default Modal as ModalBaseComponent;