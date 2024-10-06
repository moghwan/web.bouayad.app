export default defineEventHandler(async (event) => {
  const { cityId, month, day } = getRouterParams(event);
  const config = useRuntimeConfig();

  // Build the URL dynamically
  let url = `${config.public.apiHost}/hikams/${cityId}`;

  if (month) url += `/${month}`;
  if (day) url += `/${day}`;

  try {
    // Replace with your external API URL
    const response = await $fetch(url, {
      headers: {
        'x-rapidapi-host': config.public.apiHost,
        'x-rapidapi-key': config.apiSecret || '',
      },
      // onRequest({ request, options }) {
      //   // Set the request headers
      //   options.headers = options.headers || {
      //     "x-rapidapi-host": HOST,
      //     "x-rapidapi-key": SECRET
      //   }
      //   // options.headers.authorization = '...'
      // },
    });

    // You can process the response here if necessary
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
