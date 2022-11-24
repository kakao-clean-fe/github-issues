import { worker } from './mocks/browser';
import { createApp } from './app';

window.addEventListener('DOMContentLoaded', async () => {
  worker.start();
  const app = await createApp();
  app.render();
});
