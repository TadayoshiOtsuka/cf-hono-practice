import { Hono } from 'hono';
import { CreateTodoInput, createTodo, findAllTodos } from './todo';
import { Env } from '../../env';
import { HTTPException } from 'hono/http-exception';

export const todos = new Hono<{ Bindings: Env }>();

todos.get('/', async (c) => {
	const todos = await findAllTodos(c.env.DB);
	if (todos.error) {
		throw new HTTPException(500, { message: 'something went wrong' });
	}

	return c.json(todos.results);
});

todos.post('/', async (c) => {
	const input = await c.req.json<CreateTodoInput>();
	const result = await createTodo(c.env.DB, input);
	if (result.error) {
		throw new HTTPException(500, { message: 'something went wrong' });
	}

	return c.text('Created', 201);
});
