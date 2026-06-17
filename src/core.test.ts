import { describe, it, expect } from "vitest";
import {
  nextId,
  addTodo,
  completeTodo,
  removeTodo,
  filterTodos,
  clearCompleted,
} from "./core.js";
import type { Todo } from "./types.js";

function makeTodo(id: number, overrides: Partial<Todo> = {}): Todo {
  return {
    id,
    title: `tarefa ${id}`,
    done: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("nextId", () => {
  it("retorna 1 para lista vazia", () => {
    expect(nextId([])).toBe(1);
  });

  it("retorna maior id + 1", () => {
    expect(nextId([makeTodo(1), makeTodo(5), makeTodo(3)])).toBe(6);
  });
});

describe("addTodo", () => {
  it("adiciona uma tarefa com id sequencial", () => {
    const result = addTodo([], "Comprar pão");
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 1, title: "Comprar pão", done: false });
  });

  it("usa o now informado em createdAt", () => {
    const now = new Date("2026-06-17T12:00:00.000Z");
    const [todo] = addTodo([], "x", now);
    expect(todo.createdAt).toBe("2026-06-17T12:00:00.000Z");
  });

  it("remove espaços em branco do título", () => {
    const [todo] = addTodo([], "  café  ");
    expect(todo.title).toBe("café");
  });

  it("não muta o array original", () => {
    const original: Todo[] = [];
    addTodo(original, "x");
    expect(original).toHaveLength(0);
  });

  it("lança erro se o título for vazio", () => {
    expect(() => addTodo([], "   ")).toThrow(/título/);
  });
});

describe("completeTodo", () => {
  it("marca a tarefa indicada como concluída", () => {
    const todos = [makeTodo(1), makeTodo(2)];
    const result = completeTodo(todos, 2);
    expect(result.find((t) => t.id === 2)?.done).toBe(true);
    expect(result.find((t) => t.id === 1)?.done).toBe(false);
  });

  it("não muta o array original", () => {
    const todos = [makeTodo(1)];
    completeTodo(todos, 1);
    expect(todos[0].done).toBe(false);
  });

  it("lança erro se a tarefa não existir", () => {
    expect(() => completeTodo([makeTodo(1)], 99)).toThrow(/não encontrada/);
  });
});

describe("removeTodo", () => {
  it("remove a tarefa indicada", () => {
    const result = removeTodo([makeTodo(1), makeTodo(2)], 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("não muta o array original", () => {
    const todos = [makeTodo(1), makeTodo(2)];
    removeTodo(todos, 1);
    expect(todos).toHaveLength(2);
  });

  it("lança erro se a tarefa não existir", () => {
    expect(() => removeTodo([makeTodo(1)], 99)).toThrow(/não encontrada/);
  });
});

describe("filterTodos", () => {
  const todos = [
    makeTodo(1, { done: false }),
    makeTodo(2, { done: true }),
    makeTodo(3, { done: false }),
  ];

  it("retorna todas com 'all'", () => {
    expect(filterTodos(todos, "all")).toHaveLength(3);
  });

  it("retorna apenas pendentes com 'pending'", () => {
    const result = filterTodos(todos, "pending");
    expect(result.map((t) => t.id)).toEqual([1, 3]);
  });

  it("retorna apenas concluídas com 'done'", () => {
    const result = filterTodos(todos, "done");
    expect(result.map((t) => t.id)).toEqual([2]);
  });

  it("não muta o array original", () => {
    filterTodos(todos, "all");
    expect(todos).toHaveLength(3);
  });
});

describe("clearCompleted", () => {
  it("remove apenas as tarefas concluídas", () => {
    const todos = [
      makeTodo(1, { done: true }),
      makeTodo(2, { done: false }),
      makeTodo(3, { done: true }),
    ];
    const result = clearCompleted(todos);
    expect(result.map((t) => t.id)).toEqual([2]);
  });

  it("não muta o array original", () => {
    const todos = [makeTodo(1, { done: true })];
    clearCompleted(todos);
    expect(todos).toHaveLength(1);
  });
});
