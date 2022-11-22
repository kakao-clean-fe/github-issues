import { rest } from 'msw'
import issues from '/data-sources/issues.json' assert{ type: "json"}
import labels from '/data-sources/labels.json' assert{ type: "json"}

export const handlers = [
    rest.get('/issues', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(issues));
    }),

    rest.get('/labels', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(labels));
    }),

    rest.post('/labels', async (req, res, ctx) => {
        const newData = await req.json();

        if(Math.floor(Math.random()*10) > 5) {
            return res(ctx.status(500), ctx.json({"error" : "서버에러 발생"}));
        }

        labels.push(newData);
        return res(ctx.status(201), ctx.json(labels));
    }),
];