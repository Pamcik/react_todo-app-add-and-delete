// src/components/TodoList.tsx
import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  loadingIds: number[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  onRename: (id: number, newTitle: string) => void;
  tempTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  loadingIds,
  onDelete,
  onToggle,
  onRename,
  tempTodo,
}) => (
  <ul data-cy="TodoList" className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <TodoItem
          todo={todo}
          isLoading={loadingIds.includes(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onToggle={onToggle}
          onRename={onRename}
        />
      </li>
    ))}

    {tempTodo && (
      <li key={0}>
        <TodoItem
          todo={tempTodo}
          isLoading
          onDelete={() => {}}
          onToggle={() => {}}
          onRename={() => {}}
        />
      </li>
    )}
  </ul>
);
