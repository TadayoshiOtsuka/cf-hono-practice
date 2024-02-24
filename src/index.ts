import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { todos } from './features/todos/todos.handler';

const app = new Hono();

app.route('/api/todos', todos);

app.onError((err, c) => {
	console.log(err);
	if (err instanceof HTTPException) {
		return c.text(err.message, err.status);
	}
	return c.text('Internal Server Error', 500);
});

export default app;
