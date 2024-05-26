import { Test, TestingModule } from '@nestjs/testing';
import { InfluxyController } from './influxy.controller';
import { InfluxyService } from './influxy.service';

describe('InfluxyController', () => {
  let controller: InfluxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfluxyController],
      providers: [InfluxyService],
    }).compile();

    controller = module.get<InfluxyController>(InfluxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
