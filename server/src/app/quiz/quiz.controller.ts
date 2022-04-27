import {
  Controller,
  Get,
  Header,
  Param,
  Delete,
  Put,
  Body,
  Post
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get()
  getQuizzes(): Promise<Quiz[]> {
    return this.quizService.findAllQuizzes();
  }

  @Get(':id')
  getQuiz(@Param('id') id: string): Promise<Quiz | null> {
    return this.quizService.findQuiz(id);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string): Promise<any> {
    return this.quizService.deleteQuiz(id);
  }

  @Put(':id')
  @Header('content-type', 'text/html')
  updateQuiz(@Param('id') id: string, @Body() user: Quiz) {
    return this.quizService.updateQuiz(id, user);
  }

  @Post()
  @Header('content-type', 'text/html')
  newQuiz(@Body() user: Quiz): Promise<Quiz | null> {
    return this.quizService.newQuiz(user);
  }
}
