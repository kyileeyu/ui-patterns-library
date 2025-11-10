import { Modal } from "@ui-patterns/core";
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const modalRef = useRef<Modal | null>(null);
  //왜 useRef를 쓴거지?
  //useRef는 컴포넌트가 다시 렌더링 되어도 값이 유지되도록 해줘.
  //모달 인스턴스를 저장하는 데 적합하지.
  // 값이 유지된다는게 리렌더링이 안되게 해준다는거지? 인스턴스는 클래스라는 뼈대의 한 벌이라는 뜻이고?
  //맞아, 리렌더링이 되어도 modalRef.current에 저장된 Modal 인스턴스는 그대로 남아있어.
  // ref는 클래스야? current라는 메소드가 있는거야?
  //ref는 객체야. current는 그 객체의 속성으로, 우리가 저장한 값을 가리켜.
  //그래서 modalRef.current를 통해 Modal 인스턴스에 접근할 수 있는 거지.
  // 이 개념이 헷갈린다면 어떤 키워드를 더 공부해야해?
  //리액트 훅스와 참조에 대해 더 공부해보는 게 좋아.
  // 오케

  const dialogRef = useRef<HTMLDivElement | null>(null);
  //이건 또 뭐지?
  //이 ref는 모달의 실제 HTML 요소를 가리키기 위해 사용돼.
  //모달을 생성할 때 이 요소를 Modal 클래스에 전달할 거야.
  // 컴포넌트를 리렌더링 안되는 state로 관리하는 느낌인가?
  //맞아, 이 ref도 리렌더링이 되어도 값이 유지돼서 모달 요소에 계속 접근할 수 있어.

  useEffect(() => {
    if (dialogRef.current) {
      modalRef.current = new Modal(dialogRef.current);
      // dialogRef의 current가 없다면, 새로운 모달 인스턴스를 생성해서 그 안에 null을 넣는거야??
      // 맞아, dialogRef.current가 null이라면, 새로운 Modal 인스턴스를 생성할 때 null을 전달하게 될 거야.
      //근데 그걸 다시 modalRef.current에 저장하는 이유가 뭐야?
      //모달 인스턴스를 modalRef.current에 저장해서 나중에 이 인스턴스의 메서드들(open, close 등)을 사용할 수 있도록 하기 위해서야.
      //아하! 이제 알겠어!
    }
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Modal Test v1 - 최소 버전</h1>

      <button onClick={() => modalRef.current?.open()}>Open Modal</button>
      {/* 신기하다! 그니까 ref에 객체를 넣고 객체의 메서드를 실행할 수 도 있구나! */}
      {/* dialogRef.current를 통해 모달의 HTML 요소에 접근할 수 있겠네! */}

      <div ref={dialogRef} className="modal">
        {/* 이 div의 ref는 무슨역할이야? */}
        {/* 이 ref를 통해 모달의 HTML 요소에 접근할 수 있어. */}
        {/* ref라는 속성이 이 div의 DOM 요소를 가리키게 해줘. */}
        {/* 아 이렇게 등록하는거야? */}

        <div className="modal-content">
          <h2>Hello Modal!</h2>
          <p>이것이 가장 단순한 모달입니다.</p>
          <button onClick={() => modalRef.current?.close()}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default App;
