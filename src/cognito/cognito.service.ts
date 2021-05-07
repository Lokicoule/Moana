import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  CognitoIdentityProvider,
  GetUserResponse,
  GetUserRequest,
  AdminListGroupsForUserRequest,
  AdminListGroupsForUserResponse,
} from '@aws-sdk/client-cognito-identity-provider';
import cognitoConfig from './cognito.config';
import { UserCtx } from 'src/common/context/user.ctx';

@Injectable()
export class CognitoService {
  private client: CognitoIdentityProvider;
  constructor(
    @Inject(cognitoConfig.KEY)
    private config: ConfigType<typeof cognitoConfig>,
  ) {
    this.client = new CognitoIdentityProvider({
      region: this.config.region,
      credentials: this.config.credentials,
    });
  }

  public async getMe(token: string): Promise<UserCtx> {
    const user: GetUserResponse = await this.client.getUser({
      AccessToken: token,
    } as GetUserRequest);

    return new UserCtx(
      user.Username,
      user.UserAttributes.find(
        (attribute) => attribute.Name === 'email',
      )?.Value,
    );
  }

  public async getUserGroups(username: string): Promise<string[]> {
    console.log(username);
    const data: AdminListGroupsForUserResponse = await this.client.adminListGroupsForUser(
      {
        Username: username,
        UserPoolId: this.config.userPoolId,
      } as AdminListGroupsForUserRequest,
    );
    return [...new Set(data.Groups.map((it) => it.GroupName))];
  }
}
