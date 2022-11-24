import { rest } from 'msw';
import { labels } from './data';

export const handlers = [
  rest.get('/labels', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(labels));
  }),

  rest.post('/label', async (req, res, ctx) => {
    const newData = await req.json();

    if (Math.floor(Math.random() * 10) > 5) {
      return res(ctx.status(500), ctx.json({ error: '서버에러 발생' }));
    }

    labels.push(newData);
    return res(ctx.status(201), ctx.json(labels));
  }),

  rest.get('/labels-delay', async (req, res, ctx) => {
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
    return res(ctx.status(200), ctx.json(labels));
  })

];
