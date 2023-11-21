import InsuranceView, { InsuranceViewSchema } from '../dto/InsuranceView.ts';

const mapSchemaToEntity = (insuranceSchema: InsuranceViewSchema): InsuranceView => {
  return {
    ...insuranceSchema,
    dateExpiration: insuranceSchema.dateExpiration.toISOString().substring(0, 10),
    dateInitialization: insuranceSchema.dateInitialization.toISOString().substring(0, 10)
  };
};

export { mapSchemaToEntity };
