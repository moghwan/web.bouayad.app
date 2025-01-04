export default defineEventHandler(async (event) => {
  const { cityId } = getRouterParams(event);
  const config = useRuntimeConfig();

  let url = `${config.public.apiHost}/salates/calendar/${cityId}`;

  try {
    return await $fetch(url);
  } catch (error) {
    // Handle any error that occurs during the API request
    return {
      error: true,
      message: 'Error fetching data from external API',
      details: error.message,
    };
  }
});
