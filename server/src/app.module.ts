import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './app/auth/auth.module';
import { HealthModule } from './app/health/health.module';
import { QuizModule } from './app/quiz/quiz.module';
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from './common/database.module';

@Module({
  imports: [
    HealthModule,
    DatabaseModule,
    UsersModule,
    QuizModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }
