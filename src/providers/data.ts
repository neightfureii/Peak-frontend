import { BACKEND_BASE_URL } from "@/constants";
import { CreateResponse, GetOneResponse, ListResponse } from "@/types";
import { HttpError } from "@refinedev/core";
import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";

const buildHttpError = async (response: Response): Promise<HttpError> => {
  let message = 'Request failed.';

  try {
    const payload = (await response.json()) as { message?: string };

    if(payload?.message) message = payload.message;
  } catch {
    // Ignore errors
  }

  return {
    message,
    statusCode: response.status,
  }
}

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      const params: Record<string, string | number> = { page, limit: pageSize };

      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';

        const value = String(filter.value);

        if(resource === 'sports') {
          if(field === 'category') params.sports_category = value;
          if(field === 'name' || field === 'code') params.search = value;
        }
      })

      return params;
    },

    mapResponse: async (response) => {
      if(!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.json();

      console.log('📥 Response Data:', payload);
      console.log('📊 Total Count:', payload.pagination?.total);

      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  },

  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);

      const json: CreateResponse = await response.json();

      if (!json.data) {
        throw {
          message: "Malformed create response.",
          statusCode: response.status,
        } as HttpError;
      }

      return json.data;
    }
  },

  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const json: GetOneResponse = await response.json();

      if (!json.data) {
        throw {
          message: "Malformed getOne response.",
          statusCode: response.status,
        } as HttpError;
      }

      return json.data;
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };