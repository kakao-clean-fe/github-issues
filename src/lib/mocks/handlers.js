import { rest } from 'msw'
import issues from '/data-sources/issues.json' assert{ type: "json"}
import labels from '/data-sources/labels.json' assert{ type: "json"}

export const handlers = [
    rest.get('/issues', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(issues));
    }),

    rest.get('/labels', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(labels));
    })
];