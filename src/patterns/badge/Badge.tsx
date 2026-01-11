import React from "react";
import { styles } from "../_shared/styles";
import styled from "@emotion/styled";

interface BadgeProps {
  // 뭐가 필요할까
  type: "LABEL" | "NUMBERS";
  size: "small" | "large";
  max?: number;
  children: React.ReactNode;
  className?: string;
}
const LabelBadge = styled.span<{ size: "small" | "large" }>`
  display: inline-block;
  background-color: ${styles.colors.error};
  border-radius: 50%;
  width: ${(props) => (props.size === "small" ? "6px" : "12px")};
  height: ${(props) => (props.size === "small" ? "6px" : "12px")};
  min-width: ${(props) => (props.size === "small" ? "6px" : "12px")};
`;

const NumberBadge = styled.span<{ size: "small" | "large" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${styles.colors.error};
  color: ${styles.colors.onError};
  border-radius: ${(props) => (props.size === "small" ? "8px" : "16px")};
  min-width: ${(props) => (props.size === "small" ? "16px" : "24px")};
  height: ${(props) => (props.size === "small" ? "16px" : "24px")};
  padding: ${(props) => (props.size === "small" ? "0 4px" : "0 6px")};
  font-size: ${(props) => (props.size === "small" ? "11px" : "13px")};
  font-weight: 500;
  line-height: 1;
`;

export const Badge = ({
  children,
  type,
  size,
  max,
  className = "",
}: BadgeProps) => {
  if (type === "LABEL") {
    return <LabelBadge size={size} className={className} />;
  }

  // 조건이 NUMBERS 일 때 그냥 자동으로 되는거 아닌가? 조건을 써줘야 하나?
  const displayContent =
    typeof children === "number" && max && children > max
      ? `${max}+`
      : children;

  return (
    <NumberBadge size={size} className={className}>
      {displayContent}
    </NumberBadge>
  );
};
