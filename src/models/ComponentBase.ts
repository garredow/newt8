import { MutableRefObject } from 'react';

export type ComponentBase = {
  className?: string;
  style?: { [key: string]: string | number };
  ref?: MutableRefObject<null>;
  children?: React.ReactNode;
  'data-testid'?: string;
};
