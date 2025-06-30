import { HikamData, ApiError } from '~/types/api';
import { fetchExternalApi, formatApiError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
  const { cityId, month, day } = getRouterParams(event);
  const config = useRuntimeConfig();

  // Build the URL dynamically
  let url = `${config.public.apiHost}/hikams/${cityId}`;

  if (month) url += `/${month}`;
  if (day) url += `/${day}`;

  try {
    return await fetchExternalApi<HikamData>(url);
  } catch (error) {
    return formatApiError(error);
  }
});
