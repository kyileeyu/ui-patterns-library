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
</Modal>

// 2. 명령적 Promise 기반 API
const result = await modal({
  title: '확인',
  content: '정말 삭제하시겠습니까?',
});

// 3. Hook 기반 API
const { open, close } = useModal();
open({ content: '...' });

// 4. Headless 컴포넌트 패턴
<Modal.Root>
  <Modal.Trigger />
  <Modal.Content />
</Modal.Root>
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
├── docs/                    # 문서
│   ├── PROJECT_PLAN.md     # 상세 프로젝트 계획
│   └── patterns/           # 각 패턴별 문서
├── src/
│   ├── core/               # 핵심 유틸리티
│   │   ├── dom/           # DOM 조작 헬퍼
│   │   ├── hooks/         # React Hook 유틸
│   │   └── a11y/          # 접근성 유틸
│   ├── patterns/          # UI 패턴 구현
│   │   ├── modal/
│   │   ├── drawer/
│   │   └── ...
│   └── index.ts
├── examples/              # 사용 예제
└── tests/                 # 테스트
```

## 🔗 참고 자료

- [Material Design 3 Components](https://m3.material.io/components)
- [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [의사결정 기록 (Google Sheets)](https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit?gid=0#gid=0)

## 🚀 개발 로드맵

1. **1~2주차**: Group 1 - Modal 중심 오버레이 패턴
2. **3~6주차**: Group 2 - 폼 컨트롤 & 선택 패턴
3. **7~8주차**: Group 3 - 피드백 & 알림 패턴
4. **9주차~**: Group 4+ - 네비게이션 & 고급 패턴

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
