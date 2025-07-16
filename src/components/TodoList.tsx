import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  loadingIds: number[];
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  loadingIds,
  onDelete,
}) => (
  <ul data-cy="TodoList" className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <TodoItem
          todo={todo}
          isLoading={loadingIds.includes(todo.id)}
          onDelete={onDelete}
        />
      </li>
    ))}

    {tempTodo && (
      <li key="temp">
        <TodoItem todo={tempTodo} isLoading />
      </li>
    )}
  </ul>
);

export default TodoList;
