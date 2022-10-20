import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { JwtMiddleware } from './common/middleware/jwt.middleware';
import { LocalJwtModule } from './common/module/jwt.module';
import { UserService } from './user/user.service';
import { GlobalModule } from './global/global.module';
import { APP_FILTER } from '@nestjs/core';
import GlobalExceptionFilter from './filters/globalException.filter';
import { AppLoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { PostController } from './post/post.controller';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
    LocalJwtModule,
    GlobalModule,
    HealthCheckModule,
  ],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: `${process.env.API_PREFIX}/auth/sign-in`,
          method: RequestMethod.POST,
        },
        {
          path: `${process.env.API_PREFIX}/auth/sign-up`,
          method: RequestMethod.POST,
        },
        {
          path: `${process.env.API_PREFIX}/health-check`,
          method: RequestMethod.GET,
        },
      )
      .forRoutes(AuthController, PostController);
  }
}
