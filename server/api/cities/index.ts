import { City, ApiError } from '~/types/api';
import { fetchExternalApi, formatApiError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = `${config.public.apiHost}/cities`;

  try {
    return await fetchExternalApi<City[]>(url);
  } catch (error) {
    return formatApiError(error);
  }
});
