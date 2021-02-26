import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.body.user;
    return matchRoles(roles, user.roles);
    /**
     * The logic inside the matchRoles() function can be
     * as simple or sophisticated as needed. The main point
     * of this example is to show how guards fit into
     * the request/response cycle.
     */
  }
}

const matchRoles = (roles: string[], userRoles: string[]): boolean => {
  const rolesFinded: string[] = [];
  if (roles.length > 0 && userRoles.length > 0) {
    roles.forEach((role) => {
      const allowedRole = userRoles.find((userRole) => userRole === role);
      if (allowedRole && allowedRole !== null) {
        rolesFinded.push(allowedRole);
        return allowedRole;
      }
    });
  }
  if (rolesFinded && rolesFinded.length > 0) {
    return true;
  }
  throw new UnauthorizedException();
  
};
