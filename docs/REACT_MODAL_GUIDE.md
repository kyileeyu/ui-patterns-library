# React Modal 구현 가이드

> 2가지 접근 방식으로 React Modal을 구현하고 비교한다

---

## 🎯 목표

1. **Core 활용 방식**: 바닐라 Modal 클래스를 React로 래핑 (Framework-agnostic)
2. **React 전용 방식**: React Hook으로 모든 로직 직접 구현 (현업 스타일)

**둘 다 만들어보고 비교하며 배운다!**

---

## 📋 전체 구현 계획

### Phase 1: Core 활용 (v1~v4)
```
React v1: 선언적 API (Declarative) - Core 래핑
  ↓
React v2: Promise 기반 API (Imperative) - Core 래핑
  ↓
React v3: Hook 기반 API - Core 래핑
  ↓
React v4: Headless 컴포넌트 - Core 래핑
```

### Phase 2: React 전용 (v5~v8)
```
React v5: 선언적 API - Pure React
  ↓
React v6: Promise 기반 API - Pure React
  ↓
React v7: Hook 기반 API - Pure React
  ↓
React v8: Headless 컴포넌트 - Pure React
```

### Phase 3: 비교 & 분석
- 코드량 비교
- 복잡도 비교
- 유지보수성 비교
- 성능 비교
- 트레이드오프 문서화

---

## 🔥 React v1: 선언적 API

### 목표
가장 React스러운 방식. JSX로 모달 구조를 선언하고 props로 제어.

### 구현 내용

```tsx
// packages/patterns/modal/react/declarative.tsx

import { useEffect, useRef } from 'react'
import { Modal as CoreModal } from '../core'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<CoreModal | null>(null)

  // 1. DOM 마운트 후 Modal 인스턴스 생성
  useEffect(() => {
    if (modalRef.current) {
      instanceRef.current = new CoreModal(modalRef.current)
    }

    // cleanup: 컴포넌트 언마운트 시 리소스 정리
    return () => {
      // v2에서 destroy 메서드 추가 예정
    }
  }, [])

  // 2. open prop 변경 시 모달 열기/닫기
  useEffect(() => {
    if (!instanceRef.current) return

    if (open) {
      instanceRef.current.open()
    } else {
      instanceRef.current.close()
    }
  }, [open])

  return (
    <div ref={modalRef} className={className}>
      {children}
    </div>
  )
}
```

### 사용 예제

```tsx
// 사용하는 쪽
function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>제목</h2>
        <p>내용</p>
        <button onClick={() => setIsOpen(false)}>닫기</button>
      </Modal>
    </>
  )
}
```

### 배울 점

1. **useRef 2가지 용도**
   - `modalRef`: DOM 요소 참조
   - `instanceRef`: Modal 인스턴스 참조 (리렌더링 시에도 유지)

2. **useEffect cleanup**
   - 컴포넌트 언마운트 시 이벤트 리스너 제거 필요
   - 메모리 누수 방지

3. **React의 선언적 특성**
   - UI 상태를 JSX로 선언
   - 상태 변경 → 자동 리렌더링

### 트레이드오프

- ✅ React스러움, 직관적, 타입 안전
- ❌ JSX 구조 강제, 동적 모달 생성 불편 (여러 곳에서 동시에 호출 시)

---

## 🚀 React v2: Promise 기반 API

### 목표
JSX 없이 함수 호출만으로 모달 사용. 결과를 `await`로 받기.

### 구현 내용

```tsx
// packages/patterns/modal/react/promise.tsx

import { createRoot, Root } from 'react-dom/client'
import { Modal as CoreModal } from '../core'

interface ModalOptions {
  title?: string
  content: React.ReactNode
  confirmText?: string
  cancelText?: string
}

interface ModalResult {
  confirmed: boolean
  value?: any
}

export function modal(options: ModalOptions): Promise<ModalResult> {
  return new Promise((resolve) => {
    // 1. 모달을 렌더링할 컨테이너 생성
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 2. React root 생성
    const root = createRoot(container)

    // 3. 닫기 핸들러
    const handleClose = (confirmed: boolean, value?: any) => {
      // 모달 닫기
      root.unmount()
      document.body.removeChild(container)

      // Promise resolve
      resolve({ confirmed, value })
    }

    // 4. 모달 렌더링
    root.render(
      <ModalContent
        {...options}
        onConfirm={() => handleClose(true)}
        onCancel={() => handleClose(false)}
      />
    )
  })
}

// 내부 컴포넌트
function ModalContent({
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel
}: ModalOptions & {
  onConfirm: () => void
  onCancel: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<CoreModal | null>(null)

  useEffect(() => {
    if (modalRef.current) {
      instanceRef.current = new CoreModal(modalRef.current)
      instanceRef.current.open()
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.close()
      }
    }
  }, [])

  return (
    <div ref={modalRef} className="modal">
      {title && <h2>{title}</h2>}
      <div className="modal-content">{content}</div>
      <div className="modal-actions">
        <button onClick={onCancel}>{cancelText}</button>
        <button onClick={onConfirm}>{confirmText}</button>
      </div>
    </div>
  )
}
```

### 사용 예제

```tsx
// 사용하는 쪽
async function handleDelete() {
  const result = await modal({
    title: '삭제 확인',
    content: '정말 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소'
  })

  if (result.confirmed) {
    // 삭제 로직
    await deleteItem()
  }
}

// 컴포넌트 어디서나
<button onClick={handleDelete}>삭제</button>
```

### 배울 점

1. **React Portal 없이 동적 렌더링**
   - `createRoot` + `document.body.appendChild`
   - 컴포넌트 트리 밖에서 모달 생성

2. **Promise 패턴**
   - 사용자 액션을 기다림
   - `async/await`로 순차적 로직 작성 가능

3. **메모리 관리**
   - `root.unmount()` + `removeChild()` 필수
   - 모달 닫을 때 컨테이너 제거

### 트레이드오프

- ✅ JSX 불필요, 간결한 호출, 순차 로직 작성 용이
- ❌ 외부 상태 접근 어려움 (React Context 등), SSR 불가

---

## 🎨 React v3: Hook 기반 API

### 목표
Hook으로 모달 상태를 관리. v2 Promise 기반 위에 Hook을 얹는다.

### 구현 내용

```tsx
// packages/patterns/modal/react/hook.tsx

import { useState, useCallback } from 'react'
import { modal as promiseModal, ModalOptions, ModalResult } from './promise'

export function useModal() {
  const [isLoading, setIsLoading] = useState(false)

  const open = useCallback(async (options: ModalOptions): Promise<ModalResult> => {
    setIsLoading(true)

    try {
      const result = await promiseModal(options)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    open,
    isLoading
  }
}
```

### 사용 예제

```tsx
// 사용하는 쪽
function App() {
  const { open, isLoading } = useModal()

  const handleDelete = async () => {
    const result = await open({
      title: '삭제 확인',
      content: '정말 삭제하시겠습니까?'
    })

    if (result.confirmed) {
      await deleteItem()
    }
  }

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      삭제
    </button>
  )
}
```

### 배울 점

1. **Hook Wrapper 패턴**
   - 기존 함수를 Hook으로 래핑
   - 추가 상태(loading) 관리

2. **useCallback**
   - 함수 참조 안정화
   - 불필요한 리렌더링 방지

### 트레이드오프

- ✅ React Hook 생태계 통합, 로딩 상태 관리 용이
- ❌ Hook 규칙 따라야 함 (컴포넌트 최상위에서만 호출)

---

## 🧩 React v4: Headless 컴포넌트

### 목표
구조만 제공하고 스타일/레이아웃은 사용자가 자유롭게. Radix UI 스타일.

### 구현 내용

```tsx
// packages/patterns/modal/react/headless.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  cloneElement,
  isValidElement
} from 'react'
import { Modal as CoreModal } from '../core'

// Context로 상태 공유
interface ModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal 컴포넌트는 Modal.Root 내부에서 사용해야 합니다')
  }
  return context
}

// Root: 상태 관리
interface RootProps {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, defaultOpen = false, onOpenChange }: RootProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = () => {
    setIsOpen(true)
    onOpenChange?.(true)
  }

  const close = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

// Trigger: 모달 여는 버튼
interface TriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

function Trigger({ children, asChild }: TriggerProps) {
  const { open } = useModalContext()

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: open
    } as any)
  }

  return <button onClick={open}>{children}</button>
}

// Content: 모달 내용
interface ContentProps {
  children: React.ReactNode
  className?: string
}

function Content({ children, className }: ContentProps) {
  const { isOpen } = useModalContext()
  const modalRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<CoreModal | null>(null)

  useEffect(() => {
    if (modalRef.current) {
      instanceRef.current = new CoreModal(modalRef.current)
    }
  }, [])

  useEffect(() => {
    if (!instanceRef.current) return

    if (isOpen) {
      instanceRef.current.open()
    } else {
      instanceRef.current.close()
    }
  }, [isOpen])

  return (
    <div ref={modalRef} className={className}>
      {children}
    </div>
  )
}

// Close: 닫기 버튼
interface CloseProps {
  children: React.ReactElement
  asChild?: boolean
}

function Close({ children, asChild }: CloseProps) {
  const { close } = useModalContext()

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: close
    } as any)
  }

  return <button onClick={close}>{children}</button>
}

// Export as namespace
export const Modal = {
  Root,
  Trigger,
  Content,
  Close
}
```

### 사용 예제

```tsx
// 사용하는 쪽 - 완전한 커스터마이징
function App() {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <button className="my-custom-button">
          모달 열기
        </button>
      </Modal.Trigger>

      <Modal.Content className="my-modal-style">
        <h2>커스텀 제목</h2>
        <p>원하는 스타일로 자유롭게</p>

        <Modal.Close asChild>
          <button className="my-close-button">닫기</button>
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  )
}
```

### 배울 점

1. **Compound Components 패턴**
   - 여러 컴포넌트가 Context로 상태 공유
   - `Modal.Root`, `Modal.Trigger` 형태

2. **asChild 패턴** (Radix UI)
   - `asChild={true}`: 자식 요소에 props 전달 (`cloneElement`)
   - 사용자가 원하는 요소를 트리거로 사용 가능

3. **제어/비제어 모드**
   - `defaultOpen`: 비제어 모드 (내부 상태)
   - `onOpenChange`: 제어 모드 (외부 상태)

### 트레이드오프

- ✅ 최대 자유도, 스타일 강제 없음, 접근성 자동 제공
- ❌ 러닝 커브, 보일러플레이트 증가, 잘못 사용 시 깨짐

---

## 📊 4가지 패턴 비교표

| 항목 | v1 선언적 | v2 Promise | v3 Hook | v4 Headless |
|-----|----------|-----------|---------|-------------|
| **사용 난이도** | ⭐ 쉬움 | ⭐⭐ 보통 | ⭐⭐ 보통 | ⭐⭐⭐ 어려움 |
| **React스러움** | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **커스터마이징** | ⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **타입 안전성** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **코드량** | 적음 | 보통 | 적음 | 많음 |
| **동적 생성** | 어려움 | 쉬움 | 쉬움 | 보통 |
| **SSR 지원** | ✅ | ❌ | ❌ | ✅ |
| **Context 접근** | ✅ | ❌ | ✅ | ✅ |

---

## 🎯 언제 어떤 패턴을 쓸까?

### v1 선언적 API
- 페이지당 고정된 모달 1개 (설정 모달, 프로필 모달)
- 컴포넌트 구조가 복잡한 경우
- SSR 필수

### v2 Promise API
- `confirm`, `alert` 대체
- 사용자 확인이 필요한 액션 (삭제, 로그아웃)
- 간단한 입력 받기

### v3 Hook API
- Promise API + 로딩 상태 필요
- React Hook과 통합된 로직
- 여러 모달을 Hook으로 관리

### v4 Headless
- 디자인 시스템 구축
- 완전한 커스터마이징 필요
- 접근성 자동화하면서 스타일은 자유롭게

---

## 📝 구현 체크리스트

### Phase 1: Core 활용 방식 (v1~v4)

#### React v1: 선언적 API (Core 래핑)
- [ ] `Modal` 컴포넌트 구현 (`open`, `onClose` props)
- [ ] useRef로 DOM 참조 → Core Modal에 전달
- [ ] useEffect로 Core Modal 연동
- [ ] cleanup 함수 작성
- [ ] 예제 앱에서 테스트

#### React v2: Promise API (Core 래핑)
- [ ] `modal()` 함수 구현
- [ ] `createRoot` + 동적 DOM 생성
- [ ] Core Modal 인스턴스 생성 및 연동
- [ ] Promise로 결과 반환
- [ ] unmount + cleanup
- [ ] 예제 앱에서 테스트

#### React v3: Hook API (Core 래핑)
- [ ] `useModal` Hook 구현
- [ ] Promise API 래핑
- [ ] 로딩 상태 추가
- [ ] useCallback 최적화
- [ ] 예제 앱에서 테스트

#### React v4: Headless (Core 래핑)
- [ ] Context 설정
- [ ] Root, Trigger, Content, Close 컴포넌트
- [ ] Core Modal과 연동
- [ ] asChild 패턴 구현
- [ ] Compound Components 구조
- [ ] 예제 앱에서 테스트

### Phase 2: React 전용 방식 (v5~v8)

#### React v5: 선언적 API (Pure React)
- [ ] `Modal` 컴포넌트 구현
- [ ] useEffect로 ScrollLock 직접 구현
- [ ] useEffect로 ESC 키 리스너 직접 구현
- [ ] 배경 클릭 닫기 직접 구현
- [ ] cleanup 함수 작성
- [ ] 예제 앱에서 테스트

#### React v6: Promise API (Pure React)
- [ ] `modal()` 함수 구현
- [ ] `createRoot` + 동적 DOM 생성
- [ ] ScrollLock, ESC 키 등 모든 로직 React로 직접 구현
- [ ] Promise로 결과 반환
- [ ] unmount + cleanup
- [ ] 예제 앱에서 테스트

#### React v7: Hook API (Pure React)
- [ ] `useModal` Hook 구현
- [ ] Promise API 래핑
- [ ] 로딩 상태 추가
- [ ] useCallback 최적화
- [ ] 예제 앱에서 테스트

#### React v8: Headless (Pure React)
- [ ] Context 설정
- [ ] Root, Trigger, Content, Close 컴포넌트
- [ ] ScrollLock, FocusTrap 등 모든 로직 React Hook으로 구현
- [ ] asChild 패턴 구현
- [ ] Compound Components 구조
- [ ] 예제 앱에서 테스트

### Phase 3: 비교 & 분석
- [ ] 코드량 비교 (LOC)
- [ ] 복잡도 비교 (순환 복잡도, 의존성)
- [ ] 유지보수성 비교 (수정 시 영향 범위)
- [ ] 번들 크기 비교
- [ ] 메모리 사용량 비교
- [ ] 렌더링 성능 비교
- [ ] 트레이드오프 문서 작성 (`COMPARISON.md`)

---

## 🚀 시작하기

**추천 순서:**

### Phase 1: Core 활용 (4~6일)
1. **v1부터 시작** - Core 래핑 기본기
2. **v2** - Promise 패턴 + Core 연동
3. **v3** - v2를 Hook으로 래핑
4. **v4** - Headless + Core 연동

### Phase 2: React 전용 (4~6일)
5. **v5** - Pure React로 다시 구현
6. **v6** - Promise API 순수 React
7. **v7** - Hook API 순수 React
8. **v8** - Headless 순수 React

### Phase 3: 비교 (1~2일)
9. **분석 및 문서화** - 두 방식의 차이점 정리

**각 버전 완료 후:**
- 예제 앱에서 실제 사용
- 트레이드오프 경험하고 기록
- 다음 버전과 비교하며 인사이트 도출

---

## 🔥 Phase 2: React 전용 방식 (v5~v8)

> Core 없이 모든 로직을 React Hook으로 직접 구현 (현업 스타일)

---

## React v5: 선언적 API (Pure React)

### 목표
Core Modal 없이 React만으로 모달의 모든 기능 구현.

### 구현 내용

```tsx
// packages/patterns/modal/react/pure-declarative.tsx

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  // 1. ScrollLock 구현
  useEffect(() => {
    if (!open) return

    // 스크롤바 너비 계산
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // body 스크롤 막기
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  // 2. ESC 키 닫기
  useEffect(() => {
    if (!open || !onClose) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  // 3. 배경 클릭 닫기
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }, [onClose])

  if (!open) return null

  // 4. Portal로 body에 렌더링
  return createPortal(
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        className={className}
        role="dialog"
        aria-modal="true"
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%'
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
```

### 사용 예제

```tsx
function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Pure React Modal</h2>
        <p>Core 없이 React만으로 구현!</p>
        <button onClick={() => setIsOpen(false)}>닫기</button>
      </Modal>
    </>
  )
}
```

### 배울 점

1. **useEffect로 Side Effect 관리**
   - ScrollLock, 이벤트 리스너 등 모두 useEffect로
   - cleanup 함수로 메모리 누수 방지

2. **React Portal**
   - `createPortal`로 body에 직접 렌더링
   - 부모 컴포넌트 스타일에 영향받지 않음

3. **인라인 스타일링**
   - 기본 스타일을 컴포넌트에 포함
   - className으로 커스터마이징 허용

### Core 방식과 비교

| 항목 | Core 래핑 (v1) | Pure React (v5) |
|-----|---------------|-----------------|
| **코드 위치** | Core + React | React만 |
| **로직** | Core 클래스 | useEffect Hook |
| **재사용** | Vue/Svelte 가능 | React만 |
| **코드량** | React 부분 짧음 | React 부분 김 |
| **이해하기** | 2개 파일 봐야 함 | 1개 파일로 완결 |

---

## React v6: Promise API (Pure React)

### 목표
함수 호출로 모달 열기. Core 없이 모든 로직 React로 구현.

### 구현 내용

```tsx
// packages/patterns/modal/react/pure-promise.tsx

import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'

interface ModalOptions {
  title?: string
  content: React.ReactNode
  confirmText?: string
  cancelText?: string
}

interface ModalResult {
  confirmed: boolean
}

export function modal(options: ModalOptions): Promise<ModalResult> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)

    const handleClose = (confirmed: boolean) => {
      root.unmount()
      document.body.removeChild(container)
      resolve({ confirmed })
    }

    root.render(
      <ModalContent {...options} onClose={handleClose} />
    )
  })
}

function ModalContent({
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onClose
}: ModalOptions & { onClose: (confirmed: boolean) => void }) {
  // ScrollLock
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  // ESC 키
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onClick={() => onClose(false)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '400px'
        }}
      >
        {title && <h2>{title}</h2>}
        <div>{content}</div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button onClick={() => onClose(false)}>{cancelText}</button>
          <button onClick={() => onClose(true)}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
```

### 사용 예제

```tsx
async function handleDelete() {
  const result = await modal({
    title: '삭제 확인',
    content: '정말 삭제하시겠습니까?',
  })

  if (result.confirmed) {
    await deleteItem()
  }
}
```

---

## React v7 & v8: Hook + Headless (Pure React)

v7은 v6를 useModal Hook으로 래핑, v8은 v5를 Compound Components로 변환.
구현 패턴은 v3, v4와 동일하되 Core 대신 Pure React 로직 사용.

---

## 📊 Core 방식 vs React 전용 비교

### 코드량

| 구현 | Core 방식 | React 전용 |
|-----|----------|-----------|
| **선언적 API** | ~40줄 | ~80줄 |
| **Promise API** | ~60줄 | ~100줄 |
| **Hook API** | ~30줄 | ~50줄 |
| **Headless** | ~120줄 | ~150줄 |
| **Core 로직** | ~100줄 | 0줄 |
| **총합** | ~350줄 | ~380줄 |

### 장단점

#### Core 활용 방식 (v1~v4)
- ✅ 로직 재사용 (Vue, Svelte 등)
- ✅ React 코드 간결
- ✅ Framework-agnostic
- ❌ 2개 레이어 (Core + React)
- ❌ 러닝 커브 (Core 이해 필요)

#### React 전용 방식 (v5~v8)
- ✅ 1개 레이어 (React만)
- ✅ React Hook 패턴 활용
- ✅ 현업에서 흔한 패턴
- ✅ 이해하기 쉬움
- ❌ 로직 중복 (프레임워크마다 재구현)
- ❌ React 외 재사용 불가

---

## 📚 참고 자료

- [React Hooks 공식 문서](https://react.dev/reference/react)
- [React Portal](https://react.dev/reference/react-dom/createPortal)
- [Radix UI](https://www.radix-ui.com/) - Headless 컴포넌트 참고
- [React createRoot](https://react.dev/reference/react-dom/client/createRoot)
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)

---

**Good luck!** 🎉
- Phase 1 (v1~v4): Core 활용 방식
- Phase 2 (v5~v8): React 전용 방식
- Phase 3: 비교 분석 및 인사이트 도출

두 방식을 모두 경험하고 트레이드오프를 체감해보세요!
