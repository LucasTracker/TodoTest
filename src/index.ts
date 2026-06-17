import { loadTodos, saveTodos } from "./store.js";
import * as core from "./core.js";

function cmdAdd(title: string): void {
  try {
    const todos = core.addTodo(loadTodos(), title);
    saveTodos(todos);
    const added = todos[todos.length - 1];
    console.log(`Adicionada #${added.id}: ${added.title}`);
  } catch (err) {
    console.error(`Erro: ${(err as Error).message}`);
    process.exit(1);
  }
}

function cmdList(): void {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("Nenhuma tarefa. Use 'add <título>' para criar uma.");
    return;
  }
  for (const t of todos) {
    const mark = t.done ? "[x]" : "[ ]";
    console.log(`${mark} #${t.id} ${t.title}`);
  }
}

function cmdDone(idArg: string): void {
  try {
    const id = Number(idArg);
    const todos = core.completeTodo(loadTodos(), id);
    saveTodos(todos);
    const todo = todos.find((t) => t.id === id)!;
    console.log(`Concluída #${todo.id}: ${todo.title}`);
  } catch (err) {
    console.error(`Erro: ${(err as Error).message}`);
    process.exit(1);
  }
}

function cmdRemove(idArg: string): void {
  try {
    const id = Number(idArg);
    const before = loadTodos();
    const removed = before.find((t) => t.id === id);
    saveTodos(core.removeTodo(before, id));
    console.log(`Removida #${removed!.id}: ${removed!.title}`);
  } catch (err) {
    console.error(`Erro: ${(err as Error).message}`);
    process.exit(1);
  }
}

function help(): void {
  console.log(`Todo List — uso:
  add <título>   Adiciona uma nova tarefa
  list           Lista todas as tarefas
  done <id>      Marca uma tarefa como concluída
  remove <id>    Remove uma tarefa
  help           Mostra esta ajuda`);
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2);
  const arg = rest.join(" ");

  switch (command) {
    case "add":
      cmdAdd(arg);
      break;
    case "list":
      cmdList();
      break;
    case "done":
      cmdDone(arg);
      break;
    case "remove":
      cmdRemove(arg);
      break;
    case "help":
    case undefined:
      help();
      break;
    default:
      console.error(`Comando desconhecido: ${command}\n`);
      help();
      process.exit(1);
  }
}

main();
