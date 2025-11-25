//export function Modal() { vs const Modal = () => {
//둘 차이가 어떤거지?
//두 가지 방식 모두 React 컴포넌트를 정의하는 방법이야.
//첫 번째 방식은 함수 선언문을 사용한 것이고, 두 번째 방식은 화살표 함수를 사용한 거지.
//함수 선언문은 호이스팅(hoisting)의 영향을 받아 컴포넌트가 정의되기 전에 호출될 수 있어.
//반면에 화살표 함수는 변수에 할당되기 때문에 호이스팅되지 않아.
//그래서 컴포넌트를 정의하기 전에 호출하려고 하면 오류가 발생하지.
//또한, 화살표 함수는 this 바인딩이 없기 때문에 클래스 컴포넌트에서 this를 사용할 때와는 다르게 동작해.
//하지만 함수형 컴포넌트에서는 this를 사용하지 않기 때문에 큰 차이는 없어.
//결론적으로, 두 방식 모두 유효하며, 팀의 코딩 스타일이나 개인 취향에 따라 선택할 수 있어.

import { useState } from "react";
import { createRoot } from "react-dom";

//현업은 주로 어떤 방식을 쓰지?
//현업에서는 팀의 코딩 스타일 가이드에 따라 다르지만, 최근에는 화살표 함수를 사용하는 경우가 더 많아지고 있어.
//화살표 함수는 간결하고, 특히 콜백 함수나 고차 함수에서 자주 사용되기 때문에 선호되는 경향이 있어.

// 근데 함수형은 마지막에 export 를 써야하잖아
//맞아, 함수형 컴포넌트를 정의한 후에 export 키워드를 사용해서 내보내야 해.
// 그럼 귀찮으니까 export function Modal() {} 이렇게 쓰는게 낫지 않나?
//그럴 수도 있지만, 일관성을 유지하는 것이 중요해.
//특히 팀 프로젝트에서는 모든 컴포넌트를 동일한 방식으로 정의하는 것이 가독성과 유지보수에 도움이 돼.
//따라서 팀의 코딩 스타일 가이드에 따라 결정하는 것이 좋아.

interface ModalOptions {
  title?: string;
  content: React.ReactNode;
}

interface ModalComponentProps {
  options: ModalOptions;
  onResolve: (value: boolean) => void;
}
const ModalComponent = ({ options, onResolve }: ModalComponentProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (value: boolean) => {
    setIsOpen(false);
    setTimeout(() => {
      onResolve(value);
      // 애니메이션을 위한 지연
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {options.title && <h2>{options.title}</h2>}
        <div>{options.content}</div>
        <button onClick={() => handleClose(true)}>Confirm</button>
        <button onClick={() => handleClose(false)}>Cancel</button>
      </div>
    </div>
  );
};

export const modal = (options: ModalOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    //컨테이너 생성
    const container = document.createElement("div");
    document.body.appendChild(container);

    // resolve 작업을 왜 하지?
    //createRoot는 뭐하는애야?
    // React 18부터는 createRoot를 사용해서 루트를 생성하고, 그 루트에 컴포넌트를 렌더링해야 해.
    const root = createRoot(container);

    const handleResolve = (value: boolean) => {
      //정리 작업
      root.unmount();
      document.body.removeChild(container);
      resolve(value);
    };
    // 원래 promise안에서 resolve랑 렌더링도 같이 할 수 있어?
    // 물론이지, Promise 내부에서 비동기 작업이 완료된 후에 resolve를 호출할 수 있어.
    // 여기서 비동기 작업은 뭐야?
    //비동기 작업은 사용자가 모달에서 선택을 완료할 때까지 기다리는 것을 의미해.
    //사용자가 Confirm 또는 Cancel 버튼을 클릭하면 handleResolve가 호출되고, 그때 Promise가 해결돼.

    root.render(<ModalComponent options={options} onResolve={handleResolve} />);
  });
};

const Example = async () => {
  const handleClick = async () => {
    const result = await modal({
      title: "확인",
      content: "정말로 삭제하시겠습니까?",
    });
    if (result) {
      console.log("삭제 완료");
    }
  };

  return <button onClick={handleClick}>모달 열기</button>;
};
