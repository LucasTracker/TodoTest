import type { Todo } from "./types.js";

/** Próximo id disponível (maior id + 1). */
export function nextId(todos: Todo[]): number {
  return todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

/** Retorna um novo array com a tarefa adicionada. Lança se o título for vazio. */
export function addTodo(todos: Todo[], title: string, now: Date = new Date()): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error("informe um título para a tarefa");
  }
  const todo: Todo = {
    id: nextId(todos),
    title: trimmed,
    done: false,
    createdAt: now.toISOString(),
  };
  return [...todos, todo];
}

/** Retorna um novo array com a tarefa marcada como concluída. Lança se não existir. */
export function completeTodo(todos: Todo[], id: number): Todo[] {
  if (!todos.some((t) => t.id === id)) {
    throw new Error(`tarefa #${id} não encontrada`);
  }
  return todos.map((t) => (t.id === id ? { ...t, done: true } : t));
}

/** Retorna um novo array sem a tarefa indicada. Lança se não existir. */
export function removeTodo(todos: Todo[], id: number): Todo[] {
  if (!todos.some((t) => t.id === id)) {
    throw new Error(`tarefa #${id} não encontrada`);
  }
  return todos.filter((t) => t.id !== id);
}

export type StatusFilter = "all" | "pending" | "done";

/** Retorna as tarefas que correspondem ao filtro de status. */
export function filterTodos(todos: Todo[], filter: StatusFilter): Todo[] {
  switch (filter) {
    case "pending":
      return todos.filter((t) => !t.done);
    case "done":
      return todos.filter((t) => t.done);
    case "all":
      return todos.slice();
  }
}

/** Retorna um novo array sem as tarefas concluídas. */
export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.done);
}
