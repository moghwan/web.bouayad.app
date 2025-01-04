export default defineEventHandler(async (event) => {
  const { cityId, month, day } = getRouterParams(event);
  const config = useRuntimeConfig();

  // Build the URL dynamically
  let url = `${config.public.apiHost}/hikams/${cityId}`;

  if (month) url += `/${month}`;
  if (day) url += `/${day}`;

  try {
    // Replace with your external API URL
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
