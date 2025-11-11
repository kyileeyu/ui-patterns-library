# 기술 스택 의사결정 문서

> 프로젝트의 주요 기술 선택과 그 근거를 기록합니다.

---

## 📦 1. 프로젝트 구조: Monorepo

### 결정
**Monorepo 구조 채택** (여러 패키지를 하나의 저장소에서 관리)

### 이유
- **코드 공유 용이**: `core` 패키지를 `react`, `vue` 등에서 공통으로 사용
- **일관된 버전 관리**: 모든 패키지가 동기화된 버전으로 릴리즈
- **개발 경험**: 한 번에 여러 패키지를 수정하고 테스트 가능
- **타입 안정성**: TypeScript 타입이 패키지 간 자동으로 공유됨

### 다른 선택지
1. **Single Package (단일 패키지)**
   - 장점: 설정 간단, 배포 단순
   - 단점: core와 react를 분리하기 어려움, 사용자가 필요 없는 코드도 다운로드

2. **Polyrepo (각 패키지를 별도 저장소로)**
   - 장점: 각 패키지가 독립적
   - 단점: 버전 동기화 어려움, 코드 공유 복잡, 로컬 개발 불편

### 트레이드오프
- ✅ 장점: 확장성, 코드 재사용, 통합 개발 환경
- ❌ 단점: 초기 설정 복잡도 증가, 빌드 시간 증가 가능
- 💡 우리 선택: 확장성과 학습 가치를 위해 복잡도 감수

---

## 🔧 2. 빌드 도구: Vite

### 결정
**Vite 사용** (개발 서버 + 빌드 도구)

### 이유
- **빠른 개발 서버**: ESM 기반 번들링 없는 개발 환경
- **간단한 설정**: 최소한의 설정으로 TypeScript, JSX 지원
- **현대적**: 최신 웹 표준 지원 (ES modules, native ESM)
- **라이브러리 모드 지원**: `library mode`로 라이브러리 빌드 최적화
- **경험**: 이미 사용해본 경험이 있어 생산성 높음

### 다른 선택지
1. **Rollup**
   - 장점: 더 세밀한 번들 제어, Vite보다 성숙
   - 단점: 설정 복잡, 개발 서버 없음 (별도 구성 필요)

2. **tsup**
   - 장점: 라이브러리 빌드에 특화, zero-config
   - 단점: 개발 서버 없음, React 예제 실행 불편

3. **webpack**
   - 장점: 가장 성숙, 플러그인 생태계
   - 단점: 설정 복잡, 느린 빌드 속도

### 트레이드오프
- ✅ 장점: 빠른 개발 경험, 간단한 설정, 예제 앱 실행 가능
- ❌ 단점: Rollup보다 번들 최적화 옵션 적음
- 💡 우리 선택: 개발 속도와 경험을 우선

---

## 📦 3. 패키지 매니저: pnpm

### 결정
**pnpm 사용**

### 이유
- **디스크 효율성**: 중앙 저장소에 패키지를 한 번만 저장하고 심볼릭 링크 사용
- **빠른 설치**: 병렬 설치 + 캐싱으로 npm/yarn보다 빠름
- **엄격한 의존성 관리**: `node_modules`를 평탄화하지 않아 유령 의존성(phantom dependencies) 방지
- **Monorepo 지원**: `pnpm workspace` 기능으로 모노레포 관리 용이

### 개념 설명
**pnpm의 핵심: Content-addressable storage**

```bash
# 일반 npm/yarn
node_modules/
  ├── react/              # 프로젝트마다 복사
  ├── lodash/             # 중복 저장
  └── ...

# pnpm
~/.pnpm-store/           # 중앙 저장소 (글로벌)
  └── v3/
      └── files/
          ├── react@18.2.0  # 한 번만 저장
          └── lodash@4.17.21

node_modules/            # 심볼릭 링크로 연결
  └── .pnpm/
      ├── react@18.2.0 -> ~/.pnpm-store/...
      └── lodash@4.17.21 -> ~/.pnpm-store/...
```

- **같은 버전의 패키지는 시스템 전체에서 단 한 번만 저장**
- 다른 프로젝트에서 같은 패키지 설치 시 → 링크만 생성 (초고속)
- 디스크 공간 절약 (react를 10개 프로젝트에서 써도 1개 용량만 차지)

### 다른 선택지
1. **npm**
   - 장점: 기본 제공, 가장 호환성 높음
   - 단점: 느림, 디스크 낭비, 유령 의존성 문제

2. **yarn (classic)**
   - 장점: npm보다 빠름, 워크스페이스 지원
   - 단점: 여전히 디스크 낭비, pnpm보다 느림

3. **yarn berry (v2+)**
   - 장점: Plug'n'Play로 node_modules 없앰
   - 단점: 생태계 호환성 문제, 러닝 커브

### 트레이드오프
- ✅ 장점: 빠름, 디스크 효율, 안전한 의존성, 모노레포 지원
- ❌ 단점: 일부 도구와 호환성 문제 가능 (극히 드뭄)
- 💡 우리 선택: 성능과 안정성을 위해 선택

---

## 🏗️ 4. 아키텍처: Re-export 레이어 패턴

### 결정
**patterns 디렉토리에서 개발 + core/react는 re-export 레이어**

```
packages/
  ├── patterns/          # 🎯 실제 개발 영역
  │   └── modal/
  │       ├── core/      # 바닐라 JS/TS 구현
  │       └── react/     # React 래퍼
  ├── core/              # Re-export 레이어
  ├── react/             # Re-export 레이어
  └── examples/          # 데모 앱
```

### 이유
1. **개발 편의성**
   - 모든 UI 패턴을 `patterns/` 하나의 디렉토리에서 개발
   - 패턴별로 core/react가 함께 있어 관련 코드 파악 용이
   - 예: `patterns/modal/` 안에 core와 react 구현이 모두 존재

2. **사용자 편의성**
   - 사용자는 `@ui-patterns/core`, `@ui-patterns/react`로 통합된 import
   - 패턴이 많아져도 import 경로는 단순하게 유지
   - 예: `import { Modal, Drawer } from '@ui-patterns/react'`

3. **의존성 분리**
   - core만 필요한 사용자는 React 의존성 다운로드 불필요
   - `@ui-patterns/react`는 `@ui-patterns/modal`만 의존
   - `@ui-patterns/core`도 불필요 (각 패턴이 독립적)

4. **확장성**
   - 새 패턴 추가 시 `patterns/새패턴/` 디렉토리만 생성
   - core/react의 index.ts에 re-export만 추가
   - 의존성 관계가 명확하고 단순

### 다른 선택지
1. **패턴별 독립 패키지** (`@ui-patterns/modal-core`, `@ui-patterns/modal-react`)
   - 장점: 완전한 독립성, 개별 버전 관리
   - 단점: import 복잡 (`@ui-patterns/modal-react`), 패키지 관리 부담

2. **모든 코드를 core/react에 직접 구현**
   - 장점: 구조 단순
   - 단점: 패턴이 많아지면 core/react 디렉토리가 비대해짐, 패턴별 코드 찾기 어려움

3. **patterns 없이 core/react 내부에 패턴별 폴더**
   - 장점: 패키지 수가 적음
   - 단점: workspace 의존성 관리의 이점 활용 못함

### 트레이드오프
- ✅ 장점: 개발 편의성, 사용자 편의성, 의존성 분리, 확장 용이
- ❌ 단점: 패키지 수 증가 (패턴당 1개), workspace 설정 필요
- 💡 우리 선택: 장기적 유지보수성과 확장성을 위해 선택

### 구현 예시

**패턴 추가 흐름:**
```bash
# 1. 새 패턴 디렉토리 생성
mkdir -p packages/patterns/drawer/{core,react}

# 2. 구현 작성
# packages/patterns/drawer/core/index.ts
# packages/patterns/drawer/react/index.ts

# 3. Re-export 추가
# packages/core/src/index.ts
export * from '../../patterns/drawer/core'

# packages/react/src/index.ts
export * from '../../patterns/drawer/react'

# 4. 사용
import { Drawer } from '@ui-patterns/react'
```

---

## 📊 의사결정 요약표

| 항목 | 선택 | 핵심 이유 | 트레이드오프 |
|-----|------|----------|-------------|
| **프로젝트 구조** | Monorepo | 코드 공유, 일관된 버전 관리 | 초기 설정 복잡 |
| **빌드 도구** | Vite | 빠른 개발, 간단한 설정, 경험 | 세밀한 번들 제어 제한 |
| **패키지 매니저** | pnpm | 빠름, 디스크 효율, 안전성 | 일부 도구 호환성(드뭄) |
| **아키텍처** | Re-export 레이어 | 개발/사용 편의성, 의존성 분리 | 패키지 수 증가 |

---

## 🎯 결론

이 기술 스택 선택은 다음 목표를 지향합니다:

1. **개발 편의성**: patterns 디렉토리에서 패턴별로 집중 개발
2. **사용자 편의성**: 단순한 import 경로 (`@ui-patterns/core`, `@ui-patterns/react`)
3. **의존성 분리**: 필요한 것만 설치 (core만 또는 react까지)
4. **확장성**: 패턴 추가가 쉽고 명확한 구조
5. **현대적 개발 경험**: 빠르고 효율적인 개발 환경

초기 설정의 복잡도는 높지만, 장기적인 유지보수성과 확장성을 위해 선택했습니다.

---

**작성일**: 2025-11-07
**최종 업데이트**: 2025-11-10 (Re-export 레이어 패턴 적용)
**다음 업데이트**: 첫 패턴(Modal) 구현 후, 실제 사용 경험 기록 예정
