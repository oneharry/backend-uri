import { Controller, Get } from '@nestjs/common';
import { ApplicationsService, Application, Statistics } from './applications.service';

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    /**
     * Controller for get all application
     * @returns 
     */
    @Get()
    getAllApplication(): Application[] {
      return this.applicationsService.getAllApplications();
    }
  
    /**
     * Controller for statistics endpoint
     * @returns  the stat of all applications
     */
    @Get('stats')
    getAppStats(): Statistics {
      return this.applicationsService.getAppStats();
    }
}
