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

### Phase 1: 기본 패턴 (우선순위 높음)
- [ ] **Modal** - Promise 기반 Hook API
- [ ] **Drawer** - 슬라이드 패널
- [ ] **Accordion** - 접히는 콘텐츠
- [ ] **Radio Button** - 단일 선택
- [ ] **Checkbox** - 다중 선택
- [ ] **Select/Dropdown** - 선택 드롭다운

### Phase 2: 피드백 패턴
- [ ] **Toast/Snackbar** - 일시적 알림
- [ ] **Tooltip** - 호버 정보
- [ ] **Popover** - 팝업 콘텐츠
- [ ] **Alert/Notification** - 중요 알림

### Phase 3: 네비게이션 패턴
- [ ] **Tabs** - 탭 전환
- [ ] **Breadcrumb** - 경로 표시
- [ ] **Pagination** - 페이지 네비게이션
- [ ] **Menu** - 메뉴 시스템

### Phase 4: 입력 패턴
- [ ] **Input** - 텍스트 입력
- [ ] **TextArea** - 멀티라인 입력
- [ ] **DatePicker** - 날짜 선택
- [ ] **File Upload** - 파일 업로드

### Phase 5: 고급 패턴
- [ ] **Table** - 데이터 테이블
- [ ] **Carousel** - 슬라이드 쇼
- [ ] **Infinite Scroll** - 무한 스크롤
- [ ] **Drag & Drop** - 드래그 앤 드롭

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

### 3. 쉽게 사용 가능한 API
```typescript
// 나쁜 예: JSX 선언적 사용
<Modal open={isOpen} onClose={...}>...</Modal>

// 좋은 예: Promise 기반 명령적 사용
const result = await modal({
  title: '확인',
  content: '정말 삭제하시겠습니까?',
});
if (result) {
  // 확인 처리
}
```

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
