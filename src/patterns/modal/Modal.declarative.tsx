import { on } from "events";
import React, { useEffect, useRef } from "react";
// package.json 이 없으면 의존성이 설정되지 않아서 빨간줄이 발생하는것임

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // 왜 useRef를 쓴거지?
  // useRef는 React에서 DOM 요소나 값에 대한 참조를 유지하는 데 사용되는 훅이야.
  // 여기서는 dialogRef를 사용해서 <dialog> 요소에 접근하고, 그 상태를 제어하기 위해 사용되고 있어.
  // state를 사용하지 않고 useRef를 사용하는 이유는 무엇일까?
  // state는 컴포넌트가 다시 렌더링될 때마다 값이 초기화될 수 있지만, useRef는 컴포넌트의 생애주기 동안 동일한 참조를 유지하기 때문이야.
  // 따라서 dialog 요소에 대한 직접적인 접근이 필요할 때 useRef가 더 적합해.

  useEffect(() => {
    if (!dialogRef.current) return;

    if (open) {
      dialogRef.current.style.display = "block";
    } else {
      dialogRef.current.style.display = "none";
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      className="modal-backdrop"
      style={{ display: open ? "block" : "none" }}
      onClick={handleBackdropClick}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const Example = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Declarative modal</h1>
        <p>Modal content goes here.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
};
