import { ReactNode } from "react";

export interface DropdownMenuProps {
  onView?: () => void;
  onDelete?: () => void;
  EditButton: ReactNode;
}
