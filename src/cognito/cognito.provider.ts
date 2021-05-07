import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { ConfigType } from '@nestjs/config';
import cognitoConfig from './cognito.config';

export const CognitoProvider = {
  provide: 'Cognito',
  useFactory: (
    config: ConfigType<typeof cognitoConfig>,
  ): CognitoIdentityProvider => {
    return new CognitoIdentityProvider({
      region: config.region,
    });
  },
  inject: [cognitoConfig.KEY],
};
