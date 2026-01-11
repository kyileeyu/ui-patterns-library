# 갤러리 레이아웃 구현 스펙

## 개요

스크롤 기반 네비게이션 + Sticky 헤더 조합의 패턴 갤러리 레이아웃

## 목표 UX

```
┌─────────────────────────────────────────────────────────┐
│  Logo  UI Patterns Library                              │
├──────────┬──────────────────────────────────────────────┤
│          │  ┌─────────────────────────────────────┐     │
│ Group 1  │  │ [Modal] [Alert] [Drawer] ...  ← Pill Tabs │
│ Group 2  │  │        (Sticky Header)              │     │
│ Group 3● │  └─────────────────────────────────────┘     │
│ Group 4  │                                              │
│ Group 5  │  ┌─────────────────────────────────────┐     │
│ Group 6  │  │  Badge Demo                         │     │
│ Group 7  │  │  ┌─────┐ ┌─────┐ ┌─────┐           │     │
│          │  │  │  3  │ │ 42  │ │ 99+ │           │     │
│  ↑       │  │  └─────┘ └─────┘ └─────┘           │     │
│ Sidebar  │  └─────────────────────────────────────┘     │
│          │                                              │
│          │  ↓ 스크롤하면 다음 패턴들...                  │
└──────────┴──────────────────────────────────────────────┘
```

## 동작 설명

1. **사이드바**: 현재 스크롤 위치에 해당하는 그룹 하이라이트
2. **Sticky 헤더**: 현재 그룹의 패턴들을 Pill 탭으로 표시, 현재 보이는 패턴 활성화
3. **스크롤 연동**: 스크롤 시 사이드바/헤더 자동 업데이트
4. **클릭 네비게이션**: 사이드바/탭 클릭 시 해당 섹션으로 스크롤

---

## 필요한 UI 패턴

| 패턴 | 용도 | 우선순위 |
|------|------|----------|
| **Navigation Drawer (Sidebar)** | 그룹 네비게이션 | 1 |
| **Tabs (Pill 형태)** | 패턴 네비게이션 | 1 |
| **Scroll Spy** | 스크롤 위치 감지 | 1 (유틸리티) |

### 추가로 활용되는 것들 (이미 있거나 CSS로 처리)

- Sticky positioning (CSS)
- Smooth scroll (CSS/JS)
- Intersection Observer (Scroll Spy 구현용)

---

## 구현 단계

### Phase 1: 레이아웃 구조 잡기
- [ ] 사이드바 + 메인 콘텐츠 2컬럼 레이아웃
- [ ] Sticky 헤더 영역 추가
- [ ] 기본 스타일링

### Phase 2: Navigation Drawer 패턴 구현
> `src/patterns/navigation-drawer/` 에 재사용 가능한 패턴으로 구현

- [ ] NavigationDrawer.core.ts - 순수 로직
- [ ] NavigationDrawer.tsx - React 컴포넌트
- [ ] 그룹 목록 렌더링
- [ ] 클릭 시 해당 그룹으로 스크롤
- [ ] 활성 그룹 하이라이트 스타일
- [ ] App.tsx에 적용

### Phase 3: Tabs 패턴 구현 (Pill 스타일)
> `src/patterns/tabs/` 에 재사용 가능한 패턴으로 구현

- [ ] Tabs.core.ts - 순수 로직
- [ ] Tabs.tsx - React 컴포넌트 (variant: pill)
- [ ] 현재 그룹의 패턴 목록을 Pill 탭으로 렌더링
- [ ] 클릭 시 해당 패턴으로 스크롤
- [ ] 활성 패턴 하이라이트 스타일
- [ ] Sticky 동작 적용
- [ ] App.tsx에 적용

### Phase 4: Scroll Spy 훅 구현
> `src/hooks/useScrollSpy.ts` 유틸리티 훅으로 구현

- [ ] Intersection Observer로 현재 보이는 섹션 감지
- [ ] 그룹 변경 시 사이드바 업데이트
- [ ] 패턴 변경 시 Pill 탭 업데이트
- [ ] 헤더의 그룹 타이틀 업데이트

---

## 기술 구현 상세

### 1. Scroll Spy (핵심 유틸리티)

```typescript
// useScrollSpy.ts
function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // 상단 20% 지점에서 활성화
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

### 2. 레이아웃 구조

```tsx
<AppLayout>
  <Sidebar>
    {groups.map(group => (
      <SidebarItem
        key={group.id}
        active={activeGroupId === group.id}
        onClick={() => scrollToGroup(group.id)}
      />
    ))}
  </Sidebar>

  <MainContent>
    <StickyHeader>
      <GroupTitle>{currentGroup.title}</GroupTitle>
      <PillTabs>
        {currentGroup.patterns.map(pattern => (
          <PillTab
            key={pattern.id}
            active={activePatternId === pattern.id}
            onClick={() => scrollToPattern(pattern.id)}
          />
        ))}
      </PillTabs>
    </StickyHeader>

    <ContentArea>
      {groups.map(group => (
        <GroupSection id={group.id}>
          {group.patterns.map(pattern => (
            <PatternSection id={pattern.id}>
              {pattern.demo}
            </PatternSection>
          ))}
        </GroupSection>
      ))}
    </ContentArea>
  </MainContent>
</AppLayout>
```

### 3. CSS 핵심

```css
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid #eee;
}

.pill-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.pill-tab {
  padding: 6px 16px;
  border-radius: 9999px;
  background: transparent;

  &.active {
    background: var(--primary);
    color: white;
  }
}
```

---

## 파일 구조 (예상)

```
src/
├── App.tsx                    # 메인 앱 (레이아웃 적용)
├── App.styles.ts              # 레이아웃 스타일
├── hooks/
│   └── useScrollSpy.ts        # 스크롤 감지 훅
└── patterns/
    ├── _shared/
    │   └── styles.ts          # 공통 스타일 토큰
    ├── navigation-drawer/     # Phase 2
    │   ├── NavigationDrawer.core.ts
    │   └── NavigationDrawer.tsx
    ├── tabs/                  # Phase 3
    │   ├── Tabs.core.ts
    │   └── Tabs.tsx
    ├── modal/                 # 기존
    ├── badge/                 # 기존
    └── ...
```

---

## 체크리스트

- [ ] Phase 1: 레이아웃 구조
- [ ] Phase 2: Sidebar
- [ ] Phase 3: Pill Tabs + Sticky Header
- [ ] Phase 4: Scroll Spy 연동
- [ ] 반응형 처리 (모바일에서 사이드바 숨김)
