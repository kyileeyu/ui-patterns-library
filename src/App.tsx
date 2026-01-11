import { useState, ReactNode } from "react";
import { Modal as DeclarativeModal } from "./patterns/modal/Modal.declarative";
import { HeadlessExample } from "./patterns/modal/Modal.headless";
import { Badge } from "./patterns/badge/Badge";
import {
  GlobalStyles,
  Container,
  TitleWrapper,
  Logo,
  Title,
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
  name: string;
  demo?: ReactNode;
}

interface PatternGroup {
  title: string;
  description: string;
  patterns: Pattern[];
}

// 그룹 데이터
const PATTERN_GROUPS: PatternGroup[] = [
  {
    title: "Group 1: 오버레이 & 다이얼로그",
    description: "포커스 트랩, z-index, 접근성 등 가장 복잡한 패턴들",
    patterns: [
      { name: "Modal / Dialog", demo: <ModalDemo /> },
      { name: "Alert Dialog" },
      { name: "Drawer / Sheet" },
      { name: "Bottom Sheet" },
      { name: "Popover" },
      { name: "Tooltip" },
    ],
  },
  {
    title: "Group 2: 폼 입력 & 선택",
    description: "실무에서 가장 많이 사용하는 기본 인터랙션",
    patterns: [
      { name: "Radio Button / Group" },
      { name: "Checkbox" },
      { name: "Switch / Toggle" },
      { name: "Select / Dropdown" },
      { name: "Combobox" },
      { name: "Autocomplete" },
      { name: "Menu / Context Menu" },
      { name: "Text Field / Input" },
      { name: "Textarea" },
      { name: "Date & Time Picker" },
      { name: "Spinbutton" },
      { name: "Slider" },
      { name: "Multi-thumb Slider" },
    ],
  },
  {
    title: "Group 3: 피드백 & 알림",
    description: "사용자에게 상태를 전달하는 패턴들",
    patterns: [
      { name: "Toast / Snackbar" },
      { name: "Alert / Notification" },
      { name: "Badge", demo: <BadgeDemo /> },
      { name: "Progress Bar" },
      { name: "Circular Progress / Spinner" },
      { name: "Skeleton" },
      { name: "Meter" },
    ],
  },
  {
    title: "Group 4: 네비게이션 & 레이아웃",
    description: "정보 구조와 이동",
    patterns: [
      { name: "Tabs" },
      { name: "Accordion" },
      { name: "Disclosure" },
      { name: "Breadcrumb" },
      { name: "Pagination" },
      { name: "App Bar (Top / Bottom)" },
      { name: "Navigation Drawer" },
      { name: "Navigation Rail" },
      { name: "Toolbar" },
      { name: "Menu Button" },
      { name: "Divider" },
      { name: "Window Splitter" },
      { name: "Card" },
    ],
  },
  {
    title: "Group 5: 복잡한 데이터 표시",
    description: "고급 인터랙션",
    patterns: [
      { name: "List" },
      { name: "Table" },
      { name: "Grid (Interactive)" },
      { name: "Treegrid" },
      { name: "Tree View" },
      { name: "Feed" },
      { name: "Infinite Scroll" },
      { name: "Carousel" },
      { name: "Virtualized List" },
    ],
  },
  {
    title: "Group 6: 고급 인터랙션",
    description: "선택적 구현",
    patterns: [
      { name: "Drag & Drop" },
      { name: "Sortable List" },
      { name: "Resizable" },
      { name: "File Upload" },
      { name: "Search" },
      { name: "Chips" },
      { name: "Color Picker" },
      { name: "Rich Text Editor" },
    ],
  },
  {
    title: "Group 7: 기본 빌딩 블록",
    description: "다른 패턴의 기초가 되는 것들",
    patterns: [
      { name: "Button" },
      { name: "Link" },
      { name: "Icon Button" },
      { name: "Floating Action Button (FAB)" },
      { name: "Landmarks" },
    ],
  },
];

function App() {
  return (
    <GlobalStyles>
      <Container>
        <TitleWrapper>
          <Logo src="/Logo.png" alt="UI Patterns Library Logo" />
          <Title>UI Patterns Library</Title>
        </TitleWrapper>

        {PATTERN_GROUPS.filter((group) =>
          group.patterns.some((pattern) => pattern.demo)
        ).map((group) => (
          <GroupSection key={group.title}>
            <GroupTitle>{group.title}</GroupTitle>
            <GroupDescription>{group.description}</GroupDescription>

            {group.patterns
              .filter((pattern) => pattern.demo)
              .map((pattern) => (
                <PatternSection key={pattern.name}>
                  <PatternTitle>{pattern.name}</PatternTitle>
                  {pattern.demo}
                </PatternSection>
              ))}
          </GroupSection>
        ))}
      </Container>
    </GlobalStyles>
  );
}

export default App;
