// https://github.com/apollographql/graphql-upload#readme
// https://github.com/nestjs/graphql/issues/901

import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { graphqlUploadExpress } from 'graphql-upload';

/** Wraps the GraphQLModule with an up-to-date graphql-upload middleware. */
@Module({})
export class GraphQLWithUploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }

  static forRoot(options?: GqlModuleOptions): DynamicModule {
    return {
      module: GraphQLWithUploadModule,
      imports: [
        GraphQLModule.forRoot({
          uploads: false,
          path: '/graphql',
          ...options,
        }),
      ],
    };
  }
}
