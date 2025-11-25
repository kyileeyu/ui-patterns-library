import { useCallback, useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  //TODO: 여기다 모달을 왜 넣지?
  const Modal: React.FC<{ children: React.ReactNode }> = useCallback(
    ({ children }) => {
      if (!isOpen) return null;
      return (
        <div className="modal-backdrop">
          <div className="modal-content">
            {children}
            <button onClick={close}>Close</button>
          </div>
        </div>
      );
    },
    [isOpen, close]
  );

  return {
    isOpen,
    open,
    close,
    toggle,
    Modal,
  };
};

export const HookExample = () => {
  const { isOpen, open, close, Modal } = useModal();

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      <Modal>
        <h1>This is a modal</h1>
        <button onClick={close}>Close Modal</button>
      </Modal>
    </div>
  );
};
