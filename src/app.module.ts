import { PromModule } from '@digikare/nestjs-prom';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

let modules: any = [
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  PromModule.forRoot({
    withHttpMiddleware: {
      enable: true,
    },
  }),
  MongooseModule.forRootAsync({
    useFactory: async () => ({
      uri: process.env.MONGO_CONNECTION,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  }),
  HealthModule,
  AuthenticationModule,
  UsersModule,
];

@Module({
  imports: modules,
})
export class AppModule {}
