import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SERVER_ROLE, User } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<SERVER_ROLE>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return (
      role === SERVER_ROLE.USER ||
      user.role === SERVER_ROLE.ADMIN ||
      user.role === role
    );
  }
}
