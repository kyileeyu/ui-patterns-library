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
├── docs/                        # 문서
│   ├── PROJECT_PLAN.md         # 상세 프로젝트 계획
│   ├── ITERATION_PLAN.md       # 이터레이션 계획
│   └── TECH_DECISIONS.md       # 기술 의사결정 기록
├── packages/                    # Monorepo 패키지들
│   ├── core/                   # 순수 TypeScript Core
│   │   ├── src/
│   │   └── package.json
│   ├── react/                  # React Wrapper
│   │   ├── src/
│   │   └── package.json
│   ├── patterns/               # 패턴별 구현
│   │   ├── modal/
│   │   │   ├── core/          # Vanilla TS 구현
│   │   │   └── README.md
│   │   ├── drawer/
│   │   └── ...
│   └── examples/               # 사용 예제 & 데모
│       ├── src/
│       └── package.json
├── pnpm-workspace.yaml         # Monorepo 설정
└── package.json
```

## 🔗 참고 자료

- [Material Design 3 Components](https://m3.material.io/components)
- [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [의사결정 기록 (Google Sheets)](https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit?gid=0#gid=0)

## 🚀 21일 완성 계획 (11/10 ~ 11/30)

**목표: 20개 핵심 패턴 직접 구현하며 학습하기**

### 📅 Week 1 (11/10 ~ 11/16): Dialog 기반 패턴 - 7개
Modal 기반으로 확장 가능한 오버레이 패턴 집중 학습

- [ ] **11/10 (월)** - Modal Core (ScrollLock, FocusTrap, A11y)
- [ ] **11/11 (화)** - Modal React wrapper + Promise API
- [ ] **11/12 (수)** - Alert Dialog (Modal 확장 + role 변경)
- [ ] **11/13 (목)** - Drawer (4방향 슬라이드 + 애니메이션)
- [ ] **11/14 (금)** - Bottom Sheet (모바일 제스처 + snap points)
- [ ] **11/15 (토)** - Popover (Positioning 엔진, 독립 구현)
- [ ] **11/16 (일)** - Tooltip + Week 1 회고

### 📅 Week 2 (11/17 ~ 11/23): 폼 & 선택 컨트롤 - 7개
실무에서 가장 많이 사용하는 입력 컴포넌트

- [ ] **11/17 (월)** - Radio/Checkbox (접근성 중심)
- [ ] **11/18 (화)** - Switch (애니메이션 + 상태 관리)
- [ ] **11/19 (수)** - Select (Popover 기반 드롭다운)
- [ ] **11/20 (목)** - Combobox (검색 + 필터링)
- [ ] **11/21 (금)** - Autocomplete (Debounce + 비동기)
- [ ] **11/22 (토)** - Menu (Context Menu 포함)
- [ ] **11/23 (일)** - TextField + Week 2 회고

### 📅 Week 3 (11/24 ~ 11/30): 피드백 & 네비게이션 - 6개
사용자 피드백과 콘텐츠 구조

- [ ] **11/24 (월)** - Toast (큐 관리 + 자동 사라짐)
- [ ] **11/25 (화)** - Alert/Banner (Dismissible + 위치)
- [ ] **11/26 (수)** - Progress/Spinner (진행률 + 로딩 상태)
- [ ] **11/27 (목)** - Tabs (키보드 네비게이션)
- [ ] **11/28 (금)** - Accordion (애니메이션 + 다중 확장)
- [ ] **11/29 (토)** - Breadcrumb
- [ ] **11/30 (일)** - 🎯 전체 마무리 & 문서화

### 📊 진행률 트래킹

```
Week 1: ▱▱▱▱▱▱▱ (0/7) - Dialog 기반
Week 2: ▱▱▱▱▱▱▱ (0/7) - 폼 & 선택
Week 3: ▱▱▱▱▱▱ (0/6) - 피드백 & 네비게이션
━━━━━━━━━━━━━━━━━━━━━━
Total: 0/20 (0%)
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
