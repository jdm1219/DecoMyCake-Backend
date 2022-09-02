import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalJwtModule } from '../common/module/jwt.module';

@Module({
  imports: [LocalJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
