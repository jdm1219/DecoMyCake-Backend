import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
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

@Module({
  imports: [AuthModule, PostModule, LocalJwtModule, GlobalModule],
  providers: [
    AppService,
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
      )
      .forRoutes(AuthController, PostController);
  }
}
