import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { JwtMiddleware } from './common/middleware/jwt.middleware';
import { LocalJwtModule } from './common/module/jwt.module';
import { UserService } from './user/user.service';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [AuthModule, PostModule, LocalJwtModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude('/auth', '/auth/(.*)').forRoutes('*');
  }
}
