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
import { AuthUser } from '../users/user.decorator';
import { User } from '../users/users.model';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get()
  getQuizzes(): Promise<Quiz[]> {
    return this.quizService.findAllPublicQuizzes();
  }

  // TODO: Change to use JWT instead
  @Get('/user/:userId')
  // @UseGuards(AuthGuard('jwt'))
  // getUserQuizzes(@AuthUser() user: User): Promise<Quiz[]> {
  getUserQuizzes(@Param('userId') userId: string): Promise<Quiz[]> {
    return this.quizService.findUsersQuizzes(userId);
  }

  // @Get(':id')
  // getQuiz(@Param('id') id: string): Promise<Quiz | null> {
  //   return this.quizService.findQuiz(id);
  // }

  @Get(':id')
  getPlayQuiz(@Param('id') id: string): Promise<Quiz | null> {
    return this.quizService.findQuizWithoutAnswers(id);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string): Promise<any> {
    return this.quizService.deleteQuiz(id);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updateQuiz(@Param('id') id: string, @Body() user: Quiz) {
    return this.quizService.updateQuiz(id, user);
  }

  @Post()
  @Header('content-type', 'application/json')
  @UseGuards(AuthGuard('jwt'))
  newQuiz(@AuthUser() user: User, @Body() quiz: Quiz): Promise<Quiz | null> {
    return this.quizService.newQuiz(user.id, quiz);
  }
}
