import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalJwtModule } from '../common/module/jwt.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [LocalJwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
