# UI Patterns Library 아키텍처 제안

## 현재 문제점

### 1. Core 로직이 실제로 사용되지 않음

`Tabs.core.ts`에서 framework-agnostic한 클래스를 만들었지만, `Tabs.tsx`에서는 실제로 활용하지 않음:

```typescript
// Tabs.tsx - core를 import만 하고 사용 안 함
const core = new TabsCore(tabs, { onTabChange: setActiveId });
core.setActiveId(activeId);  // 생성만 하고 버림
```

`useTabs` 훅 내부에서 core 인스턴스를 만들지만, 실제 로직은 React state로 다시 구현하고 있음.

### 2. 스타일이 컴포넌트에 직접 결합됨

```
src/patterns/tabs/Tabs.tsx     ← emotion styled-components가 컴포넌트와 섞여있음
src/patterns/_shared/styles.ts ← 디자인 토큰만 있음
```

라이브러리로 가져가려면 스타일을 분리해야 하는데, 현재는 styled-components가 컴포넌트 파일 안에 있어서 스타일만 교체하기 어려움.

### 3. Modal.core.ts는 DOM에 의존

```typescript
// Modal.core.ts
constructor(element: HTMLElement) {
  this.element = element;
  this.element.style.display = "none";  // DOM 직접 조작
}
```

"core"라고 했지만 DOM을 직접 조작해서 순수 로직이 아님.

### 4. 일관성 없는 패턴 구조

```
modal/
  ├── Modal.core.ts        ← DOM 의존
  ├── Modal.declarative.tsx
  ├── Modal.headless.tsx
  ├── Modal.hook.tsx
  └── Modal.promise.tsx

tabs/
  ├── Tabs.core.ts         ← 순수 로직 (미사용)
  ├── Tabs.tsx             ← 로직 + UI 혼합
  └── index.ts
```

---

## 제안 아키텍처

### 패키지 구조

```
packages/
├── @ui-patterns/core          ← 순수 로직 (바닐라 JS/TS)
│   └── src/
│       ├── tabs/
│       │   ├── tabs.ts        ← 상태 머신, 로직
│       │   └── types.ts       ← 타입 정의
│       └── modal/
│           ├── modal.ts
│           └── types.ts
│
├── @ui-patterns/react         ← React 전용 (독립적, core 미사용)
│   └── src/
│       ├── tabs/
│       │   ├── useTabs.ts     ← React hooks로 직접 구현
│       │   ├── Tabs.tsx       ← Headless 컴포넌트 (스타일 없음)
│       │   └── index.ts
│       └── modal/
│
└── @ui-patterns/examples      ← 데모 앱 (현재 프로젝트)
    └── src/
        ├── styles/            ← 프로젝트별 스타일
        └── App.tsx
```

### 설계 원칙

- **core**: 바닐라 JS/TS로 순수 로직 구현. 학습 목적으로만 사용 (export 안 함).
- **react**: React hooks와 headless 컴포넌트. 실제 라이브러리로 배포할 패키지.
- **examples**: 데모 앱. 이 레포에서 패턴을 보여주는 용도로만 사용.

---

## Core 패키지 설계 (학습용)

순수 함수와 타입만 포함. DOM, React 의존성 없음.
바닐라 JS/TS로 UI 패턴의 본질을 이해하기 위한 학습 목적.

```typescript
// @ui-patterns/core/tabs/types.ts
export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabsState {
  activeId: string | null;
  tabs: TabItem[];
}

export type TabsAction =
  | { type: 'SELECT'; id: string }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'FIRST' }
  | { type: 'LAST' };
```

```typescript
// @ui-patterns/core/tabs/tabs.ts
import { TabsState, TabsAction, TabItem } from './types';

export function createInitialState(tabs: TabItem[]): TabsState {
  return {
    activeId: tabs[0]?.id ?? null,
    tabs,
  };
}

export function tabsReducer(state: TabsState, action: TabsAction): TabsState {
  const enabledTabs = state.tabs.filter(t => !t.disabled);
  const currentIndex = enabledTabs.findIndex(t => t.id === state.activeId);

  switch (action.type) {
    case 'SELECT': {
      const tab = state.tabs.find(t => t.id === action.id);
      if (!tab || tab.disabled) return state;
      return { ...state, activeId: action.id };
    }
    case 'NEXT': {
      const nextIndex = (currentIndex + 1) % enabledTabs.length;
      return { ...state, activeId: enabledTabs[nextIndex].id };
    }
    case 'PREV': {
      const prevIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      return { ...state, activeId: enabledTabs[prevIndex].id };
    }
    case 'FIRST':
      return { ...state, activeId: enabledTabs[0]?.id ?? null };
    case 'LAST':
      return { ...state, activeId: enabledTabs[enabledTabs.length - 1]?.id ?? null };
    default:
      return state;
  }
}

// 키보드 이벤트 → action 매핑
export function getKeyboardAction(key: string): TabsAction | null {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return { type: 'NEXT' };
    case 'ArrowLeft':
    case 'ArrowUp':
      return { type: 'PREV' };
    case 'Home':
      return { type: 'FIRST' };
    case 'End':
      return { type: 'LAST' };
    default:
      return null;
  }
}
```

---

## React 패키지 설계 (배포용)

React 전용. Core를 사용하지 않고 독립적으로 구현.
실제로 다른 프로젝트에서 설치해서 사용할 라이브러리.

```typescript
// @ui-patterns/react/tabs/types.ts
export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}
```

```typescript
// @ui-patterns/react/tabs/useTabs.ts
import { useState, useCallback, KeyboardEvent } from 'react';
import { TabItem } from './types';

export function useTabs(initialTabs: TabItem[], initialActiveId?: string) {
  const [activeId, setActiveId] = useState<string | null>(
    initialActiveId ?? initialTabs[0]?.id ?? null
  );
  const [tabs, setTabs] = useState(initialTabs);

  const select = useCallback((id: string) => {
    const tab = tabs.find(t => t.id === id);
    if (tab && !tab.disabled) {
      setActiveId(id);
    }
  }, [tabs]);

  const selectNext = useCallback(() => {
    const enabledTabs = tabs.filter(t => !t.disabled);
    const currentIndex = enabledTabs.findIndex(t => t.id === activeId);
    const nextIndex = (currentIndex + 1) % enabledTabs.length;
    setActiveId(enabledTabs[nextIndex].id);
  }, [tabs, activeId]);

  const selectPrev = useCallback(() => {
    const enabledTabs = tabs.filter(t => !t.disabled);
    const currentIndex = enabledTabs.findIndex(t => t.id === activeId);
    const prevIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    setActiveId(enabledTabs[prevIndex].id);
  }, [tabs, activeId]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        selectNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        selectPrev();
        break;
      case 'Home':
        e.preventDefault();
        const firstEnabled = tabs.find(t => !t.disabled);
        if (firstEnabled) setActiveId(firstEnabled.id);
        break;
      case 'End':
        e.preventDefault();
        const lastEnabled = [...tabs].reverse().find(t => !t.disabled);
        if (lastEnabled) setActiveId(lastEnabled.id);
        break;
    }
  }, [tabs, selectNext, selectPrev]);

  return {
    activeId,
    tabs,
    setTabs,
    select,
    selectNext,
    selectPrev,
    handleKeyDown,
    isActive: (id: string) => activeId === id,
  };
}
```

```typescript
// @ui-patterns/react/tabs/Tabs.tsx
// Headless 컴포넌트 - 스타일 없음, 구조만 제공

import { forwardRef, ComponentPropsWithoutRef } from 'react';

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} role="tablist" {...props}>
      {children}
    </div>
  )
);

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ active, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={active ? 0 : -1}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  active?: boolean;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ active, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tabpanel"
      hidden={!active}
      {...props}
    >
      {children}
    </div>
  )
);
```

---

## 사용 예시 (다른 프로젝트에서)

`@ui-patterns/react`를 설치 후 스타일을 자유롭게 적용:

```tsx
// 내 프로젝트에서
import { useTabs, TabList, Tab, TabPanel } from '@ui-patterns/react';
import styled from '@emotion/styled';

const StyledTabList = styled(TabList)`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledTab = styled(Tab)<{ $active?: boolean }>`
  padding: 12px 16px;
  background: ${props => props.$active ? '#6750A4' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: none;
  cursor: pointer;
`;

function MyTabs() {
  const { activeId, tabs, select, handleKeyDown, isActive } = useTabs([
    { id: 'tab1', label: 'First' },
    { id: 'tab2', label: 'Second' },
    { id: 'tab3', label: 'Third' },
  ]);

  return (
    <>
      <StyledTabList>
        {tabs.map(tab => (
          <StyledTab
            key={tab.id}
            $active={isActive(tab.id)}
            onClick={() => select(tab.id)}
            onKeyDown={handleKeyDown}
          >
            {tab.label}
          </StyledTab>
        ))}
      </StyledTabList>

      <TabPanel active={activeId === 'tab1'}>First content</TabPanel>
      <TabPanel active={activeId === 'tab2'}>Second content</TabPanel>
      <TabPanel active={activeId === 'tab3'}>Third content</TabPanel>
    </>
  );
}
```

---

## 구현 단계

### Phase 1: 모노레포 설정
- [ ] pnpm workspace 설정
- [ ] 패키지 구조 생성 (core, react, examples)
- [ ] TypeScript, 빌드 설정

### Phase 2: Core 패키지 (학습용)
- [ ] Tabs core 로직 구현 (reducer 패턴)
- [ ] Modal core 로직 구현 (DOM 의존성 제거)
- [ ] 타입 정의
- [ ] 학습 노트/주석 추가

### Phase 3: React 패키지 (배포용)
- [ ] useTabs 훅 (순수 React)
- [ ] Headless Tabs 컴포넌트
- [ ] useModal 훅
- [ ] Headless Modal 컴포넌트
- [ ] npm 배포 설정

### Phase 4: Examples (데모용)
- [ ] 현재 앱을 examples 패키지로 이동
- [ ] React 패키지 사용하도록 리팩토링
- [ ] 각 패턴별 데모 페이지

---

## 참고 라이브러리

- [Radix UI](https://www.radix-ui.com/) - Headless 컴포넌트 예시
- [Headless UI](https://headlessui.com/) - Tailwind Labs의 headless 컴포넌트
- [Downshift](https://www.downshift-js.com/) - 로직/UI 분리 패턴
- [Zag.js](https://zagjs.com/) - Framework-agnostic 상태 머신
