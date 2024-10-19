export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let url = `${config.public.apiHost}/cities`;

  try {
    const response = await $fetch(url, {
      headers: {
        'x-rapidapi-host': config.public.apiHost,
        'x-rapidapi-key': config.apiSecret || '',
      },
    });

    return response;
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching data from external API',
      details: error.message,
    };
  }
});
