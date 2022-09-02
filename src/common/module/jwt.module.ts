import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import properties from '../../config/properties';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: properties.auth.secret,
      signOptions: { expiresIn: properties.auth.expiresIn },
    }),
  ],
  exports: [JwtModule],
})
export class LocalJwtModule {}
