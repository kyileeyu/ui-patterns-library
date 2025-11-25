# UI Patterns Library

> FE 개발자가 실무에서 접하는 모든 UX 패턴을 Native HTML 기반으로 구현하고, 현대적인 Hook 기반 API로 제공하는 라이브러리

## 🎯 프로젝트 목표

1. **패턴의 본질 이해**: 각 UI 패턴의 본질적인 동작 원리와 접근성 이해
2. **사용하기 쉬운 API**: JSX가 아닌 Promise 기반 Hook API 제공
3. **삭제하기 쉬운 코드**: 협업자가 쉽게 이해하고 수정/삭제 가능한 구조
4. **점진적 개선**: 300-500 라인 단위로 PR을 나눠서 이터레이션

## 🎨 구현 패턴 (총 47개)

### 🔥 Priority Group 1: 핵심 오버레이 & 다이얼로그 (6개)

Modal, Alert Dialog, Drawer, Bottom Sheet, Popover, Tooltip

### ⚡ Priority Group 2: 폼 입력 & 선택 (12개)

Radio Button, Checkbox, Switch, Select, Combobox, Autocomplete, Menu, Text Field, Textarea, Date Picker, Spinbutton, Slider

### 📢 Priority Group 3: 피드백 & 알림 (7개)

Toast, Alert, Badge, Progress Bar, Spinner, Skeleton, Meter

### 🧭 Priority Group 4: 네비게이션 & 레이아웃 (11개)

Tabs, Accordion, Breadcrumb, Pagination, Navigation, Toolbar 등

### 🚀 Priority Group 5-7: 고급 패턴 (22개)

Table, Grid, Tree View, Carousel, Drag & Drop 등

**✅ 핵심 목표: Group 1~3 (25개 패턴 우선 구현)**

자세한 내용은 [프로젝트 계획서](docs/PROJECT_PLAN.md)를 참고하세요.

## 💡 핵심 설계 원칙

### 다양한 API 패턴 실험

각 컴포넌트마다 다양한 사용 방식을 실험하고 비교합니다:

```typescript
// 1. 선언적 (Declarative) API
<Modal open={isOpen} onClose={handleClose}>
  <p>정말 삭제하시겠습니까?</p>
</Modal>;

// 2. 명령적 Promise 기반 API
const result = await modal({
  title: "확인",
  content: "정말 삭제하시겠습니까?",
});

// 3. Hook 기반 API
const { open, close } = useModal();
open({ content: "..." });

// 4. Headless 컴포넌트 패턴
<Modal.Root>
  <Modal.Trigger />
  <Modal.Content />
</Modal.Root>;
```

각 방식의 장단점과 사용 사례를 문서화합니다.

### 코딩 원칙

- **주석 없이도 이해 가능한 코드**: 명확한 네이밍, 작은 함수로 분리
- **쉽게 삭제 가능한 코드**: 낮은 결합도, 높은 응집도
- **Native HTML 우선**: 웹 표준 기반 구현
- **접근성 필수**: WAI-ARIA APG 가이드라인 준수
- **실험과 비교**: 여러 API 패턴을 구현하고 트레이드오프 분석

## 📁 프로젝트 구조

```
ui-patterns-library/
├── docs/                        # 문서
│   └── TECH_DECISIONS.md       # 기술 의사결정 기록
├── packages/
│   ├── patterns/               # 🎯 UI 패턴 개발 영역 (여기서 개발!)
│   │   └── modal/              # 패턴별 디렉토리
│   │       ├── core/           # 프레임워크 독립적 구현
│   │       │   └── index.ts
│   │       ├── react/          # React 래퍼
│   │       │   └── index.ts
│   │       └── package.json    # @ui-patterns/modal
│   │
│   ├── core/                   # @ui-patterns/core (re-export 레이어)
│   │   └── src/index.ts        # patterns의 모든 core 구현 통합
│   │
│   ├── react/                  # @ui-patterns/react (re-export 레이어)
│   │   └── src/index.ts        # patterns의 모든 react 구현 통합
│   │
│   └── examples/               # 데모 앱
│       └── src/
├── pnpm-workspace.yaml         # Monorepo 설정
└── package.json
```

### 구조 설명

**개발 흐름:**

1. **`packages/patterns/[패턴명]/`** - 실제 UI 패턴 개발

   - `core/` - 바닐라 JS/TS 구현 (프레임워크 독립적)
   - `react/` - React 컴포넌트 래퍼

2. **`packages/core/`, `packages/react/`** - Re-export 레이어
   - 각 패턴들을 하나의 패키지로 통합
   - 사용자에게 깔끔한 import 경로 제공

**장점:**

- ✅ 개발은 하나의 디렉토리(`patterns/modal`)에서만
- ✅ import는 통합된 패키지에서 (`@ui-patterns/core`, `@ui-patterns/react`)
- ✅ 의존성 분리 (core만 필요한 경우 React 불필요)
- ✅ 패턴 추가 시 확장 용이

## 🚀 사용 방법

### 설치

```bash
# pnpm 사용 (권장)
pnpm install @ui-patterns/core      # 바닐라 JS/TS만 필요한 경우
pnpm install @ui-patterns/react     # React 프로젝트인 경우

# npm
npm install @ui-patterns/core
npm install @ui-patterns/react
```

### 사용 예시

**바닐라 JavaScript/TypeScript:**

```typescript
import { Modal } from "@ui-patterns/core";

const modalElement = document.querySelector("#my-modal");
const modal = new Modal(modalElement);

// 모달 열기
modal.open();

// 모달 닫기
modal.close();

// 토글
modal.toggle();
```

**React:**

```tsx
import { Modal } from "@ui-patterns/react";
import { useRef, useEffect } from "react";

function App() {
  const modalRef = useRef<Modal | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) {
      modalRef.current = new Modal(dialogRef.current);
    }
  }, []);

  return (
    <div>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>

      <div ref={dialogRef} className="modal">
        <div className="modal-content">
          <h2>Hello Modal!</h2>
          <button onClick={() => modalRef.current?.close()}>Close</button>
        </div>
      </div>
    </div>
  );
}
```


### 새로운 패턴 추가하기

1. **패턴 디렉토리 생성:**

```bash
mkdir -p packages/patterns/drawer/core
mkdir -p packages/patterns/drawer/react
```

2. **구현 작성:**

```typescript
// packages/patterns/drawer/core/index.ts
export class Drawer {
  // 구현...
}

// packages/patterns/drawer/react/index.ts
export const DrawerComponent = () => {
  // React 래퍼...
};
```

3. **Re-export 레이어에 추가:**

```typescript
// packages/core/src/index.ts
export * from "../../patterns/drawer/core";

// packages/react/src/index.ts
export * from "../../patterns/drawer/react";
```

4. **package.json에 의존성 추가:**

```json
// packages/core/package.json, packages/react/package.json
{
  "dependencies": {
    "@ui-patterns/drawer": "workspace:*"
  }
}
```

5. **설치 및 확인:**

```bash
pnpm install
pnpm --filter @ui-patterns/core typecheck
```

## 🔗 참고 자료

- [Material Design 3 Components](https://m3.material.io/components)
- [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [의사결정 기록 (Google Sheets)](https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit?gid=0#gid=0)

## 🚀 21일 완성 계획 (11/10 ~ 11/30) - 🔄 수정됨 (11/25)

**목표: 43개 패턴 구현 (쉬운 것부터 → 어려운 것 순서)**

> **전략 변경**: Modal이 예상보다 복잡하여 난이도 순으로 재배치
> 빠른 성취감 → 자신감 회복 → 어려운 패턴 도전

### 📅 Week 1 (11/25 ~ 12/01): 초급 패턴 쓸어담기 - 20개

**🟢 Level 1~2: 빠른 성취감으로 모멘텀 확보**

- [ ] **11/25 (월)** - Badge, Button, Icon Button, Link, Divider (5개) - 2시간
- [ ] **11/26 (화)** - Switch, Checkbox, Radio Button (3개) - 3시간
- [ ] **11/27 (수)** - Meter, Skeleton, Spinner, Card (4개) - 2시간
- [ ] **11/28 (목)** - Progress Bar, Alert, Breadcrumb (3개) - 3시간
- [ ] **11/29 (금)** - Text Field, Textarea, FAB (3개) - 3시간
- [ ] **11/30 (토)** - Toolbar, Disclosure (2개) - 2시간
- [ ] **12/01 (일)** - 🎯 Week 1 회고 + 문서 정리

### 📅 Week 2 (12/02 ~ 12/08): 중급 패턴 도전 - 11개

**🟠 Level 3: 상태 관리 + 키보드 네비게이션**

- [ ] **12/02 (월)** - Tabs, Accordion (2개) - 키보드 네비게이션
- [ ] **12/03 (화)** - Slider, Spinbutton (2개) - 드래그 + 입력
- [ ] **12/04 (수)** - Toast/Snackbar (1개) - 큐 관리 + 자동 사라짐
- [ ] **12/05 (목)** - List, Pagination (2개) - 선택 상태 관리
- [ ] **12/06 (금)** - Chips, Search (2개) - 추가/삭제
- [ ] **12/07 (토)** - Carousel, Feed (2개) - 슬라이드 + 무한스크롤
- [ ] **12/08 (일)** - 🎯 Week 2 회고 + 문서 정리

### 📅 Week 3 (12/09 ~ 12/15): 고급 패턴 + 최종 보스 - 12개

**🔴 Level 4~5: Positioning + 복잡한 로직 + Modal**

#### Phase 1: Positioning 마스터 (12/09~12/11)
- [ ] **12/09 (월)** - Tooltip (1개) - Positioning 기본
- [ ] **12/10 (화)** - Popover (1개) - Positioning 엔진 완성
- [ ] **12/11 (수)** - Menu, Context Menu (2개) - Popover 활용

#### Phase 2: Modal 계열 완성 (12/12~12/14)
- [ ] **12/12 (목)** - Modal v2 완성 (Portal, ScrollLock, ESC) - 기존 v1 업그레이드
- [ ] **12/13 (금)** - Alert Dialog, Drawer (2개) - Modal 확장
- [ ] **12/14 (토)** - Bottom Sheet, Navigation Drawer (2개)

#### Phase 3: 복잡한 Select 계열 (12/15)
- [ ] **12/15 (일)** - Select, Combobox, Autocomplete (3개) + 🎯 전체 마무리

### 📊 진행률 트래킹

```
Week 1: ▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱ (0/20) - 초급 쓸어담기 🟢
Week 2: ▱▱▱▱▱▱▱▱▱▱▱ (0/11) - 중급 도전 🟠
Week 3: ▱▱▱▱▱▱▱▱▱▱▱▱ (0/12) - 고급 + 보스 🔴
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 0/43 (0%)

현재 완료: Modal v1 (4가지 API 골격) ⚠️ v2 업그레이드 대기 중
```

### ⚡ 효율성 전략

**코드 재사용 극대화**

```
Modal (기본) → Alert Dialog, Drawer, Bottom Sheet
Popover (positioning) → Select, Combobox, Menu
```

**품질 기준**

- ✅ 필수: 접근성, 키보드 네비게이션, 기본 스타일
- ⚠️ 선택: E2E 테스트, 복잡한 애니메이션
- 🎯 완성도: 80% 목표 (완벽주의 피하기)

## 📝 의사결정 기록

모든 중요한 기술적 결정은 다음을 기록합니다:

- **무엇을** 결정했는가?
- **왜** 이렇게 결정했는가?
- **다른 선택지**는 무엇이었는가?
- **트레이드오프**는 무엇인가?

## 🎓 학습 목표

이 프로젝트를 통해:

- ✅ 모든 UI 패턴을 직접 만들어본 경험
- ✅ Native HTML/DOM API 깊은 이해
- ✅ 접근성(A11y) 실전 적용
- ✅ 라이브러리 설계 역량
- ✅ 의사결정 과정 체계화
- ✅ "나는 이 패턴들을 다 만들어봤다"는 자신감

> "본질을 이해하고 있으면, 어떤 환경에서도 적용할 수 있다"

## 📄 License

MIT
