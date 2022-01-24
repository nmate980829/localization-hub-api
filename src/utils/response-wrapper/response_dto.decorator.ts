import { assign } from 'lodash';

export type Consturctor = { new (...args: any[]): any };

export function ResponseDto<T extends Consturctor>(constr: T) {
  return class extends constr {
    static init(copy: T): T {
      const target: T = new constr();
      assign(target, copy);
      return target;
    }
  };
}
