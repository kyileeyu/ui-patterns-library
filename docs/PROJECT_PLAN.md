# UI Patterns Library - Project Plan

## 📋 프로젝트 개요

FE 개발자가 실무에서 접하는 모든 UX 패턴을 Native HTML 기반으로 구현하고, 현대적인 Hook 기반 API로 제공하는 라이브러리

### 🎯 핵심 목표

1. **패턴의 본질 이해**: 각 UI 패턴의 본질적인 동작 원리와 접근성 이해
2. **사용하기 쉬운 API**: JSX가 아닌 Promise 기반 Hook API 제공
3. **삭제하기 쉬운 코드**: 협업자가 쉽게 이해하고 수정/삭제 가능한 구조
4. **점진적 개선**: 300-500 라인 단위로 PR을 나눠서 이터레이션

### 🔗 관련 문서

- **의사결정 기록**: [Google Sheets](https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit?gid=0#gid=0)
  - 모든 기술적 의사결정과 그 근거를 기록
  - 폴더 구조, 설계, 기술 스택 선택 등

---

## 🎨 구현할 UI 패턴 목록

> 총 **47개 패턴** (Material Design 3 + W3C ARIA APG 기준)

---

### 🔥 Priority Group 1: 핵심 오버레이 & 다이얼로그 (가장 높은 우선순위)
**멘토님 강조: 모달을 중심으로 한 오버레이 패턴부터**

- [ ] **Modal/Dialog** - Promise 기반 Hook API, 포커스 트랩, ESC 닫기
- [ ] **Alert Dialog** - 확인/취소 전용 모달 (confirm/alert 대체)
- [ ] **Drawer/Sheet** - 측면/하단 슬라이드 패널
- [ ] **Bottom Sheet** - 모바일 하단 시트
- [ ] **Popover** - 비모달 팝업 (위치 기반)
- [ ] **Tooltip** - 호버/포커스 정보 표시

**왜 우선순위 1등?**
- 가장 복잡한 패턴 (포커스 관리, z-index, 접근성)
- 다른 패턴의 기반이 됨 (Menu, Select도 내부적으로 Popover 사용)
- Promise 기반 API의 핵심 유스케이스

---

### ⚡ Priority Group 2: 폼 입력 & 선택 (기본 인터랙션)
**실무에서 가장 많이 사용**

#### 2-1. 선택 컨트롤
- [ ] **Radio Button/Group** - 단일 선택 (접근성 중요)
- [ ] **Checkbox** - 다중 선택, indeterminate 상태
- [ ] **Switch/Toggle** - on/off 토글

#### 2-2. 드롭다운 계열
- [ ] **Select/Dropdown** - 네이티브 select 대체
- [ ] **Combobox** - 검색 가능한 드롭다운
- [ ] **Autocomplete** - 자동완성 입력
- [ ] **Menu/Context Menu** - 액션 메뉴

#### 2-3. 입력 필드
- [ ] **Text Field/Input** - 텍스트 입력
- [ ] **Textarea** - 멀티라인 입력
- [ ] **Date & Time Picker** - 날짜/시간 선택
- [ ] **Spinbutton** - 숫자 증감 입력
- [ ] **Slider** - 범위 값 선택
- [ ] **Multi-thumb Slider** - 범위 슬라이더

**왜 우선순위 2등?**
- 모든 프로젝트에서 필수
- 접근성 구현 연습에 최적
- 비교적 독립적 (다른 패턴 의존도 낮음)

---

### 📢 Priority Group 3: 피드백 & 알림
**사용자에게 상태를 전달**

- [ ] **Toast/Snackbar** - 일시적 알림 (자동 사라짐)
- [ ] **Alert/Notification** - 중요 알림 (배너형)
- [ ] **Badge** - 숫자/상태 뱃지
- [ ] **Progress Bar** - 진행률 표시
- [ ] **Circular Progress/Spinner** - 로딩 인디케이터
- [ ] **Skeleton** - 로딩 플레이스홀더
- [ ] **Meter** - 수치 시각화 (배터리, 용량 등)

**왜 우선순위 3등?**
- UX에 필수적
- 구현 난이도 중간
- 접근성 고려 필요 (live region, aria-busy)

---

### 🧭 Priority Group 4: 네비게이션 & 레이아웃
**정보 구조와 이동**

#### 4-1. 콘텐츠 구조
- [ ] **Tabs** - 탭 전환 (키보드 네비게이션 중요)
- [ ] **Accordion** - 접히는 콘텐츠
- [ ] **Disclosure** - 단순 show/hide

#### 4-2. 네비게이션
- [ ] **Breadcrumb** - 경로 표시
- [ ] **Pagination** - 페이지 네비게이션
- [ ] **App Bar (Top/Bottom)** - 상단/하단 네비게이션 바
- [ ] **Navigation Drawer** - 사이드 메뉴
- [ ] **Navigation Rail** - 축소형 사이드 네비게이션
- [ ] **Toolbar** - 툴바 컨트롤 그룹
- [ ] **Menu Button** - 버튼 + 메뉴 조합

#### 4-3. 레이아웃
- [ ] **Divider** - 구분선
- [ ] **Window Splitter** - 리사이즈 가능 패널
- [ ] **Card** - 콘텐츠 컨테이너

---

### 🚀 Priority Group 5: 복잡한 데이터 표시
**고급 인터랙션**

- [ ] **List** - 단순/복잡한 목록
- [ ] **Table** - 정적 데이터 테이블
- [ ] **Grid (Interactive)** - 키보드 네비게이션 그리드
- [ ] **Treegrid** - 계층 구조 편집 가능 그리드
- [ ] **Tree View** - 계층 구조 목록 (파일 탐색기)
- [ ] **Feed** - 무한 스크롤 피드
- [ ] **Infinite Scroll** - 무한 스크롤 구현
- [ ] **Carousel** - 이미지/콘텐츠 슬라이더
- [ ] **Virtualized List** - 대용량 목록 최적화

---

### 🎯 Priority Group 6: 고급 인터랙션
**선택적 구현 (시간 여유 시)**

- [ ] **Drag & Drop** - 드래그 앤 드롭
- [ ] **Sortable List** - 정렬 가능한 목록
- [ ] **Resizable** - 크기 조절 가능
- [ ] **File Upload** - 파일 업로드 (드래그 드롭 포함)
- [ ] **Search** - 검색 입력 (자동완성 포함)
- [ ] **Chips** - 태그/필터 선택
- [ ] **Color Picker** - 색상 선택
- [ ] **Rich Text Editor** - 텍스트 편집기

---

### 🔧 Priority Group 7: 기본 빌딩 블록
**다른 패턴의 기초가 되는 것들**

- [ ] **Button** - 기본/아이콘/FAB 버튼
- [ ] **Link** - 접근성 있는 링크
- [ ] **Icon Button** - 아이콘 버튼
- [ ] **Floating Action Button (FAB)** - 플로팅 액션 버튼
- [ ] **Landmarks** - 시맨틱 섹션 구조

---

### 📊 우선순위 요약

| Group | 패턴 수 | 구현 순서 | 예상 기간 |
|-------|---------|-----------|-----------|
| **Group 1** | 6개 | 1~2주차 | 가장 중요 |
| **Group 2** | 12개 | 3~6주차 | 필수 |
| **Group 3** | 7개 | 7~8주차 | 필수 |
| **Group 4** | 11개 | 9~11주차 | 권장 |
| **Group 5** | 9개 | 12~14주차 | 선택 |
| **Group 6** | 8개 | 15주차~ | 선택 |
| **Group 7** | 5개 | 병행 구현 | 기초 |

**✅ 멘토링 목표 달성을 위한 최소 범위: Group 1~3 (25개 패턴)**

---

## 🏗️ 아키텍처 설계

### 프로젝트 구조 (예상)

```
ui-patterns-library/
├── docs/                        # 문서
│   ├── PROJECT_PLAN.md         # 이 파일
│   ├── ARCHITECTURE.md         # 아키텍처 설계
│   ├── DECISION_LOG.md         # 의사결정 로그 (Google Sheets 요약)
│   └── patterns/               # 각 패턴별 문서
├── src/
│   ├── core/                   # 핵심 유틸리티
│   │   ├── dom/               # DOM 조작 헬퍼
│   │   ├── hooks/             # React Hook 유틸
│   │   └── a11y/              # 접근성 유틸
│   ├── patterns/              # UI 패턴 구현
│   │   ├── modal/
│   │   ├── drawer/
│   │   ├── accordion/
│   │   └── ...
│   └── index.ts               # 진입점
├── examples/                   # 사용 예제
├── tests/                      # 테스트
└── package.json
```

### 코드 제약사항

- **UI 컴포넌트**: 1000줄까지 허용
- **유틸리티/로직**: 300-500줄로 분할
- **PR 단위**: 하나의 기능 또는 패턴

---

## 🔄 개발 프로세스 (이터레이션)

### Iteration 1: 프로젝트 설정
- [x] Git 초기화
- [ ] 프로젝트 구조 설계
- [ ] 기본 설정 (TypeScript, Build, Test)
- [ ] 문서 작성

### Iteration 2: Modal 구현 (첫 번째 패턴)
1. 핵심 Modal 로직 구현
2. Promise 기반 Hook API 설계
3. 접근성 기능 추가
4. 예제 작성
5. 테스트 작성

### Iteration 3+: 다른 패턴 순차 구현
- 각 패턴마다 동일한 프로세스 반복
- 학습한 내용을 다음 패턴에 적용

---

## 📝 코딩 원칙

### 1. 주석 없이도 이해 가능한 코드
- 명확한 네이밍
- 작은 함수로 분리
- Self-documenting code

### 2. 쉽게 삭제 가능한 코드
- 낮은 결합도 (Loose Coupling)
- 높은 응집도 (High Cohesion)
- 명확한 인터페이스

### 3. 다양한 API 패턴 실험
각 컴포넌트마다 여러 사용 방식을 구현하고 비교:

```typescript
// 패턴 1: 선언적 (Declarative) API
<Modal open={isOpen} onClose={handleClose}>
  <p>정말 삭제하시겠습니까?</p>
</Modal>

// 패턴 2: 명령적 Promise 기반 API
const result = await modal({
  title: '확인',
  content: '정말 삭제하시겠습니까?',
});

// 패턴 3: Hook 기반 API
const { open, close } = useModal();
open({ content: '...' });

// 패턴 4: Headless 컴포넌트
<Modal.Root>
  <Modal.Trigger />
  <Modal.Content />
</Modal.Root>
```

**각 패턴의 트레이드오프를 분석하고 문서화**

### 4. 의사결정 기록
모든 중요한 결정은 Google Sheets에 기록:
- **무엇을** 결정했는가?
- **왜** 이렇게 결정했는가?
- **다른 선택지**는 무엇이었는가?
- **트레이드오프**는 무엇인가?

---

## 🎯 성공 지표

1. **완성도**: 최소 10개 이상의 패턴 구현
2. **품질**: 각 패턴의 접근성과 사용성 확보
3. **문서화**: 모든 의사결정과 사용법 문서화
4. **재사용성**: 실제 프로젝트에 바로 적용 가능

---

## 📚 다음 단계

1. **의사결정 시트 구조 확정**
2. **첫 PR: 프로젝트 초기 설정**
3. **두 번째 PR: Modal 구현 (Phase 1)**
4. **지속적 이터레이션**

---

## 💡 인사이트 & 학습 목표

이 프로젝트를 통해:
- ✅ 모든 UI 패턴을 직접 만들어본 경험
- ✅ Native HTML/DOM API 깊은 이해
- ✅ 접근성(A11y) 실전 적용
- ✅ 라이브러리 설계 역량
- ✅ 의사결정 과정 체계화
- ✅ "나는 이 패턴들을 다 만들어봤다"는 자신감

> "본질을 이해하고 있으면, 어떤 환경에서도 적용할 수 있다"
