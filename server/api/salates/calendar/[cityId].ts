import { SalateTime, ApiError } from '~/types/api';
import { fetchExternalApi, formatApiError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const { cityId } = getRouterParams(event);
  const config = useRuntimeConfig();

  const url = `${config.public.apiHost}/salates/calendar/${cityId}`;

  try {
    return await fetchExternalApi<SalateTime[]>(url);
  } catch (error) {
    return formatApiError(error);
  }
});
