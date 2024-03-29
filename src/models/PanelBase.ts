import { MutableRefObject } from 'react';

export type ComponentBase = {
  className?: string;
  style?: { [key: string]: string | number };
  ref?: MutableRefObject<null>;
  title?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
};
