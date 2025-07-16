import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  onClearCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = ({ todos, onClearCompleted }) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
