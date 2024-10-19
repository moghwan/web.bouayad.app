export default defineEventHandler(async (event) => {
  const { cityId } = getRouterParams(event);
  const config = useRuntimeConfig();

  let url = `${config.public.apiHost}/salates/calendar/${cityId}`;

  try {
    const response = await $fetch(url, {
      headers: {
        'x-rapidapi-host': config.public.apiHost,
        'x-rapidapi-key': config.apiSecret || '',
      },
    });

    return response;
  } catch (error) {
    // Handle any error that occurs during the API request
    return {
      error: true,
      message: 'Error fetching data from external API',
      details: error.message,
    };
  }
});
