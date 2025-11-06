# Google Sheets 연동 가이드

## 📊 의사결정 시트 구조

**시트 URL**: https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit?gid=0#gid=0

---

## 📋 추천 시트 구조

### Sheet 1: 기술적 의사결정 (Technical Decisions)

| 날짜 | 카테고리 | 결정 사항 | 선택한 방법 | 다른 선택지 | 선택 이유 | 트레이드오프 | 상태 |
|------|----------|-----------|-------------|-------------|-----------|--------------|------|
| 2025-11-06 | 프로젝트 구조 | 빌드 도구 선택 | Vite | Webpack, Rollup | 빠른 개발 경험, 최신 표준 | 레거시 지원 약함 | ✅ Confirmed |
| 2025-11-06 | API 디자인 | Modal API 형태 | Promise Hook | JSX Component | 명령적 사용, await 가능 | 선언적 UI 패턴과 차이 | 🔄 In Review |

### Sheet 2: 폴더 구조 의사결정 (Folder Structure)

| 경로 | 목적 | 이유 | 대안 | 참고 |
|------|------|------|------|------|
| `/src/core` | 공통 유틸리티 | 재사용성 극대화 | `/src/utils` | 더 명확한 의미 |
| `/src/patterns` | UI 패턴 구현 | 도메인별 분리 | `/src/components` | 일반 컴포넌트와 구분 |

### Sheet 3: 패턴별 설계 (Pattern Designs)

| 패턴명 | 난이도 | 예상 라인수 | 핵심 기술 | 접근성 요구사항 | 완료 여부 |
|--------|--------|-------------|-----------|-----------------|-----------|
| Modal | 중 | 300-400 | Portal, Focus Trap | ARIA role, Esc key | ⬜ Todo |
| Drawer | 중 | 250-350 | CSS Transform, Animation | Keyboard nav | ⬜ Todo |
| Accordion | 하 | 200-300 | State management | ARIA expanded | ⬜ Todo |

### Sheet 4: PR 추적 (PR Tracking)

| PR # | 제목 | 라인수 | 파일수 | 패턴/기능 | 리뷰 상태 | 머지 날짜 |
|------|------|--------|--------|-----------|-----------|----------|
| #1 | Initial project setup | 150 | 5 | 프로젝트 설정 | ⬜ Draft | - |
| #2 | Add Modal pattern | 380 | 3 | Modal | ⬜ Draft | - |

### Sheet 5: 학습 로그 (Learning Log)

| 날짜 | 주제 | 배운 내용 | 적용할 곳 | 참고 링크 |
|------|------|-----------|-----------|----------|
| 2025-11-06 | Focus Trap | createFocusTrap 구현 방법 | Modal, Drawer | MDN docs |

---

## 🔄 Git과 연동하는 방법

### Option 1: README에 링크 추가
```markdown
# UI Patterns Library

📊 [의사결정 기록 (Decision Log)](https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit)
```

### Option 2: PR 템플릿에 체크리스트 추가
```markdown
## 체크리스트
- [ ] Google Sheets에 의사결정 기록 추가
- [ ] 패턴별 설계 시트 업데이트
```

### Option 3: Git Hook으로 자동화
커밋 전에 의사결정 기록 여부 확인:
```bash
#!/bin/bash
# .git/hooks/pre-commit
echo "⚠️  의사결정을 Google Sheets에 기록했나요?"
echo "📊 https://docs.google.com/spreadsheets/d/1846Bi51wSw-erTTENO0gDQgOnTIw6jfN3QSYUj_NVLc/edit"
```

---

## 💡 사용 팁

1. **실시간 협업**: 멘토/리뷰어와 실시간으로 의사결정 토론
2. **히스토리 추적**: 버전 기록으로 언제 왜 결정했는지 추적
3. **필터링/정렬**: 카테고리별, 상태별로 쉽게 필터링
4. **데이터 시각화**: 차트로 패턴 진행도 시각화 가능

---

## 📝 작성 가이드

### 좋은 의사결정 기록 예시
```
날짜: 2025-11-06
카테고리: API Design
결정 사항: Modal Hook API 형태

선택:
const result = await modal({ ... })

이유:
1. Promise로 결과를 직접 받을 수 있어 코드 흐름이 자연스러움
2. 상태 관리가 Hook 내부에서 처리되어 사용자 코드 간결
3. TypeScript 타입 추론이 명확함

트레이드오프:
- React 외부에서는 사용 불가 (React Hook 의존)
- 서버 컴포넌트에서는 사용 제약

참고: Radix UI, Chakra UI는 JSX 방식, 하지만 toss/use-funnel은 Hook 방식 채택
```

---

## 🔗 다음 단계

1. ✅ Google Sheets 구조 설정
2. ⬜ 첫 의사결정 기록 (프로젝트 설정)
3. ⬜ PR마다 Sheet 업데이트 루틴 확립
