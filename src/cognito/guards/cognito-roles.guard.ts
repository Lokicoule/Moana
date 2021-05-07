import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoService } from '../cognito.service';
import { UserCtx } from 'src/common/context/user.ctx';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';

@Injectable()
export class CognitoRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly cognitoService: CognitoService,
  ) {}

  public canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return this.validateRequest(req, roles);
  }

  private async validateRequest(request, roles): Promise<boolean> {
    const user: UserCtx = request.user;
    console.log(user);
    if (!user) return false;
    try {
      const groups: string[] = await this.cognitoService.getUserGroups(
        user._id,
      );

      console.log(groups);
      return this.matchRoles(roles, groups);
    } catch (e) {
      if (e.name === 'NotAuthorizedException')
        throw new UnauthorizedException();
      throw e;
    }
  }

  private matchRoles(roles, userRoles): boolean {
    return roles.some((role) => userRoles?.includes(role));
  }
}
