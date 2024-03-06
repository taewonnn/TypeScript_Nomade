import { ReactNode, MouseEventHandler } from 'react';

export interface ICustomButton {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
