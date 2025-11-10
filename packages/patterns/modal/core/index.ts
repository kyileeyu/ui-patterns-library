export class Modal {
  // 모달을 만들려면 어떤 속성들이 필요할까?
  // 열고 닫힘 ,열 버튼, 펼쳐질 모달 그 자체
  private element: HTMLElement;
  // private은 뭐지?
  // private은 클래스 내부에서만 접근할 수 있는 속성을 의미해.
  // element는 모달의 HTML 요소를 가리키는 속성이야.
  private isOpen: boolean = false;
  // 이렇게 기본값을 넣을수도 있구나

  constructor(element: HTMLElement) {
    // element를 받는구나! 왜 받지?
    // 모달을 생성할 때, 어떤 HTML 요소를 모달로 사용할지 지정하기 위해서야.
    // 이 모달은 열려지는 그 요소인거지?
    // 맞아, 그래서 이 요소를 this.element에 저장하는 거야.
    this.element = element;
    this.element.style.display = "none";
  }

  open() {
    this.element.style.display = "block";
    this.isOpen = true;
  }

  close() {
    this.element.style.display = "none";
    this.isOpen = false;
  }
  // 또 필요한게 있나?
  toggle() {
    //왜 toggle이 필요하지?
    //모달을 열고 닫는 기능을 하나의 메서드로 처리하고 싶을 때 유용해.
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
