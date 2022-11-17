import Labels from "./labels";
import LabelView from "./labelView";
import NewLabelButton from "./newLabelButton";
import { fetchData } from "./util";

const fetchLabelDatas = async () => {
    return await fetchData("labels");
}

(async () => {
    const labelDatas = await fetchLabelDatas();
    const labelView = new LabelView(new Labels(labelDatas));
    const newLabelButton = new NewLabelButton(false);

    labelView.render();
})()