import { getIssuesData, getLabelsData } from './service/apiService';
import { labelObj } from './init';
//msw worker
import { worker } from './mocks/browser';
worker.start();

const main = () => {

    const loadData = async () => {
        const [issues, labels] = await Promise.all([
            getIssuesData(),
            getLabelsData()
        ]);
            
        labelObj.setLabels(labels);
    };

    loadData();
}

main();