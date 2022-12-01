import {rest} from "msw";
import {API_PATH} from "../../src/consts/const";

export const getIssues = rest.get(
    API_PATH.GET_ISSUES,
    (req, res, ctx) => res(ctx.json([{
        "title": "issue1",
        "_id": 1,
        "status": "open",
        "assignee": "hue"
    },{
        "title": "issue2",
        "_id": 2,
        "status": "close",
        "assignee": "lauren"
    }]))
);