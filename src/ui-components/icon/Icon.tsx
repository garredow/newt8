import React from 'react';
import { IconContext } from 'react-icons/lib';
import { ComponentBase } from '../../models/ComponentBase';

type IconProps = ComponentBase & {
  color?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  attr?: React.SVGAttributes<SVGElement>;
  icon: any;
};

export function Icon({ color, size, className, style, attr, icon }: IconProps) {
  return (
    <IconContext.Provider value={{ color, size, className, style, attr }}>
      {icon}
    </IconContext.Provider>
  );
}
