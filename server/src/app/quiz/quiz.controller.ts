import {
  Controller,
  Get,
  Header,
  Param,
  Delete,
  Put,
  Body,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtGuard } from '../auth/jwt-user.guard';
import { AuthUser } from '../users/user.decorator';
import { User } from '../users/users.model';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(
    private quizService: QuizService
  ) {}

  @Get()
  getQuizzes(): Promise<Quiz[]> {
    return this.quizService.findAllPublicQuizzes();
  }

  @Get('/user/:userId')
  @UseGuards(JwtGuard)
  getUserQuizzes(
    @Param('userId') userId: string,
    @AuthUser() user: User,
  ): Promise<Quiz[]> {
    if (user.id === userId) {
      return this.quizService.findUsersAllQuizzes(userId);
    } else {
      return this.quizService.findUsersPublicQuizzes(userId);
    }
  }

  @Get('/builder/:id')
  @UseGuards(JwtAuthGuard)
  getQuiz(
    @Param('id') id: string,
    @AuthUser() user: User
  ): Promise<Quiz | null> {
    return this.quizService.findQuiz(id, user.id);
  }

  @Get(':id')
  getPlayQuiz(@Param('id') id: string): Promise<Quiz | null> {
    return this.quizService.findQuizWithoutAnswers(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteQuiz(
    @Param('id') id: string,
    @AuthUser() user: User
  ): Promise<any> {
    return this.quizService.deleteQuiz(id, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Header('content-type', 'application/json')
  updateQuiz(
    @Param('id') id: string,
    @AuthUser() user: User,
    @Body() quiz: Quiz
  ) {
    return this.quizService.updateQuiz(user.id, id, quiz);
  }

  @Post()
  @Header('content-type', 'application/json')
  @UseGuards(JwtAuthGuard)
  newQuiz(@AuthUser() user: User, @Body() quiz: Quiz): Promise<Quiz | null> {
    return this.quizService.newQuiz(user.id, quiz);
  }
}
