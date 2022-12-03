import { init } from './init';
//msw worker
import { worker } from './mocks/browser';

worker.start();

init();
