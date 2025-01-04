export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let url = `${config.public.apiHost}/cities`;

  try {
    return await $fetch(url);
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching data from external API',
      details: error.message,
    };
  }
});
