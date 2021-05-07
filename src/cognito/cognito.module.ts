import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CognitoService } from './cognito.service';
import { CognitoGuard } from './guards/cognito.guard';
import { CognitoRolesGuard } from './guards/cognito-roles.guard';
import cognitoConfig from './cognito.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cognitoConfig],
    }),
  ],
  providers: [CognitoService, CognitoGuard, CognitoRolesGuard],
  exports: [CognitoService, CognitoGuard, CognitoRolesGuard],
})
export class CognitoModule {}
