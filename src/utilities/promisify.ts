export function promisify<T>(fn: Function, ...args: any): Promise<T> {
  return new Promise((resolve) => {
    // Add callback
    args.push((result: T) => {
      resolve(result);
    });

    fn.apply(null, args);
  });
}
