# Modal 진화 계획: 최소 → 완성

> 작은 것부터 시작해서 점진적으로 기능을 추가하며 배우기

**목표:** 문제를 직접 경험하고, 필요성을 느끼며 기능을 추가한다.

---

## 📍 현재 위치: v1 - 최소 모달 ✅

### 구현된 기능
```typescript
class Modal {
  private element: HTMLElement
  private isOpen: boolean = false

  constructor(element: HTMLElement)
  open()
  close()
  toggle()
}
```

### 동작하는 것
- ✅ 모달 열기/닫기
- ✅ 기본 display 제어

### 🐛 발견된 문제들
직접 사용해보면서 다음 문제들을 경험하세요:

1. **배경 스크롤 문제**
   - 모달이 열려있을 때 배경을 스크롤할 수 있음
   - 긴 페이지에서 테스트해보세요
   - 👉 다음: v2에서 해결

2. **키보드로 닫을 수 없음**
   - ESC 키가 동작하지 않음
   - 마우스 없이 사용 불가
   - 👉 다음: v2에서 해결

3. **배경 클릭해도 안 닫힘**
   - UX가 불편함
   - 👉 다음: v2에서 해결

4. **탭 키로 배경 버튼 클릭 가능**
   - 포커스가 모달 밖으로 나감
   - 접근성 문제
   - 👉 다음: v3에서 해결

5. **스크린 리더가 모달인지 모름**
   - 접근성 문제
   - 👉 다음: v3에서 해결

---

## 🎯 v2: UX 개선 (내일 진행 예정)

### 해결할 문제
- ❌ 배경 스크롤됨
- ❌ ESC로 못 닫음
- ❌ 배경 클릭해도 안 닫힘

### 추가할 기능

#### 1. ScrollLock (30분)
```typescript
// 배경 스크롤 막기
open() {
  document.body.style.overflow = 'hidden'
  // 스크롤바 너비만큼 padding 추가 (layout shift 방지)
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  this.element.style.display = 'block'
  this.isOpen = true
}

close() {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  this.element.style.display = 'none'
  this.isOpen = false
}
```

**배울 점:**
- `window.innerWidth - document.documentElement.clientWidth`로 스크롤바 너비 계산
- Layout shift 방지 테크닉

#### 2. ESC 키 닫기 (20분)
```typescript
constructor(element: HTMLElement) {
  this.element = element
  this.element.style.display = 'none'

  // 키보드 이벤트 리스너 추가
  document.addEventListener('keydown', this.handleEscape)
}

private handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && this.isOpen) {
    this.close()
  }
}

// 메모리 누수 방지
destroy() {
  document.removeEventListener('keydown', this.handleEscape)
  if (this.isOpen) this.close()
}
```

**배울 점:**
- 이벤트 리스너 등록/해제
- 메모리 누수 방지 (`destroy`)
- Arrow function으로 `this` 바인딩

#### 3. 배경 클릭 닫기 (30분)
```typescript
// DOM 구조 변경 필요
createElements() {
  // Backdrop 생성
  this.backdropElement = document.createElement('div')
  this.backdropElement.className = 'modal-backdrop'
  this.backdropElement.addEventListener('click', () => this.close())

  // Container 생성
  this.containerElement = document.createElement('div')
  this.containerElement.className = 'modal-container'

  // Content는 기존 element 사용
  this.containerElement.appendChild(this.element)

  document.body.appendChild(this.backdropElement)
  document.body.appendChild(this.containerElement)
}
```

**배울 점:**
- 동적 DOM 생성
- Backdrop 패턴
- Event delegation

### v2 완료 후 상태
```
✅ 배경 스크롤 막힘
✅ ESC로 닫을 수 있음
✅ 배경 클릭하면 닫힘
❌ 포커스 여전히 밖으로 나감
❌ 스크린 리더 지원 없음
```

---

## 🎯 v3: 접근성 (3일차 진행 예정)

### 해결할 문제
- ❌ Tab 키로 배경 버튼 클릭 가능
- ❌ 스크린 리더가 모달인지 모름

### 추가할 기능

#### 1. Focus Trap (1시간)
```typescript
class FocusTrap {
  private container: HTMLElement
  private previousActiveElement: Element | null = null

  constructor(container: HTMLElement) {
    this.container = container
  }

  activate() {
    // 현재 포커스 저장
    this.previousActiveElement = document.activeElement

    // 포커스 가능한 요소 찾기
    const focusableElements = this.getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    // Tab 키 이벤트 리스너
    this.container.addEventListener('keydown', this.onKeyDown)
  }

  deactivate() {
    this.container.removeEventListener('keydown', this.onKeyDown)

    // 이전 포커스로 복원
    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus()
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusableElements = this.getFocusableElements()
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Shift+Tab: 첫 요소에서 마지막으로
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
      return
    }

    // Tab: 마지막 요소에서 첫 번째로
    if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',')

    return Array.from(
      this.container.querySelectorAll<HTMLElement>(selectors)
    ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0)
  }
}
```

**배울 점:**
- Focusable 요소 찾는 방법
- Tab 순환 로직
- `offsetWidth > 0`로 보이는 요소만 필터링

#### 2. ARIA 속성 (30분)
```typescript
class A11yHelper {
  static setModalAttributes(container: HTMLElement) {
    container.setAttribute('role', 'dialog')
    container.setAttribute('aria-modal', 'true')
    container.setAttribute('aria-labelledby', 'modal-title')
    container.setAttribute('aria-describedby', 'modal-description')
  }

  static hideFromScreenReaders(element: HTMLElement) {
    element.setAttribute('aria-hidden', 'true')
  }

  static generateId(prefix: string = 'modal'): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 11)}`
  }
}

// Modal에서 사용
constructor(element: HTMLElement) {
  this.element = element
  this.id = A11yHelper.generateId()
  A11yHelper.setModalAttributes(element)
}
```

**배울 점:**
- WAI-ARIA 역할과 속성
- `role="dialog"` vs `role="alertdialog"`
- `aria-labelledby`로 제목 연결

### v3 완료 후 상태
```
✅ 배경 스크롤 막힘
✅ ESC로 닫을 수 있음
✅ 배경 클릭하면 닫힘
✅ 포커스가 모달 안에 갇힘
✅ 스크린 리더 지원
❌ 여러 모달 동시 열기 불가
❌ 옵션 커스터마이징 불가
```

---

## 🎯 v4: 설정 가능하게 (4일차 진행 예정)

### 해결할 문제
- ❌ 모든 동작이 강제됨
- ❌ 커스터마이징 불가

### 추가할 기능

#### 1. Options 시스템 (1시간)
```typescript
interface ModalOptions {
  closeOnBackdropClick?: boolean  // 기본값: true
  closeOnEscape?: boolean         // 기본값: true
  lockScroll?: boolean            // 기본값: true
  trapFocus?: boolean             // 기본값: true
  initialFocus?: HTMLElement | string
  classNames?: {
    backdrop?: string
    container?: string
    content?: string
  }
}

class Modal {
  private options: Required<ModalOptions>

  constructor(element: HTMLElement, options: ModalOptions = {}) {
    this.element = element
    this.options = {
      closeOnBackdropClick: true,
      closeOnEscape: true,
      lockScroll: true,
      trapFocus: true,
      classNames: {},
      ...options  // 사용자 옵션으로 덮어쓰기
    } as Required<ModalOptions>
  }

  open() {
    // 옵션에 따라 동작
    if (this.options.lockScroll) {
      ScrollLock.lock()
    }

    if (this.options.trapFocus) {
      this.focusTrap = new FocusTrap(this.containerElement)
      this.focusTrap.activate(this.options.initialFocus)
    }

    this.element.style.display = 'block'
    this.isOpen = true
  }
}
```

**배울 점:**
- TypeScript `Required<T>` 유틸리티 타입
- 기본값 설정 패턴
- Optional parameters

#### 2. Events 시스템 (30분)
```typescript
interface ModalEvents {
  beforeOpen?: () => void | Promise<void>
  afterOpen?: () => void
  beforeClose?: () => void | Promise<void>
  afterClose?: () => void
}

class Modal {
  private events: ModalEvents

  constructor(
    element: HTMLElement,
    options: ModalOptions = {},
    events: ModalEvents = {}
  ) {
    this.element = element
    this.options = { /* ... */ }
    this.events = events
  }

  async open() {
    if (this.events.beforeOpen) {
      await this.events.beforeOpen()
    }

    // ... 모달 열기 로직

    if (this.events.afterOpen) {
      this.events.afterOpen()
    }
  }
}

// 사용 예
const modal = new Modal(element, {}, {
  beforeOpen: async () => {
    console.log('데이터 로딩 중...')
    await fetchData()
  },
  afterOpen: () => {
    console.log('모달 열림!')
  }
})
```

**배울 점:**
- 이벤트 훅 패턴
- `async/await` 활용
- Lifecycle hooks

### v4 완료 후 상태
```
✅ 모든 기능 커스터마이징 가능
✅ 이벤트 훅으로 확장 가능
❌ 여전히 여러 모달 동시 관리 어려움
```

---

## 🎯 v5: Modal Manager (선택 사항)

### 추가할 기능

#### 1. Modal Stacking
```typescript
class ModalManager {
  private static modals: Modal[] = []
  private static zIndexBase = 1000

  static register(modal: Modal) {
    this.modals.push(modal)
    return this.modals.length - 1
  }

  static unregister(modal: Modal) {
    const index = this.modals.indexOf(modal)
    if (index > -1) {
      this.modals.splice(index, 1)
    }
  }

  static getZIndex(modal: Modal): number {
    const index = this.modals.indexOf(modal)
    return this.zIndexBase + index * 10
  }

  static getTopModal(): Modal | null {
    return this.modals[this.modals.length - 1] || null
  }
}
```

**배울 점:**
- Singleton 패턴
- z-index 관리
- 모달 스택 관리

---

## 📊 진행 상황 체크리스트

### v1 - 최소 모달 ✅
- [x] 기본 open/close
- [x] toggle 메서드
- [x] display 제어

### v2 - UX 개선
- [ ] ScrollLock 구현
- [ ] ESC 키 닫기
- [ ] 배경 클릭 닫기
- [ ] destroy 메서드

### v3 - 접근성
- [ ] FocusTrap 구현
- [ ] ARIA 속성 추가
- [ ] 포커스 복원
- [ ] 스크린 리더 지원

### v4 - 설정 가능
- [ ] ModalOptions 인터페이스
- [ ] 옵션 시스템
- [ ] 이벤트 훅
- [ ] 커스텀 클래스명

### v5 - 고급 (선택)
- [ ] ModalManager
- [ ] Multiple modals
- [ ] z-index 관리

---

## 🎯 학습 목표별 매핑

| 학습 목표 | 어떤 버전에서 배우나 |
|----------|-------------------|
| DOM 조작 | v1, v2 |
| 이벤트 리스너 | v2, v3 |
| 접근성 (A11y) | v3 |
| TypeScript 타입 | v4 |
| 디자인 패턴 | v4, v5 |
| 메모리 관리 | v2, v3 |
| 성능 최적화 | v2 (layout shift) |

---

## 💡 개발 팁

### 각 버전 완료 후 해야 할 것

1. **테스트해보기**
   - 브라우저에서 실제로 사용
   - 문제점 직접 경험

2. **코드 정리**
   - 파일이 길어지면 분리
   - 주석 정리

3. **커밋하기**
   ```bash
   git add .
   git commit -m "feat: Modal v2 - UX 개선 (ScrollLock, ESC, Backdrop)"
   ```

4. **문서 업데이트**
   - README에 사용 예제 추가
   - 문제점과 해결책 기록

5. **다음 버전 계획**
   - 무엇이 불편한가?
   - 다음에 추가할 기능은?

---

## 🚀 다음 단계

**오늘 (v1) 완료!** 🎉

**내일 (v2):**
1. ScrollLock부터 시작
2. 긴 페이지 만들어서 테스트
3. 스크롤 막히는 것 확인
4. Layout shift 문제 경험
5. Padding으로 해결

**모레 (v3):**
1. Tab 키 눌러보면서 문제 경험
2. FocusTrap 구현
3. ARIA 속성 추가
4. 스크린 리더 테스트

---

## 📚 참고 자료

- [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [A11y: Focus Management](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

---

**Remember:** 완벽한 코드보다 동작하는 코드! 문제를 직접 경험하며 배우는 게 중요합니다. 💪
