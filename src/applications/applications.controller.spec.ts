
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService, Application, Statistics } from './applications.service';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;
  let service: ApplicationsService;

  // mock data for application and statistsics
  const mockApplicationsData: Application[] = [
    {
      id: '1',
      jobTitle: 'Frontend Developer',
      companyName: 'TechCorp',
      status: 'pending',
      dateApplied: '2024-11-08',
    },
    {
      id: '2',
      jobTitle: 'Backend Developer',
      companyName: 'InnovateX',
      status: 'accepted',
      dateApplied: '2024-10-10',
    },
    {
      id: '3',
      jobTitle: 'Fullstack Developer',
      companyName: 'DevSolutions',
      status: 'rejected',
      dateApplied: '2024-09-15',
    },
  ];

  const mockStatisticsData: Statistics = {
    total_applications: 3,
    status_count: {
      pending: 1,
      accepted: 1,
      rejected: 1,
    },
    month_count: {
      '2024-9': 1,
      '2024-10': 1,
      '2024-11': 1,
    },
  };

  const mockApplicationsService = {
    getAllApplications: jest.fn().mockReturnValue(mockApplicationsData),
    getAppStats: jest.fn().mockReturnValue(mockStatisticsData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        {
          provide: ApplicationsService,
          useValue: mockApplicationsService,
        },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
    service = module.get<ApplicationsService>(ApplicationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /getAllApplication', () => {
    it('should return an array of applications', () => {
      const result = controller.getAllApplication();
      expect(result).toEqual(mockApplicationsData);
      expect(service.getAllApplications).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no applications are found', () => {
      mockApplicationsService.getAllApplications.mockReturnValueOnce([]);
      const result = controller.getAllApplication();
      expect(result).toEqual([]);
      expect(service.getAllApplications).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /getAppStats', () => {
    it('should return statistics of applications', () => {
      const result = controller.getAppStats();
      expect(result).toEqual(mockStatisticsData);
      expect(service.getAppStats).toHaveBeenCalledTimes(1);
    });

    it('should return statistics with zero counts if no applications are found', () => {
      const emptyStatistics: Statistics = {
        total_applications: 0,
        status_count: {
          pending: 0,
          accepted: 0,
          rejected: 0,
        },
        month_count: {},
      };
      mockApplicationsService.getAppStats.mockReturnValueOnce(emptyStatistics);
      const result = controller.getAppStats();
      expect(result).toEqual(emptyStatistics);
      expect(service.getAppStats).toHaveBeenCalledTimes(1);
    });
  });
});
