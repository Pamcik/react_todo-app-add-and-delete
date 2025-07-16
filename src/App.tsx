// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import './styles/index.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { Todo } from './types/Todo';
import { getTodos, addTodo, deleteTodo } from './api/todos';

const USER_ID = 3135;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!tempTodo) {
      inputRef.current?.focus();
    }
  }, [tempTodo]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      showError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: 0,
      title: trimmed,
      completed: false,
      userId: USER_ID,
    };

    setTempTodo(newTodo);

    let created!: Todo;
    let ok = false;

    try {
      created = await addTodo(newTodo);
      ok = true;
    } catch {
      showError('Unable to add a todo');
    } finally {
      setTimeout(() => {
        if (ok) {
          setTodos(prev => [...prev, created]);
          setTitle('');
        }

        setTempTodo(null);
      }, 0);
    }
  };

  const handleDelete = (id: number) => {
    setLoadingIds(prev => [...prev, id]);
    setTimeout(async () => {
      try {
        await deleteTodo(id);
        setTodos(prev => prev.filter(t => t.id !== id));
      } catch {
        showError('Unable to delete a todo');
      } finally {
        setLoadingIds(prev => prev.filter(i => i !== id));
        inputRef.current?.focus();
      }
    }, 0);
  };

  const visibleTodos = todos.filter(t =>
    filter === 'active'
      ? !t.completed
      : filter === 'completed'
        ? t.completed
        : true,
  );
  const remainingCount = todos.filter(t => !t.completed).length;
  const hasAny = todos.length > 0;
  const hasCompleted = todos.some(t => t.completed);

  return (
    <section className="todoapp section container">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm
            title={title}
            onChange={setTitle}
            onSubmit={handleAdd}
            disabled={!!tempTodo}
            inputRef={inputRef}
          />
        </header>

        <Notification message={error} onClose={() => setError('')} />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={visibleTodos}
            loadingIds={loadingIds}
            onDelete={handleDelete}
            tempTodo={tempTodo}
          />
        </section>

        {hasAny && (
          <footer className="todoapp__footer" data-cy="Filter">
            <span className="todo-count" data-cy="TodosCounter">
              {remainingCount}{' '}
              {remainingCount === 1 ? 'item left' : 'items left'}
            </span>
            <ul className="filter">
              <li>
                <button
                  data-cy="FilterLinkAll"
                  className={filter === 'all' ? 'selected' : ''}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  data-cy="FilterLinkActive"
                  className={filter === 'active' ? 'selected' : ''}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  data-cy="FilterLinkCompleted"
                  className={filter === 'completed' ? 'selected' : ''}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </li>
            </ul>
          </footer>
        )}

        {hasAny && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() =>
              visibleTodos
                .filter(t => t.completed)
                .forEach(t => handleDelete(t.id))
            }
            disabled={!hasCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </section>
  );
};

export default App;
