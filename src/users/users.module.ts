import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersValidators } from './users.validators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthenticationModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UsersValidators, User],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
