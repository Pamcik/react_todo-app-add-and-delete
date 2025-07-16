import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isLoading?: boolean;
  onDelete?: (todoId: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, isLoading = false, onDelete }) => (
  <div
    data-cy="Todo"
    className={cn('todo', {
      'todo--disabled': isLoading,
      completed: todo.completed,
    })}
  >
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        readOnly
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={() => onDelete?.(todo.id)}
      disabled={isLoading}
    >
      ×
    </button>

    {/* loader zawsze w DOM, widoczny gdy isLoading, ukryty (klasa hidden) w przeciwnym wypadku */}
    <div
      data-cy="TodoLoader"
      className={cn('modal overlay', {
        'is-active': isLoading,
        hidden: !isLoading,
      })}
      style={{ pointerEvents: 'none' }}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);

export default TodoItem;
