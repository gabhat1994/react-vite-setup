const getStoryblokEnv = () => {
  let token = import.meta.env.VITE_STORYBLOK_TOKEN;

  if (!token) {
    // eslint-disable-next-line no-console
    console.error(
      '[VITE_STORYBLOK_TOKEN]: No token. Falling back to empty string',
    );
    token = '';
  }

  let env = import.meta.env.VITE_STORYBLOK_ENV;

  if (!env) {
    // eslint-disable-next-line no-console
    console.error('[VITE_STORYBLOK_ENV]: No env. Falling back to empty "dev"');
    env = 'dev';
  }

  return {
    env,
    token,
  };
};

export default getStoryblokEnv;
