import { fetchIssues, fetchLabels} from './init';
import { Label } from './components/label';

const main = () => {

    const loadData = async () => {
        const [issues, labels] = await Promise.all([
            fetchIssues(),
            fetchLabels()
        ]);
            
        // [TODO]: issue관리도 객체지향형으로 변경
        // pipe(renderItems, setItemCounts, setEventListener, filterData)(issues);

        new Label(labels).init();
    };

    loadData();
}

main();