import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [AuthModule],
  providers: [UserService, ConfigService, EncryptionService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
