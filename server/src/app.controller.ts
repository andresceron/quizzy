import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('abc')
  @Header('content-type', 'text/html')
  noApiFound(): string {
    return 'Hello World';
  }
}
