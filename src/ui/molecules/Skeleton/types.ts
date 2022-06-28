import { StyleHTMLAttributes } from "react";

export type Props = {
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  isLight?: boolean;
} & StyleHTMLAttributes<HTMLDivElement>;
