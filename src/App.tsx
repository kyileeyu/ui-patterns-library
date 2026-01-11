import { useState, ReactNode } from "react";
import { Modal as DeclarativeModal } from "./patterns/modal/Modal.declarative";
import { HeadlessExample } from "./patterns/modal/Modal.headless";
import { Badge } from "./patterns/badge/Badge";
import {
  GlobalStyles,
  AppLayout,
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarTitle,
  SidebarNav,
  SidebarItem,
  MainContent,
  StickyHeader,
  StickyHeaderTitle,
  PillTabList,
  PillTab,
  ContentArea,
  GroupSection,
  GroupTitle,
  GroupDescription,
  PatternSection,
  PatternTitle,
  SubSection,
  SubSectionTitle,
  DemoRow,
  DemoCard,
  Button,
  Label,
} from "./App.styles";

// 패턴 데모 컴포넌트들
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoRow>
      <DemoCard>
        <SubSectionTitle>Declarative</SubSectionTitle>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <DeclarativeModal open={isOpen} onClose={() => setIsOpen(false)}>
          <h2>Declarative Modal</h2>
          <p>props로 open/onClose를 전달하는 방식</p>
        </DeclarativeModal>
      </DemoCard>
      <DemoCard>
        <SubSectionTitle>Headless (Compound)</SubSectionTitle>
        <HeadlessExample />
      </DemoCard>
    </DemoRow>
  );
}

function BadgeDemo() {
  return (
    <>
      <SubSection>
        <SubSectionTitle>Label Badge</SubSectionTitle>
        <DemoRow>
          <DemoCard>
            <Label>Small:</Label>
            <Badge type="LABEL" size="small">{null}</Badge>
          </DemoCard>
          <DemoCard>
            <Label>Large:</Label>
            <Badge type="LABEL" size="large">{null}</Badge>
          </DemoCard>
        </DemoRow>
      </SubSection>
      <SubSection>
        <SubSectionTitle>Number Badge</SubSectionTitle>
        <DemoRow>
          <DemoCard>
            <Label>Small (3):</Label>
            <Badge type="NUMBERS" size="small">{3}</Badge>
          </DemoCard>
          <DemoCard>
            <Label>Large (42):</Label>
            <Badge type="NUMBERS" size="large">{42}</Badge>
          </DemoCard>
          <DemoCard>
            <Label>Max (999, max=99):</Label>
            <Badge type="NUMBERS" size="large" max={99}>{999}</Badge>
          </DemoCard>
        </DemoRow>
      </SubSection>
    </>
  );
}

// 패턴 타입 정의
interface Pattern {
  id: string;
  name: string;
  demo?: ReactNode;
}

interface PatternGroup {
  id: string;
  title: string;
  description: string;
  patterns: Pattern[];
}

// 그룹 데이터
const PATTERN_GROUPS: PatternGroup[] = [
  {
    id: "group-1",
    title: "Group 1: 오버레이 & 다이얼로그",
    description: "포커스 트랩, z-index, 접근성 등 가장 복잡한 패턴들",
    patterns: [
      { id: "modal", name: "Modal / Dialog", demo: <ModalDemo /> },
      { id: "alert-dialog", name: "Alert Dialog" },
      { id: "drawer", name: "Drawer / Sheet" },
      { id: "bottom-sheet", name: "Bottom Sheet" },
      { id: "popover", name: "Popover" },
      { id: "tooltip", name: "Tooltip" },
    ],
  },
  {
    id: "group-2",
    title: "Group 2: 폼 입력 & 선택",
    description: "실무에서 가장 많이 사용하는 기본 인터랙션",
    patterns: [
      { id: "radio", name: "Radio Button / Group" },
      { id: "checkbox", name: "Checkbox" },
      { id: "switch", name: "Switch / Toggle" },
      { id: "select", name: "Select / Dropdown" },
      { id: "combobox", name: "Combobox" },
      { id: "autocomplete", name: "Autocomplete" },
      { id: "menu", name: "Menu / Context Menu" },
      { id: "textfield", name: "Text Field / Input" },
      { id: "textarea", name: "Textarea" },
      { id: "datepicker", name: "Date & Time Picker" },
      { id: "spinbutton", name: "Spinbutton" },
      { id: "slider", name: "Slider" },
      { id: "multi-slider", name: "Multi-thumb Slider" },
    ],
  },
  {
    id: "group-3",
    title: "Group 3: 피드백 & 알림",
    description: "사용자에게 상태를 전달하는 패턴들",
    patterns: [
      { id: "toast", name: "Toast / Snackbar" },
      { id: "alert", name: "Alert / Notification" },
      { id: "badge", name: "Badge", demo: <BadgeDemo /> },
      { id: "progress", name: "Progress Bar" },
      { id: "spinner", name: "Circular Progress / Spinner" },
      { id: "skeleton", name: "Skeleton" },
      { id: "meter", name: "Meter" },
    ],
  },
  {
    id: "group-4",
    title: "Group 4: 네비게이션 & 레이아웃",
    description: "정보 구조와 이동",
    patterns: [
      { id: "tabs", name: "Tabs" },
      { id: "accordion", name: "Accordion" },
      { id: "disclosure", name: "Disclosure" },
      { id: "breadcrumb", name: "Breadcrumb" },
      { id: "pagination", name: "Pagination" },
      { id: "appbar", name: "App Bar (Top / Bottom)" },
      { id: "nav-drawer", name: "Navigation Drawer" },
      { id: "nav-rail", name: "Navigation Rail" },
      { id: "toolbar", name: "Toolbar" },
      { id: "menu-button", name: "Menu Button" },
      { id: "divider", name: "Divider" },
      { id: "splitter", name: "Window Splitter" },
      { id: "card", name: "Card" },
    ],
  },
  {
    id: "group-5",
    title: "Group 5: 복잡한 데이터 표시",
    description: "고급 인터랙션",
    patterns: [
      { id: "list", name: "List" },
      { id: "table", name: "Table" },
      { id: "grid", name: "Grid (Interactive)" },
      { id: "treegrid", name: "Treegrid" },
      { id: "treeview", name: "Tree View" },
      { id: "feed", name: "Feed" },
      { id: "infinite-scroll", name: "Infinite Scroll" },
      { id: "carousel", name: "Carousel" },
      { id: "virtual-list", name: "Virtualized List" },
    ],
  },
  {
    id: "group-6",
    title: "Group 6: 고급 인터랙션",
    description: "선택적 구현",
    patterns: [
      { id: "dnd", name: "Drag & Drop" },
      { id: "sortable", name: "Sortable List" },
      { id: "resizable", name: "Resizable" },
      { id: "file-upload", name: "File Upload" },
      { id: "search", name: "Search" },
      { id: "chips", name: "Chips" },
      { id: "color-picker", name: "Color Picker" },
      { id: "rich-text", name: "Rich Text Editor" },
    ],
  },
  {
    id: "group-7",
    title: "Group 7: 기본 빌딩 블록",
    description: "다른 패턴의 기초가 되는 것들",
    patterns: [
      { id: "button", name: "Button" },
      { id: "link", name: "Link" },
      { id: "icon-button", name: "Icon Button" },
      { id: "fab", name: "Floating Action Button (FAB)" },
      { id: "landmarks", name: "Landmarks" },
    ],
  },
];

// 데모가 있는 그룹/패턴만 필터링
const visibleGroups = PATTERN_GROUPS.filter((group) =>
  group.patterns.some((pattern) => pattern.demo)
);

function App() {
  const [activeGroupId, setActiveGroupId] = useState(visibleGroups[0]?.id);

  const currentGroup = visibleGroups.find((g) => g.id === activeGroupId);
  const currentPatterns = currentGroup?.patterns.filter((p) => p.demo) ?? [];

  const scrollToGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    const element = document.getElementById(groupId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPattern = (patternId: string) => {
    const element = document.getElementById(patternId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <GlobalStyles>
      <AppLayout>
        {/* 사이드바 */}
        <Sidebar>
          <SidebarHeader>
            <SidebarLogo src="/Logo.png" alt="Logo" />
            <SidebarTitle>UI Patterns</SidebarTitle>
          </SidebarHeader>
          <SidebarNav>
            {visibleGroups.map((group) => (
              <SidebarItem
                key={group.id}
                $active={activeGroupId === group.id}
                onClick={() => scrollToGroup(group.id)}
              >
                {group.title.replace("Group ", "").replace(":", " -")}
              </SidebarItem>
            ))}
          </SidebarNav>
        </Sidebar>

        {/* 메인 콘텐츠 */}
        <MainContent>
          {/* Sticky 헤더 */}
          <StickyHeader>
            <StickyHeaderTitle>{currentGroup?.title}</StickyHeaderTitle>
            <PillTabList>
              {currentPatterns.map((pattern) => (
                <PillTab
                  key={pattern.id}
                  $active={false}
                  onClick={() => scrollToPattern(pattern.id)}
                >
                  {pattern.name}
                </PillTab>
              ))}
            </PillTabList>
          </StickyHeader>

          {/* 콘텐츠 영역 */}
          <ContentArea>
            {visibleGroups.map((group) => (
              <GroupSection key={group.id} id={group.id}>
                <GroupTitle>{group.title}</GroupTitle>
                <GroupDescription>{group.description}</GroupDescription>

                {group.patterns
                  .filter((pattern) => pattern.demo)
                  .map((pattern) => (
                    <PatternSection key={pattern.id} id={pattern.id}>
                      <PatternTitle>{pattern.name}</PatternTitle>
                      {pattern.demo}
                    </PatternSection>
                  ))}
              </GroupSection>
            ))}
          </ContentArea>
        </MainContent>
      </AppLayout>
    </GlobalStyles>
  );
}

export default App;
