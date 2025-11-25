import { createContext, useCallback, useContext, useState } from "react";

interface ModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    // TODO: 왜 에러를 throw 하지?, 이 에러는 컴파일때 보이나?, 런타임때 보이면 throw할 필요가 있나?
    //
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

interface ModalRootProps {
  children: React.ReactNode;
  // TODO: ReactNode, ReactElement , React.FC 차이점은?
}

const ModalRoot: React.FC<ModalRootProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalButtonProps {
  children: React.ReactNode;
}

export const ModalButton: React.FC<ModalButtonProps> = ({ children }) => {
  const { open } = useModalContext();
  return <button onClick={open}>{children}</button>;
};

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
    // close 를 함수로 따로 분리하지 않아도 되나?
    // 
  const { isOpen, close } = useModalContext();
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};
// Modal.Root 가 객체구나?

export const Modal = {
  Root: ModalRoot,
  Button: ModalButton,
  Content: ModalContent,
};

export const HeadlessExample = () => {
  return (
    // TODO: <Modal> 로 표시하고 싶은데 
    // Modal.Button이 Root 안에 있는게 맞나? 모달 자체는 버튼과 떨어져 있지 않나?
    
    <Modal.Root>
      <Modal.Button>Open Modal</Modal.Button>

      <Modal.Content>
        <h1>This is a modal</h1>
      </Modal.Content>
    </Modal.Root>
  );
};
