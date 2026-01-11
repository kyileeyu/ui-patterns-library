import styled from "@emotion/styled";
import { useState } from "react";
import { Modal as DeclarativeModal } from "./patterns/modal/Modal.declarative";
import { HeadlessExample } from "./patterns/modal/Modal.headless";
import { Badge } from "./patterns/badge/Badge";

// 글로벌 스타일 (Modal backdrop/content)
const GlobalStyles = styled.div`
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 24px;
    border-radius: 8px;
    min-width: 300px;
    max-width: 500px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #1a1a1a;
`;

const Section = styled.section`
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
`;

const SubSection = styled.div`
  margin-bottom: 24px;
`;

const SubSectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 12px;
  color: #666;
`;

const DemoRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const DemoCard = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #6200ee;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #5000d0;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 8px;
`;

const ComingSoon = styled.div`
  padding: 24px;
  text-align: center;
  color: #999;
  font-style: italic;
  background: #f5f5f5;
  border-radius: 8px;
`;

// Modal Declarative Example
function DeclarativeModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoCard>
      <SubSectionTitle>Declarative</SubSectionTitle>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <DeclarativeModal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Declarative Modal</h2>
        <p>props로 open/onClose를 전달하는 방식</p>
      </DeclarativeModal>
    </DemoCard>
  );
}

// Modal Headless Example
function HeadlessModalDemo() {
  return (
    <DemoCard>
      <SubSectionTitle>Headless (Compound)</SubSectionTitle>
      <HeadlessExample />
    </DemoCard>
  );
}

function App() {
  return (
    <GlobalStyles>
      <Container>
        <TitleWrapper>
          <Logo src="/Logo.png" alt="UI Patterns Library Logo" />
          <Title>UI Patterns Library</Title>
        </TitleWrapper>

        {/* Modal Section */}
        <Section>
          <SectionTitle>Modal</SectionTitle>
          <DemoRow>
            <DeclarativeModalDemo />
            <HeadlessModalDemo />
          </DemoRow>
        </Section>

        {/* Badge Section */}
        <Section>
          <SectionTitle>Badge</SectionTitle>

          <SubSection>
            <SubSectionTitle>Label Badge</SubSectionTitle>
            <DemoRow>
              <DemoCard>
                <Label>Small:</Label>
                <Badge type="LABEL" size="small">
                  {null}
                </Badge>
              </DemoCard>
              <DemoCard>
                <Label>Large:</Label>
                <Badge type="LABEL" size="large">
                  {null}
                </Badge>
              </DemoCard>
            </DemoRow>
          </SubSection>

          <SubSection>
            <SubSectionTitle>Number Badge</SubSectionTitle>
            <DemoRow>
              <DemoCard>
                <Label>Small (3):</Label>
                <Badge type="NUMBERS" size="small">
                  {3}
                </Badge>
              </DemoCard>
              <DemoCard>
                <Label>Large (42):</Label>
                <Badge type="NUMBERS" size="large">
                  {42}
                </Badge>
              </DemoCard>
              <DemoCard>
                <Label>Max (999, max=99):</Label>
                <Badge type="NUMBERS" size="large" max={99}>
                  {999}
                </Badge>
              </DemoCard>
            </DemoRow>
          </SubSection>
        </Section>

        {/* Switch Section */}
        <Section>
          <SectionTitle>Switch</SectionTitle>
          <ComingSoon>Coming Soon...</ComingSoon>
        </Section>
      </Container>
    </GlobalStyles>
  );
}

export default App;
