import issues from '../data-sources/issues.json';
import labels from '../data-sources/labels.json';
import {IssueViewType} from "./view/issue";
import {LabelViewType} from "./view/label";

type ResourceKey = 'issues' | 'labels';
type Props = {
    issueView: IssueViewType,
    labelView: LabelViewType
}

export type Model = ReturnType<typeof model>;


const model = ({issueView, labelView}: Props) => {
    const resource: Record<ResourceKey, any> = { issues, labels };

    const notifyUpdate = (key: ResourceKey) => {
        switch (key) {
            case "issues": issueView.updateApp(resource.issues);
            break;
            case "labels": labelView.updateApp(resource.labels);
            break;
            default:
                break;
        }
    }

    const getResource = (key: ResourceKey) => resource[key];
    const setResource = (key: ResourceKey, payload: any) => {
        resource[key] = payload;
        notifyUpdate(key);
    }

    return { getResource, setResource }
}

export default model;