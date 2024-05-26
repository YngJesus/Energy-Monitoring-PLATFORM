import { Test, TestingModule } from '@nestjs/testing';
import { InfluxyService } from './influxy.service';

describe('InfluxyService', () => {
  let service: InfluxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfluxyService],
    }).compile();

    service = module.get<InfluxyService>(InfluxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
