import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoService } from '../cognito.service';
import { UserCtx } from 'src/common/context/user.ctx';

@Injectable()
export class CognitoGuard implements CanActivate {
  constructor(private readonly cognitoService: CognitoService) {}

  public canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return this.validateRequest(req);
  }

  private async validateRequest(request): Promise<boolean> {
    const { authorization } = request?.headers;

    if (!authorization)
      throw new UnauthorizedException(`Authorization header is required.`);

    try {
      const user: UserCtx = await this.cognitoService.getMe(authorization);
      request['user'] = user;
      return true;
    } catch (e) {
      console.error(e);
      if (e.name === 'NotAuthorizedException')
        throw new UnauthorizedException();
      throw e;
    }
  }
}
