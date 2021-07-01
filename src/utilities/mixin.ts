// Slightly easier way to combine classes
export function mixin(...classes: string[]) {
  const validClasses = classes.filter((a) => !!a);
  return validClasses.join(' ');
}
