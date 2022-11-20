// import {initIssuePage} from "./issue/issue-page";
import { initLabelPage } from "./label/label-page";

//entry point 에 해당하는 파일 상단에 아래 내용을 추가

//msw worker
import { worker } from "./mocks/browser";
worker.start();

//서비스 코드 블라블라 ...
// initIssuePage();
initLabelPage();
