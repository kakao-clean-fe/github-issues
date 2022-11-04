import path from 'path';
import { SERVER_PORT } from './src/env';

export default {
  // config options
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: SERVER_PORT
  }
};
