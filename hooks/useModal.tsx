import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

interface IProps {
  children: React.ReactNode;
}

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, []);

  function ModalPortal({ children }: IProps) {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div
            className="modal-background"
            onClick={closeModal}
            role="presentation"
          />
          {children}
        </Container>,
        ref.current
      );
    }
    return null;
  }

  return {
    ModalPortal,
    openModal,
    closeModal,
  };
};

export default useModal;
