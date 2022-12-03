/**
 * import the essentials we need for mocking a REST API. 
 * They are grouped under the rest namespace exposed by the library.
 */
import {rest} from 'msw';
import {issues, labels} from '../fixtures/values';

/**
 * request handler function: define which requests should be mocked
 * Create request handlers by calling rest[METHOD] and providing a request path
 * specify a mocked response using a response resolver function
 * req, an information about a matching request;
 * res, a functional utility to create the mocked response;
 * ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.
 */
const list = []; // 이거 있어야 하는것 아닌지

export const handlers = [
	rest.get('/users', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(list));
	}),

	rest.post('/users', async (req, res, ctx) => {
		const newData = await req.json();
		list.push(newData);
		return res(ctx.status(201), ctx.json({ result: 'ok' }));
	}),

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

	rest.get('/labels-delay', async (req, res, ctx) => {
		await new Promise(resolve => setTimeout(()=> resolve(), 5000));
		return res(ctx.status(200), ctx.json(labels));
	}),

];
