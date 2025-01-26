import { BaseModel, BaseModelProperties } from '../../src/common/entity';

class TestModel extends BaseModel {}

describe('BaseModel test suites', () => {
  let baseModel: TestModel;
  const baseModelProperties: BaseModelProperties = {
    id: 1,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  beforeEach(() => {
    baseModel = new TestModel(baseModelProperties);
  });

  it('should be defined', () => {
    expect(baseModel).toBeDefined();
    expect(baseModel).toBeInstanceOf(TestModel);
  });

  it("should give same id as it's set", () => {
    expect(baseModel.id).toBe(baseModelProperties.id);
  });

  it('shuold set new id and return it', () => {
    const newId = 2;
    baseModel.id = newId;
    expect(baseModel.id).toBe(newId);
  });

  it("shuold serialize model's properties", () => {
    const serialized = baseModel.serialize<BaseModelProperties>();
    expect(serialized).toEqual(baseModelProperties);
  });

  it('should create a new instance of BaseModel with given properties', () => {
    const newBaseModel = BaseModel.from<TestModel, BaseModelProperties>(TestModel, baseModelProperties);
    expect(newBaseModel).toBeDefined();
    expect(newBaseModel).toBeInstanceOf(TestModel);
    expect(newBaseModel.id).toBe(baseModelProperties.id);
  });
});
