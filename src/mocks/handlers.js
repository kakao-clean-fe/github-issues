import { rest } from 'msw';

export const handlers = [
  rest.get('/labels', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(labels))}
  ),

  rest.post('/labels', async (req, res, ctx) => {
    const newLabel = await req.json();

    if(Math.floor(Math.random()*10) > 5) {
			return res(ctx.status(500), ctx.json({"error" : "서버에러 발생"}));
		}

		labels.push(newData);

    return res(ctx.status(201), ctx.json(labels));
  }),

  rest.get('/labels-delay', async (req, res, ctx) => {
		await new Promise(resolve => setTimeout(()=> resolve(), 5000));

    return res(ctx.status(200), ctx.json(labels));
	}),

];

const labels =[
  {
      "name":"bug",
      "color":"bfdadc",
      "description":"this is red"
  },
  {
      "name":"documentation",
      "color":"0075ca",
      "description":"this is documentation"
  },
  {
      "name":"enhancement",
      "color":"a2eeef",
      "description":"this is enhancement"
  },
  {
      "name":"question",
      "color":"d876e3",
      "description":"this is question"
  },
  {
      "name":"invalid",
      "color":"e4e669",
      "description":"this is not valid"
  },
  {
      "name":"duplicate",
      "color":"cfd3d7",
      "description":"this is dulicate"
  }
];
