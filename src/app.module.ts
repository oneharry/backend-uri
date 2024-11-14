import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications/applications.service';
import { ApplicationsController } from './applications/applications.controller';

@Module({
  imports: [],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class AppModule {}