import InsuranceView, { InsuranceViewSchema } from '../dto/InsuranceView.ts';

const mapSchemaToEntity = (insuranceSchema: InsuranceViewSchema): InsuranceView => {
  return {
    ...insuranceSchema
  };
};

export { mapSchemaToEntity };
