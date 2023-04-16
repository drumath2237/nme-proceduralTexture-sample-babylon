import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {};
  }
  return {
    // for deploying to github pages
    base: '/nme-proceduralTexture-sample-babylon/',
  };
});
