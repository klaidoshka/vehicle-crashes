import IApiGetProperties from "../api/rest/IApiGetProperties.ts";
import {callApi} from "./RestApi.ts";
import Response from "../api/rest/Response.ts";
import InsuranceView, {InsuranceViewSchema} from "../dto/InsuranceView.ts";
import Configurations from "../api/Configurations.ts";

const API_ENDPOINT = Configurations.SERVER_ADDRESS + "/api/insurances";

const getInsurance = ({
                        id,
                        onError = (error: Error) => console.error(error),
                        onFinally,
                        onSuccess,
                        params
                      }: IApiGetProperties<InsuranceView>): Promise<InsuranceView | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = `${API_ENDPOINT}/${id}` + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<InsuranceView>(apiUrl)
  .then((response: Response<InsuranceView>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const element = response.data

    onSuccess?.(element!);

    return element;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
}

const mapSchemaToEntity = (insuranceSchema: InsuranceViewSchema): InsuranceView => {
  return {
    ...insuranceSchema,
    dateExpiration: insuranceSchema.dateExpiration.toISOString().substring(0, 10),
    dateInitialization: insuranceSchema.dateInitialization.toISOString().substring(0, 10)
  };
};

export {getInsurance, mapSchemaToEntity};