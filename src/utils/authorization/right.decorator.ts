import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Right = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const rights = request.rights;
    return data === undefined ? rights : rights.includes(data);
  },
);
