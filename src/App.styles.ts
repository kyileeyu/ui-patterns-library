import styled from "@emotion/styled";
import { styles } from "./patterns/_shared/styles";

// 글로벌 스타일 (Modal backdrop/content)
export const GlobalStyles = styled.div`
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
    border-radius: ${styles.radius};
    min-width: 300px;
    max-width: 500px;
  }
`;

// 2컬럼 레이아웃
export const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const Sidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: ${styles.colors.surface};
  border-right: 1px solid ${styles.colors.outlineVariant};
  padding: 24px 0;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px 24px;
  border-bottom: 1px solid ${styles.colors.outlineVariant};
  margin-bottom: 16px;
`;

export const SidebarLogo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

export const SidebarTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${styles.colors.onSurface};
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
`;

export const SidebarItem = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.$active ? styles.colors.primaryContainer : "transparent")};
  color: ${(props) => (props.$active ? styles.colors.onPrimaryContainer : styles.colors.onSurfaceVariant)};
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${(props) => (props.$active ? styles.colors.primaryContainer : styles.colors.surfaceVariant)};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid ${styles.colors.outlineVariant};
  padding: 16px 32px;
`;

export const StickyHeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
  color: ${styles.colors.onSurface};
`;

export const PillTabList = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
`;

export const PillTab = styled.button<{ $active?: boolean }>`
  padding: 6px 16px;
  border: none;
  border-radius: 9999px;
  background: ${(props) => (props.$active ? styles.colors.primary : styles.colors.surfaceVariant)};
  color: ${(props) => (props.$active ? styles.colors.onPrimary : styles.colors.onSurfaceVariant)};
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${(props) => (props.$active ? styles.colors.primary : styles.colors.outline)};
    color: ${(props) => (props.$active ? styles.colors.onPrimary : "white")};
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

// 기존 Container (deprecated, 호환용)
export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: ${styles.colors.onSurface};
`;

// Priority Group 섹션
export const GroupSection = styled.section`
  margin-bottom: 48px;
`;

export const GroupTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
  color: ${styles.colors.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupDescription = styled.p`
  font-size: 14px;
  color: ${styles.colors.onSurfaceVariant};
  margin-bottom: 24px;
`;

// 패턴 섹션
export const PatternSection = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  border-radius: ${styles.radius};
  background: white;
  box-shadow: ${styles.shadow};
`;

export const PatternTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${styles.colors.onSurface};
`;

export const SubSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubSectionTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 12px;
  color: ${styles.colors.onSurfaceVariant};
`;

export const DemoRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const DemoCard = styled.div`
  padding: 16px;
  border: 1px solid ${styles.colors.outlineVariant};
  border-radius: ${styles.radius};
  background: white;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${styles.colors.primary};
  color: ${styles.colors.onPrimary};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  color: ${styles.colors.onSurfaceVariant};
  margin-right: 8px;
`;

export const ComingSoon = styled.div`
  padding: 24px;
  text-align: center;
  color: ${styles.colors.outline};
  font-style: italic;
  background: ${styles.colors.surfaceVariant};
  border-radius: ${styles.radius};
`;
