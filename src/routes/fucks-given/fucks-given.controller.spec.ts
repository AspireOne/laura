import { Test, TestingModule } from "@nestjs/testing";
import { FucksGivenController } from "./fucks-given.controller";
import { FucksGivenService } from "./fucks-given.service";
import { ProvidersModule } from "../../common/providers/providers.module";

describe("FucksGivenController", () => {
  let controller: FucksGivenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProvidersModule],
      controllers: [FucksGivenController],
      providers: [FucksGivenService],
    }).compile();

    controller = module.get<FucksGivenController>(FucksGivenController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
