export const findAllTodos = async (db: D1Database) => {
	const q = `
    SELECT * FROM todos;
    `;
	return await db.prepare(q).all();
};

export interface CreateTodoInput {
	content: string;
}

export const createTodo = async (db: D1Database, input: CreateTodoInput) => {
	const q = `
    INSERT INTO todos(content) VALUES(?);
    `;
	return await db.prepare(q).bind(input.content).run();
};
