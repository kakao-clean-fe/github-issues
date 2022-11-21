import initLabels from './labels';
import { worker } from './mocks/browser';

//msw worker
worker.start();
initLabels();
