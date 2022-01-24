import { assign } from 'lodash';

interface Consturctor<T> {
  new (): T;
}
export const ResponseWrapper = <T, K>(
  classType: Consturctor<T>,
  value: K,
): T => {
  const target: T = new classType();
  assign(target, value);
  return target;
};

export const ArrayResponseWrapper = <T, K>(
  classType: Consturctor<T>,
  values: K[],
): T[] => {
  return values.map((value) => ResponseWrapper(classType, value));
};
