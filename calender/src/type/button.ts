import { ReactNode } from 'react';

export interface ICustomButton {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
