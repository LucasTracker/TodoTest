# Todo List (TypeScript CLI)

Um todo list simples de linha de comando, em TypeScript. As tarefas são salvas
em um arquivo `todos.json`.

## Instalação

```bash
npm install
npm run build
```

## Uso

```bash
node dist/index.js add "Comprar pão"
node dist/index.js list
node dist/index.js done 1
node dist/index.js remove 1
node dist/index.js help
```

## Testes

```bash
npm test          # roda os testes uma vez
npm run test:watch # modo watch
```

## Comandos

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `add <título>`  | Adiciona uma nova tarefa           |
| `list`          | Lista todas as tarefas             |
| `done <id>`     | Marca uma tarefa como concluída    |
| `remove <id>`   | Remove uma tarefa                  |
| `help`          | Mostra a ajuda                     |
