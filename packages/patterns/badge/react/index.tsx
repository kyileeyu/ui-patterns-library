import React from "react";

interface BadgeProps {
  // 뭐가 필요할까
  //https://m3.material.io/components/badges/overview
  type: "LABEL" | "NUMBERS";
  size: "small" | "large";
  max?: number;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  type,
  size,
  max,
  className = "",
}: BadgeProps) => {
  if (type === "LABEL") {
    return (
      <span className={`badge badge-label badge-${size} ${className}`}>*</span>
    );
  }

  // 조건이 NUMBERS 일 때 그냥 자동으로 되는거 아닌가? 조건을 써줘야 하나?
  const displayContent =
    typeof children === "number" && max && children > max
      ? `${max}+`
      : children;

  return (
    <span className={`badge badge-number badge-${size} ${className}`}>
      {displayContent}
    </span>
  );
};
