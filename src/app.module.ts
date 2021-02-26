import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/controllers/cats.controller';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { logger, LoggerMiddleware } from './common/logger.middleware';
import { RolesGuard } from './core/roles.guard';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .exclude({
        path: 'cats',
        method: RequestMethod.GET,
      })
      .forRoutes(CatsController);
  }
}
