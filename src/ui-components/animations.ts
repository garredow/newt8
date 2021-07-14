type Animation = {
  duration: number;
  defaultStyles: { [key: string]: string | number };
  transitionStyles: {
    [key: string]: { [key: string]: string | number };
    entering: { [key: string]: string | number };
    entered: { [key: string]: string | number };
    exiting: { [key: string]: string | number };
    exited: { [key: string]: string | number };
  };
};

const animationDuration = 250;

export const animateFade: Animation = {
  duration: animationDuration,
  defaultStyles: {
    transition: `opacity ${animationDuration}ms ease-in-out`,
    opacity: 0,
  },
  transitionStyles: {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  },
};

export const animateSlideLeft: Animation = {
  duration: animationDuration,
  defaultStyles: {
    transition: `transform ${animationDuration}ms ease-in-out`,
    transform: 'translateX(120%)',
  },
  transitionStyles: {
    entering: { transform: 'translateX(0%)' },
    entered: { transform: 'translateX(0%)' },
    exiting: { transform: 'translateX(120%)' },
    exited: { transform: 'translateX(120%)' },
  },
};
