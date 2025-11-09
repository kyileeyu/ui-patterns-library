# Modal Pattern

모달 다이얼로그 구현 - Framework-agnostic core + React wrapper

## 구조

- `core/` - Vanilla TypeScript 구현
- `react/` - React 컴포넌트 및 Hooks

## 기능

### Core
- [ ] 기본 Modal 클래스
- [ ] Focus Trap
- [ ] Scroll Lock
- [ ] Modal Manager (stacking)
- [ ] 접근성 (ARIA)

### React
- [ ] Declarative API (`<Modal>`)
- [ ] Hook-based API (`useModal`)
- [ ] Promise-based API (`modal.confirm()`)
- [ ] Headless UI (Compound Components)

## 접근성

- ARIA role="dialog"
- aria-modal="true"
- Focus trap (Tab 키 순환)
- ESC 키로 닫기
- 초기 포커스 관리
- 스크롤 잠금
