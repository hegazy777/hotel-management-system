import { ReactNode } from "react";

export interface HeaderProps {
  headerTitle: string;
  buttonText?: string;
  onAdd?: () => void;
  children?: ReactNode;
}
