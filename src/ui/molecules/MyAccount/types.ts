import { ReactNode } from "react";

type SharedProps = {
  balance?: string;
  address?: string;
  accountName?: string;
  isFull?: boolean;
};

export type SelectAccountProps = {
  isActive?: boolean;
  withButton?: boolean;
} & SharedProps;

export type Props = {
  children?: ReactNode;
  isVerified?: boolean;
} & SharedProps;