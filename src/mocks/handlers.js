import { rest } from 'msw'
import data from '/data-sources/labels.json' assert{ type: "json"}

export const handlers = [
    rest.get('/labels', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(data));
    })
];