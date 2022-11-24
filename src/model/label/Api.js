import { fetchBody } from "../../utils";

const getLabels = () => fetchBody('/labels');
const addLabels = (label) => fetchBody('/labels', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(label)
})
const LabelApi = {getLabels, addLabels}

export default LabelApi