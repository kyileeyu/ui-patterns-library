# 이터레이션 계획

## 🎯 이터레이션 원칙

- **작은 단위**: 300-500 라인 (UI 컴포넌트는 1000줄까지 허용)
- **완결성**: 각 이터레이션은 독립적으로 완결된 기능
- **점진적 개선**: 이전 이터레이션의 학습을 다음에 적용
- **문서화**: 매 이터레이션마다 의사결정 기록

---

## 📅 Iteration 0: 프로젝트 초기화 (현재)

**목표**: 프로젝트 구조와 개발 환경 설정

### Tasks
- [x] Git 초기화
- [x] 프로젝트 계획 문서 작성
- [ ] package.json 및 기본 설정
- [ ] TypeScript 설정
- [ ] 폴더 구조 생성
- [ ] README 작성

### 의사결정 항목
- 빌드 도구 선택 (Vite vs Webpack vs Rollup)
- 타입스크립트 설정
- 테스트 프레임워크 선택
- 코드 포맷터/린터 설정

### PR #1: Initial Project Setup
**예상 라인수**: ~150-200 lines
**파일수**: ~5-8 files

---

## 📅 Iteration 1: Modal 패턴 - 핵심 구현

**목표**: Promise 기반 Modal Hook의 핵심 로직 구현

### Tasks
- [ ] 기본 Modal DOM 구조 생성
- [ ] Portal 구현 (body에 렌더링)
- [ ] Promise 기반 Hook API 설계
- [ ] Open/Close 애니메이션
- [ ] Overlay 클릭 시 닫기

### 의사결정 항목
- Portal 구현 방식 (createPortal vs manual DOM)
- 상태 관리 방법
- Promise resolve/reject 타이밍
- 애니메이션 방식 (CSS vs JS)

### PR #2: Add Modal core implementation
**예상 라인수**: ~300-400 lines
**파일수**: ~3-4 files
```
src/patterns/modal/
  ├── useModal.ts        (~150 lines)
  ├── Modal.tsx          (~100 lines)
  ├── modal.styles.ts    (~50 lines)
  └── types.ts           (~30 lines)
```

---

## 📅 Iteration 2: Modal 패턴 - 접근성 & 개선

**목표**: 접근성 기능 추가 및 사용성 개선

### Tasks
- [ ] Focus Trap 구현
- [ ] ESC 키로 닫기
- [ ] ARIA 속성 추가
- [ ] 스크롤 락 (배경 스크롤 방지)
- [ ] 키보드 네비게이션

### 의사결정 항목
- Focus Trap 라이브러리 vs 직접 구현
- ARIA 속성 구조
- 스크롤 락 방법 (body overflow vs scroll lock 라이브러리)

### PR #3: Add Modal accessibility features
**예상 라인수**: ~250-300 lines
**파일수**: ~3-4 files
```
src/core/a11y/
  ├── focusTrap.ts       (~100 lines)
  └── scrollLock.ts      (~80 lines)
src/patterns/modal/
  └── useModal.ts        (수정, +70 lines)
```

---

## 📅 Iteration 3: Modal 패턴 - 예제 & 테스트

**목표**: 사용 예제 작성 및 테스트 추가

### Tasks
- [ ] 기본 사용 예제
- [ ] 커스터마이징 예제
- [ ] 유닛 테스트
- [ ] E2E 테스트 (선택)
- [ ] 문서 작성

### PR #4: Add Modal examples and tests
**예상 라인수**: ~200-300 lines
**파일수**: ~4-5 files

---

## 📅 Iteration 4: Drawer 패턴

**목표**: Drawer (슬라이드 패널) 구현

### Tasks
- [ ] Drawer 핵심 로직 (Modal 기반 확장)
- [ ] 4방향 슬라이드 (top, right, bottom, left)
- [ ] 애니메이션 & 트랜지션
- [ ] 접근성 기능

### 의사결정 항목
- Modal 코드 재사용 vs 독립 구현
- 애니메이션 성능 최적화
- 방향별 스타일 관리

### PR #5: Add Drawer pattern
**예상 라인수**: ~350-400 lines
**파일수**: ~4-5 files

---

## 📅 Iteration 5: Accordion 패턴

**목표**: Accordion (접히는 콘텐츠) 구현

### Tasks
- [ ] 단일/다중 확장 모드
- [ ] 애니메이션 (height transition)
- [ ] 키보드 네비게이션
- [ ] ARIA 속성

### PR #6: Add Accordion pattern
**예상 라인수**: ~250-300 lines

---

## 📅 Iteration 6-10: 추가 패턴들

각 패턴마다 유사한 프로세스 반복:
1. 핵심 구현
2. 접근성 추가
3. 예제 & 테스트

### 우선순위
1. **Iteration 6**: Toast/Snackbar (Promise 기반)
2. **Iteration 7**: Select/Dropdown
3. **Iteration 8**: Tooltip & Popover
4. **Iteration 9**: Tabs
5. **Iteration 10**: Radio & Checkbox

---

## 📊 진행 상황 추적

| Iteration | 패턴 | 상태 | PR | 완료일 |
|-----------|------|------|-----|--------|
| 0 | Project Setup | 🔄 진행중 | #1 | - |
| 1 | Modal Core | ⬜ 대기 | #2 | - |
| 2 | Modal A11y | ⬜ 대기 | #3 | - |
| 3 | Modal Test | ⬜ 대기 | #4 | - |
| 4 | Drawer | ⬜ 대기 | #5 | - |
| 5 | Accordion | ⬜ 대기 | #6 | - |

---

## 🔄 리뷰 & 개선 사이클

각 이터레이션 후:
1. ✅ **회고**: 무엇을 배웠는가?
2. ✅ **기록**: Google Sheets에 의사결정 기록
3. ✅ **개선**: 다음 이터레이션에 적용할 점
4. ✅ **공유**: 멘토/동료 리뷰

---

## 💡 예상 타임라인

- **Iteration 0**: 1-2일
- **Iteration 1-3** (Modal 완성): 5-7일
- **Iteration 4-10** (다른 패턴들): 각 2-3일
- **총 예상 기간**: 4-6주

목표는 타임라인보다 **품질과 학습**!

---

## 🎯 각 이터레이션 완료 기준

- ✅ 기능이 정상 동작함
- ✅ 접근성 요구사항 충족
- ✅ 코드 리뷰 가능한 상태
- ✅ 의사결정 문서화 완료
- ✅ 예제 코드 작성
- ✅ (선택) 테스트 작성
